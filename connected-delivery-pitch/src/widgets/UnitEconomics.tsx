import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import {
  CHARGING_COST_PER_ORDER,
  HUMAN_COURIER_COST,
  LOADING_COST_PER_ORDER,
  MAINTENANCE_PCT_OF_CAPEX,
  MAINTENANCE_WEAR_PER_ORDER,
  OPERATOR_HOURS_PER_DAY,
  REMOTE_OPERATOR_WAGE_PER_HOUR,
  ROBOT_DEPRECIATION_YEARS,
  fmtMoney,
  fmtPct,
} from '../data/constants'
import { Slider, Preset, SoftSpring } from '../components/primitives'

type Scenario = 'bear' | 'base' | 'bull' | 'custom'

const PRESETS: Record<Exclude<Scenario, 'custom'>, { delPerDay: number; capex: number; opRatio: number }> = {
  bear: { delPerDay: 3, capex: 2200, opRatio: 8 },
  base: { delPerDay: 5, capex: 2000, opRatio: 12 },
  bull: { delPerDay: 8, capex: 1800, opRatio: 16 },
}

function compute(delPerDay: number, capex: number, opRatio: number) {
  const ordersPerYear = delPerDay * 365
  const robotCostPerOrder = capex / ROBOT_DEPRECIATION_YEARS / ordersPerYear + CHARGING_COST_PER_ORDER
  // Remote ops: one operator covers `opRatio` robots; cost spread across all orders/day they handle.
  const operatorDailyCost = REMOTE_OPERATOR_WAGE_PER_HOUR * OPERATOR_HOURS_PER_DAY
  const ordersPerOperatorPerDay = opRatio * delPerDay
  const remoteOpsPerOrder = operatorDailyCost / ordersPerOperatorPerDay
  const maintenancePerOrder = (capex * MAINTENANCE_PCT_OF_CAPEX) / ordersPerYear + MAINTENANCE_WEAR_PER_ORDER
  const loading = LOADING_COST_PER_ORDER
  const total = robotCostPerOrder + remoteOpsPerOrder + maintenancePerOrder + loading
  const savings = (HUMAN_COURIER_COST - total) / HUMAN_COURIER_COST
  return { robotCostPerOrder, remoteOpsPerOrder, maintenancePerOrder, loading, total, savings }
}

