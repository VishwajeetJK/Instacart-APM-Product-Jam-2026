import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  PBDA_REVENUE_PER_DELIVERY_TARGET,
  RETAILER_CAPER_CONTINUITY_RATE,
  RETAILER_DEFAULTS,
  RETAILER_SAVINGS_PER_ORDER,
  fmtCompact,
  fmtMoney,
  fmtPct,
} from '../data/constants'
import { Slider, SoftSpring } from '../components/primitives'
import { ROBOT_CAPEX } from '../data/constants'

// ============================================================
// Shared state via context - both the calculator and the
// live retailer dashboard read from this so changing a slider
// updates both panels in real time.
// ============================================================
type RetailerState = {
  ordersPerStorePerDay: number
  robotEligiblePct: number
  robotOptInPct: number
  retailerAdSharePct: number
  setOrdersPerStorePerDay: (v: number) => void
  setRobotEligiblePct: (v: number) => void
  setRobotOptInPct: (v: number) => void
  setRetailerAdSharePct: (v: number) => void
}

const RetailerCtx = createContext<RetailerState | null>(null)

export function RetailerProvider({ children }: { children: ReactNode }) {
  const [ordersPerStorePerDay, setOrdersPerStorePerDay] = useState(RETAILER_DEFAULTS.ordersPerStorePerDay)
  const [robotEligiblePct, setRobotEligiblePct] = useState(RETAILER_DEFAULTS.robotEligiblePct)
  const [robotOptInPct, setRobotOptInPct] = useState(RETAILER_DEFAULTS.robotOptInPct)
  const [retailerAdSharePct, setRetailerAdSharePct] = useState(RETAILER_DEFAULTS.retailerAdSharePct)
  return (
    <RetailerCtx.Provider
      value={{
        ordersPerStorePerDay,
        robotEligiblePct,
        robotOptInPct,
        retailerAdSharePct,
        setOrdersPerStorePerDay,
        setRobotEligiblePct,
        setRobotOptInPct,
        setRetailerAdSharePct,
      }}
    >
      {children}
    </RetailerCtx.Provider>
  )
}

function useRetailer() {
  const ctx = useContext(RetailerCtx)
  if (!ctx) throw new Error('Retailer context missing - wrap in <RetailerProvider>.')
  return ctx
}

// ============================================================
// Computed economics
// ============================================================
function useEconomics() {
  const { ordersPerStorePerDay, robotEligiblePct, robotOptInPct, retailerAdSharePct } = useRetailer()
  return useMemo(() => {
    const robotOrdersPerDay = ordersPerStorePerDay * robotEligiblePct * robotOptInPct
    const robotOrdersPerYear = robotOrdersPerDay * RETAILER_DEFAULTS.daysPerYear
    const annualSavings = robotOrdersPerYear * RETAILER_SAVINGS_PER_ORDER
    const annualAdShare = robotOrdersPerYear * PBDA_REVENUE_PER_DELIVERY_TARGET * retailerAdSharePct
    const totalLift = annualSavings + annualAdShare
    // Retailer "investment": ~50 sq ft × $40/sq ft annualized + bay capex amortized.
    // Pilot stores share fleet cost; per-store capex ≈ 1 robot equivalent ($2K) over 3 yr.
    const retailerAnnualCost = 50 * 40 + ROBOT_CAPEX / 3
    const paybackMonths = totalLift > 0 ? (retailerAnnualCost / totalLift) * 12 : 99
    return {
      robotOrdersPerDay,
      robotOrdersPerYear,
      annualSavings,
      annualAdShare,
      totalLift,
      retailerAnnualCost,
      paybackMonths,
    }
  }, [ordersPerStorePerDay, robotEligiblePct, robotOptInPct, retailerAdSharePct])
}

// ============================================================
// Calculator (left side of §6b)
// ============================================================
export function RetailerROICalculator() {
  const r = useRetailer()
  const econ = useEconomics()

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Sliders */}
      <div className="space-y-5 rounded-3xl border-2 border-ic-greenDeep/15 bg-white p-6 shadow-sm lg:col-span-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ic-orange">Retailer ROI calculator</p>
          <h3 className="mt-1 text-xl font-extrabold text-ic-greenDeep">Per-Store Annual Economics</h3>
          <p className="mt-1 text-sm text-ic-textMute">
            Drag any slider - the dashboard on the right and the live retailer mock below both update in real time.
          </p>
        </div>

        <Slider
          label="Orders per store per day (Instacart baseline)"
          value={r.ordersPerStorePerDay}
          onChange={r.setOrdersPerStorePerDay}
          min={20}
          max={120}
          step={5}
          format={(v) => `${v}`}
          hint="Pilot baseline equals 50. High-volume Connected Stores reach 80 to 100."
        />
        <Slider
          label="Robot-eligible percent (weight, distance, no alcohol)"
          value={r.robotEligiblePct}
          onChange={r.setRobotEligiblePct}
          min={0.1}
          max={0.45}
          step={0.01}
          format={(v) => fmtPct(v)}
          hint="Pilot assumption equals 20 percent. Improves as drone and heavier-bay mix expands."
        />
        <Slider
          label="Robot opt-in rate (eligible customers)"
          value={r.robotOptInPct}
          onChange={r.setRobotOptInPct}
          min={0.05}
          max={0.40}
          step={0.01}
          format={(v) => fmtPct(v)}
          hint="Pilot success target is 15 percent or more. $3 fee savings plus first-order incentive supports this."
        />
        <Slider
          label="Retailer share of Path-Based Dynamic Ads revenue"
          value={r.retailerAdSharePct}
          onChange={r.setRetailerAdSharePct}
          min={0.20}
          max={0.50}
          step={0.01}
          format={(v) => fmtPct(v)}
          hint="Default 30 percent. Design partners can negotiate up to 40 percent in pilot."
        />
      </div>

      {/* Key-metric panel */}
      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
        <BigKPI
          label="Annual cost savings per store"
          value={econ.annualSavings}
          format={(v) => fmtCompact(v)}
          subtext={`${econ.robotOrdersPerDay.toFixed(1)} robot orders per day × $${RETAILER_SAVINGS_PER_ORDER.toFixed(2)} saved`}
          color="green"
        />
        <BigKPI
          label="Annual ad-share revenue per store"
          value={econ.annualAdShare}
          format={(v) => fmtCompact(v)}
          subtext={`${econ.robotOrdersPerYear.toFixed(0)} robot orders × $${PBDA_REVENUE_PER_DELIVERY_TARGET.toFixed(2)} × ${fmtPct(r.retailerAdSharePct)}`}
          color="orange"
        />
        <BigKPI
          label="Net profit-and-loss lift per store per year"
          value={econ.totalLift}
          format={(v) => fmtCompact(v)}
          subtext="Savings plus ad-share, before Instacart platform fee"
          color="dark"
        />
        <BigKPI
          label="Payback period"
          value={econ.paybackMonths}
          format={(v) => `${v.toFixed(1)} months`}
          subtext={`Bay capital expenditure (~${fmtMoney(econ.retailerAnnualCost)}) amortized versus lift`}
          color="default"
        />
      </div>
    </div>
  )
}

function BigKPI({
  label,
  value,
  format,
  subtext,
  color,
}: {
  label: string
  value: number
  format: (v: number) => string
  subtext: string
  color: 'green' | 'orange' | 'dark' | 'default'
}) {
  const styles = {
    green: 'border-ic-greenDeep/30 bg-ic-greenSoft text-ic-greenDeep',
    orange: 'border-ic-orange/30 bg-ic-orangeSoft text-ic-greenDeep',
    dark: 'border-ic-greenDeep bg-ic-greenDeep text-white',
    default: 'border-ic-border bg-white text-ic-greenDeep',
  }
  const muted = color === 'dark' ? 'text-white/70' : 'text-ic-textMute'
  return (
    <div className={`rounded-2xl border-2 p-5 shadow-sm ${styles[color]}`}>
      <div className={`text-xs font-bold uppercase tracking-wider ${muted}`}>{label}</div>
      <div className={`mt-2 font-mono text-4xl font-extrabold leading-tight md:text-5xl`}>
        <SoftSpring value={value} format={format} />
      </div>
      <div className={`mt-2 text-[11px] ${muted}`}>{subtext}</div>
    </div>
  )
}