export function UnitEconomics() {
  const [delPerDay, setDelPerDay] = useState(PRESETS.base.delPerDay)
  const [capex, setCapex] = useState(PRESETS.base.capex)
  const [opRatio, setOpRatio] = useState(PRESETS.base.opRatio)

  const live = useMemo(() => compute(delPerDay, capex, opRatio), [delPerDay, capex, opRatio])
  const bear = compute(PRESETS.bear.delPerDay, PRESETS.bear.capex, PRESETS.bear.opRatio)
  const base = compute(PRESETS.base.delPerDay, PRESETS.base.capex, PRESETS.base.opRatio)
  const bull = compute(PRESETS.bull.delPerDay, PRESETS.bull.capex, PRESETS.bull.opRatio)

  const activePreset: Scenario = useMemo(() => {
    if (delPerDay === PRESETS.bear.delPerDay && capex === PRESETS.bear.capex && opRatio === PRESETS.bear.opRatio) return 'bear'
    if (delPerDay === PRESETS.base.delPerDay && capex === PRESETS.base.capex && opRatio === PRESETS.base.opRatio) return 'base'
    if (delPerDay === PRESETS.bull.delPerDay && capex === PRESETS.bull.capex && opRatio === PRESETS.bull.opRatio) return 'bull'
    return 'custom'
  }, [delPerDay, capex, opRatio])

  const setPreset = (p: Exclude<Scenario, 'custom'>) => {
    setDelPerDay(PRESETS[p].delPerDay)
    setCapex(PRESETS[p].capex)
    setOpRatio(PRESETS[p].opRatio)
  }

  const chartData = [
    { name: 'Human\nBaseline', value: HUMAN_COURIER_COST, fill: '#0a4525' },
    { name: 'Bear', value: +bear.total.toFixed(2), fill: '#dc2626' },
    { name: 'Base', value: +base.total.toFixed(2), fill: '#f59e0b' },
    { name: 'Bull', value: +bull.total.toFixed(2), fill: '#16a34a' },
    { name: 'Live', value: +live.total.toFixed(2), fill: '#ff7009' },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* LEFT - Controls */}
      <div className="space-y-5 rounded-3xl border-2 border-ic-greenDeep/15 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ic-orange">Live calculator</p>
          <h3 className="mt-1 text-xl font-extrabold text-ic-greenDeep">Per-Order Sensitivity</h3>
          <p className="mt-1 text-sm text-ic-textMute">
            Drag the sliders to stress-test the unit economics. Defaults match the Base case from the original deck.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Preset active={activePreset === 'bear'} onClick={() => setPreset('bear')} color="red">Bear</Preset>
          <Preset active={activePreset === 'base'} onClick={() => setPreset('base')} color="orange">Base (PDF)</Preset>
          <Preset active={activePreset === 'bull'} onClick={() => setPreset('bull')} color="green">Bull</Preset>
          {activePreset === 'custom' && <Preset active onClick={() => {}}>Custom</Preset>}
        </div>

        <Slider
          label="Deliveries per robot per day"
          value={delPerDay}
          onChange={setDelPerDay}
          min={2}
          max={10}
          step={0.5}
          format={(v) => `${v.toFixed(1)} per day`}
          hint="Base case: 5 deliveries per day. Serve Robotics Generation 3 reports up to 8 in dense routes."
        />
        <Slider
          label="Robot capital expenditure"
          value={capex}
          onChange={setCapex}
          min={1500}
          max={3000}
          step={50}
          format={(v) => fmtMoney(v)}
          hint="Serve Robotics Generation 3 unit cost equals $2,000. Depreciation: 3 years."
        />
        <Slider
          label="Operator-to-robot ratio (one operator covers N robots)"
          value={opRatio}
          onChange={setOpRatio}
          min={6}
          max={18}
          step={1}
          format={(v) => `1 to ${v.toFixed(0)}`}
          hint="Base case: 1 to 12. Improves as remote takeover events drop with maturity."
        />

        {/* Live numbers */}
        <div className="mt-2 grid grid-cols-2 gap-3 rounded-2xl bg-ic-cream2 p-4">
          <div className="col-span-2 grid grid-cols-4 gap-3 text-center">
            <Mini label="Robot" value={fmtMoney(live.robotCostPerOrder, { decimals: 2 })} />
            <Mini label="Remote operations" value={fmtMoney(live.remoteOpsPerOrder, { decimals: 2 })} />
            <Mini label="Maintenance" value={fmtMoney(live.maintenancePerOrder, { decimals: 2 })} />
            <Mini label="Loading" value={fmtMoney(live.loading, { decimals: 2 })} />
          </div>
          <div className="col-span-2 mt-1 grid grid-cols-2 gap-3 border-t border-ic-border pt-3">
            <div>
              <div className="text-xs font-semibold uppercase text-ic-textMute">Total per order</div>
              <div className="font-mono text-3xl font-extrabold text-ic-greenDeep">
                <SoftSpring value={live.total} format={(v) => `$${v.toFixed(2)}`} />
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-ic-textMute">Savings versus $10.10</div>
              <div className={`font-mono text-3xl font-extrabold ${live.savings >= 0.5 ? 'text-ic-greenDeep' : live.savings >= 0.3 ? 'text-ic-orange' : 'text-red-600'}`}>
                <SoftSpring value={live.savings} format={(v) => `${(v * 100).toFixed(0)} percent`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT - Chart */}
      <div className="rounded-3xl border-2 border-ic-greenDeep/15 bg-white p-6 shadow-sm">
        <div className="mb-2">
          <p className="text-xs font-bold uppercase tracking-wider text-ic-orange">Sensitivity comparison</p>
          <h3 className="mt-1 text-xl font-extrabold text-ic-greenDeep">Cost per order - all scenarios</h3>
          <p className="mt-1 text-sm text-ic-textMute">Live bar shows your slider state side-by-side with Bear, Base, and Bull.</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 24, right: 8, bottom: 8, left: -8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d2" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#0a4525' }} />
              <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 11, fill: '#4a6b57' }} />
              <Tooltip
                cursor={{ fill: '#fff7eb' }}
                contentStyle={{ borderRadius: 12, borderColor: '#d9d2c0', fontSize: 12 }}
                formatter={(v: unknown) => [`$${Number(v).toFixed(2)}`, 'Cost per order']}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, idx) => (
                  <Cell key={`c-${idx}`} fill={entry.fill} />
                ))}
                <LabelList dataKey="value" position="top" formatter={(v: unknown) => `$${Number(v).toFixed(2)}`} fill="#0a4525" fontSize={11} fontWeight={700} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <Pill2 color="#dc2626" label="Bear" sub={`${fmtPct(bear.savings)} savings`} />
          <Pill2 color="#f59e0b" label="Base (deck)" sub={`${fmtPct(base.savings)} savings`} />
          <Pill2 color="#16a34a" label="Bull" sub={`${fmtPct(bull.savings)} savings`} />
        </div>
      </div>
    </div>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-ic-textMute">{label}</div>
      <div className="font-mono text-base font-bold text-ic-greenDeep">{value}</div>
    </div>
  )
}

function Pill2({ color, label, sub }: { color: string; label: string; sub: string }) {
  return (
    <div className="rounded-xl border border-ic-border bg-white p-2">
      <div className="flex items-center justify-center gap-1 text-xs font-bold text-ic-greenDeep">
        <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
        {label}
      </div>
      <div className="text-[10px] text-ic-textMute">{sub}</div>
    </div>
  )
}