// ============================================================
// Live Retailer Dashboard (§6c) - bound to same state
// ============================================================
const WEEK_LABELS = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']

export function LiveRetailerDashboard() {
  const r = useRetailer()
  const econ = useEconomics()

  // Build a plausible week-over-week trajectory: starts at 30% of steady-state, ramps to 100% by W8.
  const ramp = [0.30, 0.42, 0.55, 0.68, 0.78, 0.86, 0.93, 1.00]
  const weekly = ramp.map((m, i) => ({
    week: WEEK_LABELS[i],
    saved: Math.round((econ.annualSavings / 52) * m),
    adShare: Math.round((econ.annualAdShare / 52) * m),
  }))
  const today = weekly[7]
  const thisWeek = today.saved + today.adShare

  // Donut: opt-in mix
  const optInDonut = [
    { name: 'Robot opt-in', value: r.robotOptInPct, fill: '#ff7009' },
    { name: 'Stayed human', value: 1 - r.robotOptInPct, fill: '#d4ecc9' },
  ]

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-ic-greenDeep bg-white shadow-lg">
      {/* Mock browser chrome */}
      <div className="flex items-center gap-2 border-b border-ic-border bg-ic-cream2 px-4 py-2 text-xs">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="h-2 w-2 rounded-full bg-green-400" />
        <span className="ml-3 font-mono text-ic-textMute">retailer.instacart.com / connected-delivery / kroger-plano</span>
      </div>

      <div className="grid gap-5 p-6 md:grid-cols-3">
        {/* KPI strip */}
        <div className="md:col-span-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          <DashKPI label="This Week - Saved" value={`$${thisWeek.toLocaleString()}`} delta="+12.4 percent versus last week" />
          <DashKPI label="Bay Utilization" value={`${(34 + Math.round(r.robotOptInPct * 100))} percent`} delta="Target 40 percent or more" />
          <DashKPI label="Average Load Time" value="3.2 minutes" delta="−0.4 minutes versus Week 1" />
          <DashKPI label="Caper Cart → Robot Continuity" value={fmtPct(RETAILER_CAPER_CONTINUITY_RATE)} delta="+8 points versus Week 1" />
        </div>

        {/* Line chart */}
        <div className="md:col-span-2 rounded-2xl border border-ic-border bg-ic-cream2 p-4">
          <div className="mb-2 flex items-baseline justify-between">
            <h4 className="text-sm font-bold text-ic-greenDeep">8-Week Savings + Ad-Share Trajectory</h4>
            <span className="text-xs text-ic-textMute">Live · updates with sliders</span>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="savedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0a4525" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#0a4525" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="adGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff7009" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#ff7009" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#4a6b57' }} />
                <YAxis tick={{ fontSize: 10, fill: '#4a6b57' }} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, fontSize: 12, borderColor: '#d9d2c0' }}
                  formatter={(v: unknown, n: unknown) => [`$${Number(v).toLocaleString()}`, n === 'saved' ? 'Cost saved' : 'Ad-share']}
                />
                <Area type="monotone" dataKey="saved" stroke="#0a4525" strokeWidth={2} fill="url(#savedGrad)" />
                <Area type="monotone" dataKey="adShare" stroke="#ff7009" strokeWidth={2} fill="url(#adGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Opt-in donut */}
        <div className="rounded-2xl border border-ic-border bg-ic-cream2 p-4">
          <h4 className="text-sm font-bold text-ic-greenDeep">Customer Mix</h4>
          <div className="relative h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={optInDonut} dataKey="value" innerRadius={48} outerRadius={72} stroke="none">
                  {optInDonut.map((d, i) => (
                    <Cell key={i} fill={d.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-2xl font-extrabold text-ic-orange">{fmtPct(r.robotOptInPct)}</div>
                <div className="text-[10px] uppercase tracking-wider text-ic-textMute">opt-in</div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-center gap-3 text-[11px]">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-ic-orange" />Robot</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-ic-greenSoft" />Human</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashKPI({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-ic-border bg-white p-3 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-ic-textMute">{label}</div>
      <div className="mt-1 font-mono text-xl font-extrabold text-ic-greenDeep">{value}</div>
      <div className="text-[10px] text-ic-textMute">{delta}</div>
    </div>
  )
}
