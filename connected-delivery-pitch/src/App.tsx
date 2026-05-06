import {
  Activity,
  ArrowRight,
  Battery,
  Bot,
  ClipboardCheck,
  Cpu,
  Hand,
  LineChart,
  Map as MapIcon,
  Megaphone,
  Menu,
  ShieldCheck,
  ShoppingBag,
  Store,
  Target,
  Timer,
  Truck,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

import {
  ADVERTISER_BRAND_COUNT,
  AD_GROSS_MARGIN,
  AD_REV_AS_PCT_OF_GTV_CURRENT,
  AD_REV_AS_PCT_OF_GTV_TARGET,
  COMPETITORS,
  CUSTOMER_AVG_DELIVERY_MINUTES,
  CUSTOMER_FEE_SAVINGS,
  CUSTOMER_ROBOT_FEE,
  HUMAN_COURIER_COST,
  INSTACART_AD_REVENUE_2025,
  INSTACART_GROCERY_ROAS,
  INSTACART_MAU,
  PBDA_REVENUE_PER_DELIVERY_TARGET,
  PILOT_DAYS,
  PILOT_INVESTMENT,
  PILOT_INVESTMENT_TOTAL,
  PILOT_OPT_IN_PCT,
  PILOT_ORDERS_PER_STORE_PER_DAY,
  PILOT_ROBOT_ELIGIBLE_PCT,
  PILOT_STORES,
  PILOT_STORES_LIST,
  PILOT_TOTAL_ORDERS,
  RETAILER_PARTNERS,
  RETAILER_SAVINGS_PER_ORDER,
  RETAILER_STORE_COUNT,
  ROBOT_TARGET_COST,
  SHOPPER_ACCURACY_BONUS,
  SHOPPER_ACTIVE_COUNT,
  SHOPPER_ROBOT_PREMIUM,
  SUCCESS_METRICS,
  fmtCompact,
  fmtPct,
} from './data/constants'

import { Card, Counter, KPI, Pill, Reveal, SectionHeader } from './components/primitives'
import { UnitEconomics } from './widgets/UnitEconomics'
import {
  LiveRetailerDashboard,
  RetailerProvider,
  RetailerROICalculator,
} from './widgets/RetailerROI'
import { AdcsTrajectory } from './widgets/AdcsTrajectory'
import { GanttStrip } from './widgets/GanttStrip'
import {
  WfAssociateLoading,
  WfCustomerCheckout,
  WfCustomerTracking,
  WfOperatorMonitor,
  WfRetailerDashboard,
} from './widgets/Wireframes'

// ============================================================
// Nav links — match the 14-section spine
// ============================================================
const links = [
  ['#urgency', 'Urgency'],
  ['#opportunity', 'Economics'],
  ['#strategy', 'Strategy'],
  ['#users', 'Users'],
  ['#retailer', 'Retailer'],
  ['#solutions', 'Solutions'],
  ['#priority', 'Sequence'],
  ['#metrics', 'Metrics'],
  ['#risks', 'Risks'],
  ['#pilot', 'Pilot'],
  ['#wireframes', 'UI'],
] as const

// ============================================================
// App
// ============================================================
export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <RetailerProvider>
      <div className="min-h-screen bg-ic-cream text-ic-text">
        <Nav open={open} setOpen={setOpen} />
        <Hero />
        <Urgency />
        <Opportunity />
        <Strategy />
        <UsersFourSided />
        <RetailerDeepDive />
        <Solutions />
        <Priority />
        <Journeys />
        <Metrics />
        <RiskAndPilot />
        <PilotPlan />
        <Wireframes />
        <Closing />
        <Footer />
      </div>
    </RetailerProvider>
  )
}

// ============================================================
// 0. Nav
// ============================================================
function Nav({ open, setOpen }: { open: boolean; setOpen: (b: boolean) => void }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-ic-border bg-white backdrop-blur-sm relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <a href="#home" aria-label="Go to home section">
            <img
              src="/connected-delivery-pitch/instacart-logo.png"
              alt="Instacart logo"
              className="h-[56px] w-auto shrink-0"
            />
          </a>
          <span className="hidden truncate text-xs text-ic-textMute md:inline">
            | APM Interview · Product Team Jam · Vishwajeet Jayanthi Karthikeyan
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="/connected-delivery-pitch/instacart-apm-pitch-deck.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-ic-greenDeep px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
          >
            View Previous Submission PDF
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            className="rounded-full border border-ic-border bg-white p-2 text-ic-greenDeep"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="absolute right-4 top-full z-50 mt-2 w-64 rounded-2xl border border-ic-border bg-white p-3 shadow-lg md:right-8">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-ic-greenDeep transition hover:bg-ic-cream2"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ============================================================
// 1. Hero
// ============================================================
function Hero() {
  return (
    <section id="home" className="section-shell relative overflow-hidden">
      <div className="dot-accent" aria-hidden />
      <div className="grid items-center gap-10 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-3">
          <Pill>Associate Product Manager Interview · Product Team Jam</Pill>
          <h1 className="text-5xl font-extrabold leading-[1.02] text-ic-greenDeep md:text-7xl">Connected Delivery</h1>
          <p className="text-2xl font-bold text-ic-orange">Path-Aware Autonomous Last-Mile, Funded by Ads</p>
          <p className="max-w-3xl text-lg leading-relaxed text-ic-greenDeep/90">
            Cut delivery cost by <strong>53%</strong>, turn every Connected Store into a doorstep ad surface, and protect Instacart's
            storefronts moat against Amazon, Walmart, and DoorDash — with a phased commit (sidewalk robots now,
            aerial drones conditional).
          </p>

          {/* Hero metrics strip with animated counters */}
          <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border-2 border-ic-greenDeep/20 bg-white p-4">
            <HeroStat
              prefix="$"
              from={HUMAN_COURIER_COST}
              to={ROBOT_TARGET_COST}
              decimals={2}
              caption="Cost per order at scale"
              sub={`versus $${HUMAN_COURIER_COST.toFixed(2)} human baseline`}
            />
            <HeroStat
              from={0}
              to={60}
              decimals={0}
              suffix=" per day"
              caption="Autonomous deliveries per Connected Store at month 24"
              sub="Our North-Star metric — daily throughput per store"
            />
            <HeroStat
              from={0}
              to={AD_REV_AS_PCT_OF_GTV_TARGET * 100}
              decimals={1}
              suffix="% of Gross Transaction Value"
              caption="Ad revenue trajectory"
              sub={`Currently ${(AD_REV_AS_PCT_OF_GTV_CURRENT * 100).toFixed(1)} percent · target 4 to 5 percent`}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="chip chip-green">Phase 1 (12 months) — Sidewalk Robots: Commit</span>
            <span className="chip chip-peach">Phase 2 (12+ months) — Aerial Drones: Conditional</span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <a href="#retailer" className="inline-flex items-center gap-2 rounded-full bg-ic-greenDeep px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90">
              Jump to Retailer Storefront <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#opportunity" className="inline-flex items-center gap-2 rounded-full border-2 border-ic-greenDeep px-5 py-2.5 text-sm font-bold text-ic-greenDeep transition hover:bg-ic-greenDeep hover:text-white">
              Open the Unit-Economics Calculator <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="lg:col-span-2">
          <img
            src="/connected-delivery-pitch/instacart-robot-drone.png"
            alt="Instacart robot and drone fleet concept"
            className="w-full rounded-3xl border border-ic-border bg-white p-2 shadow-sm"
          />
        </div>
      </div>
    </section>
  )
}

function HeroStat({
  prefix = '',
  suffix = '',
  from,
  to,
  decimals,
  caption,
  sub,
}: {
  prefix?: string
  suffix?: string
  from: number
  to: number
  decimals: number
  caption: string
  sub: string
}) {
  return (
    <div aria-label={`${caption} from ${from} to ${to}`}>
      <div className="text-2xl font-extrabold leading-tight text-ic-orange md:text-3xl">
        <span className="font-mono">
          {prefix}
          <Counter to={to} decimals={decimals} duration={1.6} />
        </span>
        {suffix && <span className="ml-1 font-sans text-xl font-bold md:text-2xl">{suffix}</span>}
      </div>
      <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-ic-greenDeep">{caption}</div>
      <div className="text-[10px] leading-snug text-ic-textMute">{sub}</div>
    </div>
  )
}

// ============================================================
// 2. Urgency
// ============================================================
function Urgency() {
  return (
    <section id="urgency" className="section-alt">
      <div className="section-shell">
        <SectionHeader
          eyebrow="01 · Urgency"
          title="The Autonomous Delivery Window Is Closing"
          sub="Every quarter we wait, competitors compound operational moats on top of our store density."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {COMPETITORS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <Card>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-ic-greenDeep">{c.name}</h3>
                  <Pill variant={c.status === 'Accelerating' ? 'orange' : 'green'}>{c.status}</Pill>
                </div>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ic-textMute">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-2"><span className="text-ic-greenDeep">✓</span><span>{b}</span></li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border-2 border-ic-greenDeep bg-ic-greenSoft p-6 text-center md:p-8">
          <div className="text-xs font-bold uppercase tracking-widest text-ic-greenDeep">Instacart status</div>
          <div className="mt-2 text-2xl font-extrabold leading-tight text-ic-greenDeep md:text-3xl">
            EXPLORING · {RETAILER_STORE_COUNT.toLocaleString()}+ stores · {(INSTACART_MAU / 1e6).toFixed(1)} million Monthly Active Users · <span className="text-ic-orange">ZERO autonomous capability</span>
          </div>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-ic-greenDeep/80 md:text-base">
            "Every quarter we wait, competitors build operational moats. Our store density is necessary — but not sufficient. We must act now."
          </p>
        </div>

        <p className="mt-4 text-center text-[11px] italic text-ic-textMute">
          Caveat: competitor data based on early-2026 market projections from Serve Robotics Securities and Exchange Commission filings 2024 to 2025, Amazon Prime Air, and DoorDash investor materials.
        </p>
      </div>
    </section>
  )
}

// ============================================================
// 3. Opportunity — Unit Economics
// ============================================================
function Opportunity() {
  return (
    <section id="opportunity" className="section-shell">
      <SectionHeader
        eyebrow="02 · Opportunity"
        title="Last-Mile Cost Is Our Single Biggest Margin Lever"
        sub={`Sidewalk robots at scale cut delivery cost from $${HUMAN_COURIER_COST.toFixed(2)} to $${ROBOT_TARGET_COST.toFixed(2)} per order — 53% savings. The interactive panel below stress-tests every assumption live.`}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <KPI label="Average delivery cost (today)" value={`$${HUMAN_COURIER_COST.toFixed(2)}`} sub="Human courier · 2024" variant="orange" />
        <KPI label="Autonomous target" value={`$${ROBOT_TARGET_COST.toFixed(2)}`} sub="Sidewalk robot at scale" variant="green" />
        <KPI label="United States grocery delivery total addressable market" value="$42 billion" sub="Market size by 2027 · 12 percent compound annual growth rate" variant="dark" />
      </div>

      <div className="mt-10">
        <UnitEconomics />
      </div>

      {/* Assumptions block */}
      <div className="mt-6 rounded-3xl border border-ic-border bg-ic-greenSoft p-6 text-sm text-ic-greenDeep">
        <div className="text-xs font-bold uppercase tracking-wider text-ic-orange">Assumptions and calculations</div>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <div><strong>Robot capital expenditure:</strong> $2,000 unit cost (Serve Robotics Generation 3). Three-year depreciation. $0.60 per order charging cost.</div>
          <div><strong>Remote operations:</strong> 1 to 12 operator-to-robot ratio. $25 per hour × 8 hours = $200 per day. 60 deliveries per day per operator → $1.04 per order.</div>
          <div><strong>Maintenance:</strong> 15 percent of annual capital expenditure plus $0.20 per order wear-and-tear allowance.</div>
          <div><strong>Loading:</strong> $18.50 per hour associate × 2.5 minutes per event = $0.77 per order.</div>
          <div><strong>Human baseline:</strong> $10.10 per order = courier pay + insurance + support overhead.</div>
          <div><strong>Savings:</strong> ($10.10 − $4.72) ÷ $10.10 = 53 percent in base case. Drag the sliders to test bear and bull scenarios.</div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 4. Strategy — Connected Stack flywheel + alternatives + phase table
// ============================================================
function Strategy() {
  return (
    <section id="strategy" className="section-alt">
      <div className="section-shell">
        <SectionHeader
          eyebrow="03 · Strategy"
          title="Connected Delivery Is the Missing Tier of the Instacart Operating System"
          sub="The Computer Vision that powers Caper Cart can verify robot cargo. The data from robot delivery feeds Connected Commerce. We're not building a delivery service — we're closing the platform loop."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* The Connected Stack diagram */}
          <div className="lg:col-span-3">
            <ConnectedStack />
          </div>

          {/* Phase table */}
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-lg font-extrabold text-ic-greenDeep">Phase commitment</h3>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-bold uppercase tracking-wider text-ic-textMute">
                    <th className="pb-2"></th>
                    <th className="pb-2">Phase 1 · Robots</th>
                    <th className="pb-2">Phase 2 · Drones</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-ic-greenDeep">
                  {[
                    ['Commit', 'COMMIT', 'CONDITIONAL'],
                    ['Radius', '0.5 to 3 miles', '1 to 7.5 miles'],
                    ['Payload', '50 pounds / 25 items', '5 pounds / 1 to 2 items'],
                    ['Timeline', 'Months 0 to 12', 'Month 12+ (gate)'],
                    ['Regulation', 'Texas Senate Bill 969', 'Federal Aviation Administration Part 135'],
                  ].map(([k, a, b], i) => (
                    <tr key={k} className={i % 2 === 0 ? 'bg-ic-cream2' : ''}>
                      <td className="py-1.5 pr-2 font-semibold">{k}</td>
                      <td className={`py-1.5 ${k === 'Commit' ? 'font-bold text-ic-orange' : ''}`}>{a}</td>
                      <td className={`py-1.5 ${k === 'Commit' ? 'font-bold text-ic-greenDeep' : ''}`}>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>

        {/* Final Strategy box */}
        <div className="mt-8 rounded-3xl border-2 border-ic-greenDeep bg-ic-greenDeep p-6 text-white shadow-lg md:p-8">
          <div className="text-xs font-bold uppercase tracking-wider text-ic-orangeSoft">Final strategy</div>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 text-base font-extrabold">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ic-orange text-[11px]">1</span>
                Phase 1
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Aggressive rollout of sidewalk robots to capture high-density suburban demand and 53 percent cost savings.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-extrabold">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ic-orange text-[11px]">2</span>
                Phase 2
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Monitor Federal Aviation Administration evolution. Deploy drones only for ultra-fast, small-basket "forgotten item" orders.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-extrabold">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ic-orange text-[11px]">★</span>
                The Goal
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Protect Gross Transaction Value while shifting from linear labor to scalable autonomous infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* Alternatives evaluated */}
        <div className="mt-10">
          <h3 className="text-xl font-extrabold text-ic-greenDeep">Why Connected Delivery beats four alternatives</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Pure Partnership', verdict: 'Starting point, not end state', pros: 'Low capex, fast to market', cons: 'Zero IP, dependency on unprofitable partner' },
              { title: 'Acquire a Robotics Co.', verdict: 'Evaluate after pilot', pros: 'Own the IP, vertical integration', cons: '$100M+ acquisition, outside core competency' },
              { title: 'White-Label for Retailers', verdict: 'Phase 3 future state', pros: 'Aligns with enterprise platform strategy', cons: 'Requires proven unit economics first' },
              { title: 'Do Nothing', verdict: 'Starting point, not end state', pros: 'No capex risk', cons: 'Competitors build moats, cost stays linear' },
            ].map((alt) => (
              <Card key={alt.title}>
                <h4 className="text-sm font-extrabold text-ic-greenDeep">{alt.title}</h4>
                <p className="mt-2 text-xs text-ic-greenDeep">✓ {alt.pros}</p>
                <p className="mt-1 text-xs text-red-700">✗ {alt.cons}</p>
                <div className="mt-3 inline-flex rounded bg-ic-cream2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-ic-greenDeep">
                  {alt.verdict}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ConnectedStack() {
  const layers = [
    {
      title: 'Connected Stores',
      sub: 'Caper Carts · Carrot Tags',
      icon: <ShoppingBag className="h-5 w-5" />,
      color: 'bg-ic-greenSoft border-ic-greenDeep/30',
    },
    {
      title: 'Connected Delivery',
      sub: 'Sidewalk Robots · Drones',
      icon: <Truck className="h-5 w-5" />,
      color: 'bg-ic-orangeSoft border-ic-orange/40',
      highlight: true,
    },
    {
      title: 'Connected Commerce',
      sub: 'Ads · Agentic Commerce',
      icon: <Megaphone className="h-5 w-5" />,
      color: 'bg-ic-greenSoft border-ic-greenDeep/30',
    },
  ]
  return (
    <div className="space-y-3">
      {layers.map((l, idx) => (
        <div key={l.title}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className={`flex items-center gap-3 rounded-2xl border-2 p-4 ${l.color} ${l.highlight ? 'shadow-lg ring-2 ring-ic-orange ring-offset-2' : ''}`}
          >
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${l.highlight ? 'bg-ic-orange text-white' : 'bg-white text-ic-greenDeep'}`}>
              {l.icon}
            </div>
            <div className="flex-1">
              <div className="text-base font-extrabold text-ic-greenDeep">{l.title}</div>
              <div className="text-xs text-ic-textMute">{l.sub}</div>
            </div>
            {l.highlight && <Pill variant="orange">The missing tier</Pill>}
          </motion.div>
          {idx < layers.length - 1 && (
            <div className="my-1 ml-12 text-xs text-ic-textMute">
              <span className="rounded bg-ic-cream2 px-2 py-0.5 font-mono">↓ {idx === 0 ? 'Computer Vision + Spatial Artificial Intelligence' : 'Data Feedback Loop'}</span>
            </div>
          )}
        </div>
      ))}
      <div className="mt-3 rounded-2xl border-2 border-dashed border-ic-greenDeep/30 bg-white p-4 text-sm text-ic-greenDeep">
        <strong>The bridge:</strong> the same Computer Vision that powers Caper Cart item recognition can power robot cargo verification. We're not building a delivery service — we're <em>extending the platform</em>.
      </div>
    </div>
  )
}

// ============================================================
// 5. Users — four-sided
// ============================================================
function UsersFourSided() {
  return (
    <section id="users" className="section-shell">
      <SectionHeader
        eyebrow="04 · Users"
        title="Four-Sided Ecosystem: Win Conditions, Quantified"
        sub="Retailer is double-width and ringed orange — Storefronts is the spine of this strategy."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <UserHeader icon={<Users className="h-5 w-5" />} title="Customer" count={`${(INSTACART_MAU / 1e6).toFixed(1)} million Monthly Active Users`} />
          <ul className="mt-3 space-y-2 text-sm text-ic-textMute">
            <li>Lower fee · <strong>${CUSTOMER_ROBOT_FEE.toFixed(2)}</strong> robot versus $5.99 standard</li>
            <li>Faster Estimated Time of Arrival · <strong>~{CUSTOMER_AVG_DELIVERY_MINUTES} minutes</strong> with real-time tracking</li>
            <li>Saves <strong>${CUSTOMER_FEE_SAVINGS.toFixed(2)} per order</strong> · contactless unlock code</li>
          </ul>
        </Card>

        <Card>
          <UserHeader icon={<Zap className="h-5 w-5" />} title="Shopper" count={`~${SHOPPER_ACTIVE_COUNT.toLocaleString()} active`} />
          <ul className="mt-3 space-y-2 text-sm text-ic-textMute">
            <li>Earnings-neutral · <strong>${SHOPPER_ROBOT_PREMIUM} robot premium plus ${SHOPPER_ACCURACY_BONUS} accuracy bonus</strong></li>
            <li>Skip delivery traffic · focus on high-value picking</li>
            <li>Net-new small-basket volume <strong>($10 to $30 orders)</strong></li>
          </ul>
        </Card>

        <Card emphasize className="md:col-span-2 lg:col-span-2">
          <UserHeader icon={<Store className="h-5 w-5" />} title="Retailer · Spine of strategy" count={`${RETAILER_PARTNERS.toLocaleString()}+ partners · ${RETAILER_STORE_COUNT.toLocaleString()}+ stores`} highlight />
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-ic-greenSoft p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-ic-greenDeep">Margin relief</div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-ic-greenDeep">${RETAILER_SAVINGS_PER_ORDER.toFixed(2)}</div>
              <div className="text-[10px] text-ic-textMute">cost saved per robot order</div>
            </div>
            <div className="rounded-xl bg-ic-orangeSoft p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-ic-greenDeep">Branded doorstep</div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-ic-greenDeep">~50 square feet</div>
              <div className="text-[10px] text-ic-textMute">store-perimeter footprint</div>
            </div>
            <div className="rounded-xl bg-ic-cream2 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-ic-greenDeep">Storefront continuity</div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-ic-greenDeep">30 percent+</div>
              <div className="text-[10px] text-ic-textMute">Path-Based Dynamic Ads share to retailer</div>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-ic-border">
              <div className="text-[10px] font-bold uppercase tracking-wider text-ic-greenDeep">Caper Cart → Robot continuity</div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-ic-greenDeep">42 percent</div>
              <div className="text-[10px] text-ic-textMute">of orders flow Caper Cart → robot</div>
            </div>
          </div>
        </Card>

        <Card>
          <UserHeader icon={<Megaphone className="h-5 w-5" />} title="Advertiser / Consumer Packaged Goods Brand" count={`${ADVERTISER_BRAND_COUNT.toLocaleString()}+ brands`} />
          <ul className="mt-3 space-y-2 text-sm text-ic-textMute">
            <li>New path inventory · <strong>${PBDA_REVENUE_PER_DELIVERY_TARGET.toFixed(2)} per delivery</strong> target by month 9</li>
            <li>Closed-loop Return on Ad Spend · <strong>${INSTACART_GROCERY_ROAS}</strong> beats Amazon's ${(INSTACART_GROCERY_ROAS - 0.33).toFixed(2)}</li>
            <li>{(AD_GROSS_MARGIN * 100).toFixed(0)} percent gross margin on ad revenue</li>
          </ul>
        </Card>
      </div>
    </section>
  )
}

function UserHeader({ icon, title, count, highlight }: { icon: React.ReactNode; title: string; count: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${highlight ? 'bg-ic-orange text-white' : 'bg-ic-greenSoft text-ic-greenDeep'}`}>{icon}</div>
      <div>
        <h3 className="text-lg font-extrabold text-ic-greenDeep">{title}</h3>
        <div className="text-xs text-ic-textMute">{count}</div>
      </div>
    </div>
  )
}

// ============================================================
// 6. Retailer Storefront Deep Dive — the centerpiece
// ============================================================
function RetailerDeepDive() {
  return (
    <section id="retailer" className="section-alt">
      <div className="section-shell">
        <SectionHeader
          eyebrow="05 · Retailer Storefronts (Deep Dive)"
          title="Every Robot Becomes a Branded, Data-Powered Storefront"
          sub='"Turn every delivery into a moving, data-powered storefront — using Instacart’s first-party insights to target high-intent ads on robots that don’t just deliver groceries, but subsidize the cost of getting them there."'
        />

        {/* 6a · Why retailers win — paired side-by-side with the billboard image. Table left, image right. */}
        <Reveal>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
            {/* LEFT — 6a table */}
            <div>
              <h3 className="text-2xl font-extrabold text-ic-greenDeep">6a · Why retailers win</h3>
              <p className="mt-1 text-sm text-ic-textMute">
                Four discrete retailer pains, each transformed by Connected Delivery, each with a quantified profit-and-loss impact at the pilot baseline.
              </p>

              {/* Single legend strip — replaces repeated per-card labels */}
              <div className="mt-4 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-ic-textMute">
                <span className="rounded-md bg-red-100 px-2 py-1 text-red-700">Today</span>
                <span className="text-center text-ic-textMute">→</span>
                <span className="rounded-md bg-ic-greenSoft px-2 py-1 text-ic-greenDeep">With Connected Delivery</span>
                <span className="text-center text-ic-textMute">→</span>
                <span className="rounded-md bg-ic-orangeSoft px-2 py-1 text-ic-greenDeep">Impact / store</span>
              </div>

              <div className="mt-3 space-y-3">
                {[
                  {
                    pain: 'Black-box delivery — brand trust evaporates after checkout',
                    change: 'Retailer-branded robot · branded delivery confirmation · branded unlock screen',
                    impact: '+ Net Promoter Score uplift, surveyed',
                  },
                  {
                    pain: 'Linear delivery cost compresses margin',
                    change: `$${RETAILER_SAVINGS_PER_ORDER.toFixed(2)} per order saved versus human courier · scales with volume`,
                    impact: '~$14,700 per year (pilot baseline)',
                  },
                  {
                    pain: 'No post-checkout differentiation surface',
                    change: "Path-Based Dynamic Ads · brand-and-retailer co-branded ads on robot screens (Kellogg's at HEB, Lay's at Kroger)",
                    impact: '~$4,100 per year ad-share',
                  },
                  {
                    pain: 'Lost continuity between in-store and delivery',
                    change: 'Caper Cart shopper → robot delivery → re-order loop · 42 percent continuity rate',
                    impact: '+ Repeat-rate lift',
                  },
                ].map((row, i) => (
                  <div key={i} className="rounded-2xl border border-ic-border bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ic-orange text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      <div className="flex-1 space-y-2.5">
                        {/* PAIN — muted, with red dot prefix */}
                        <div className="flex items-start gap-2">
                          <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-red-400" />
                          <p className="text-sm leading-snug text-ic-textMute">{row.pain}</p>
                        </div>

                        {/* TRANSFORMATION — orange arrow + bold green solution */}
                        <div className="flex items-start gap-2 border-t border-dashed border-ic-border pt-2">
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-ic-orange" />
                          <p className="text-sm font-semibold leading-snug text-ic-greenDeep">{row.change}</p>
                        </div>

                        {/* IMPACT pill */}
                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-ic-greenSoft px-3 py-1.5 text-sm font-bold text-ic-greenDeep">
                          <span className="text-ic-orange">$</span>
                          {row.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Dallas–Fort Worth Path-Based Dynamic Ads billboard */}
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-3xl border-2 border-ic-greenDeep/15 bg-white shadow-md">
                <img
                  src="/connected-delivery-pitch/dfw-pbda-billboard.png"
                  alt="Path-Based Dynamic Ads — Kellogg's at HEB and Lay's at Kroger on robot delivery storefronts across the Dallas–Fort Worth metro area"
                  className="w-full"
                />
              </div>
              <p className="mt-3 text-center text-[11px] italic text-ic-textMute">
                Robots running Dallas–Fort Worth pilot routes — co-branded retailer × consumer-packaged-goods creative, served by Path-Based Dynamic Ads.
              </p>
            </div>
          </div>
        </Reveal>

        {/* 6b. ROI Calculator */}
        <div className="mt-10">
          <h3 className="text-2xl font-extrabold text-ic-greenDeep">6b · Retailer ROI calculator</h3>
          <p className="mt-1 max-w-3xl text-sm text-ic-textMute">
            Defaults match the Dallas–Fort Worth pilot baseline (50 orders per day × 20 percent eligible × 15 percent opt-in × 30 percent ad-share). Drag any slider; the dashboard below updates live.
          </p>
          <div className="mt-6">
            <RetailerROICalculator />
          </div>
        </div>

        {/* 6c. Live retailer dashboard */}
        <div className="mt-10">
          <h3 className="text-2xl font-extrabold text-ic-greenDeep">6c · Live retailer dashboard mock</h3>
          <p className="mt-1 max-w-3xl text-sm text-ic-textMute">
            This is the actual surface a retailer sees. Bound to the calculator above — change a slider and Today's Saved, Bay Utilization, and the 8-week trajectory all update.
          </p>

          <p className="mt-1 text-xs italic text-ic-textMute">
            (The dashboard mock you see is also re-rendered as a smaller wireframe in the Surfaces section below.)
          </p>
          <div className="mt-6">
            <LiveRetailerDashboard />
          </div>
        </div>

        {/* 6d. Onboarding playbook */}
        <Reveal>
          <div className="mt-10">
            <h3 className="text-2xl font-extrabold text-ic-greenDeep">6d · Design-partner onboarding playbook</h3>
            <p className="mt-1 max-w-3xl text-sm text-ic-textMute">
              Five-step retailer onboarding. Weeks 0–8. Each step has a clear acceptance gate. Design-partner clause: shared cost savings, co-developed UX, exclusivity window in market.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {[
                { num: '01', title: 'Bay design', sub: 'Computer-Aided Design → 50 square feet perimeter footprint, Americans with Disabilities Act clearance, weatherproofing.' },
                { num: '02', title: 'Associate certification', sub: '"Robot-Ready Picker" program · 2 hours of training · Computer-Vision scan Standard Operating Procedure.' },
                { num: '03', title: 'Soft launch', sub: 'Geofenced opt-in cohort · 14 days · human shadow weeks 1 to 2.' },
                { num: '04', title: 'Dashboard activation', sub: 'Retailer panel goes live · Caper Cart-to-Robot continuity tracking enabled.' },
                { num: '05', title: 'Weekly profit and loss review', sub: 'Reconcile cost saved plus ad-share · reinvest into loyalty economics.' },
              ].map((s) => (
                <div key={s.num} className="rounded-2xl border-2 border-ic-greenDeep/15 bg-white p-4 shadow-sm">
                  <div className="font-mono text-3xl font-extrabold text-ic-orange">{s.num}</div>
                  <div className="mt-1 text-sm font-extrabold text-ic-greenDeep">{s.title}</div>
                  <p className="mt-2 text-xs leading-relaxed text-ic-textMute">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border-2 border-ic-orange bg-ic-orangeSoft p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-ic-orange">Design-partner clause</div>
                <ul className="mt-2 space-y-1.5 text-sm text-ic-greenDeep">
                  <li>· <strong>Shared economics</strong> — retailer keeps 30 percent or more of Path-Based Dynamic Ads revenue from their own routes</li>
                  <li>· <strong>Co-developed user experience</strong> — retailer brand on robot, unlock screen, dashboard</li>
                  <li>· <strong>Exclusivity window</strong> — first 12 months, no competing retailer onboarded in the same Designated Market Area</li>
                  <li>· <strong>Joint quarterly review</strong> — operating model evolves on real numbers, not assumptions</li>
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-ic-greenDeep/15 bg-white p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-ic-greenDeep">Why this is hard to copy</div>
                <ul className="mt-2 space-y-1.5 text-sm text-ic-textMute">
                  <li>· Caper Cart Computer-Vision stack (live in production) provides cargo verification that competitors cannot replicate</li>
                  <li>· 100,000-store retailer relationship base — DoorDash and Amazon must build retailer trust we already have</li>
                  <li>· Path-Based Dynamic Ads economics fund the savings, breaking the linear-cost trap competitors are still subsidizing through</li>
                  <li>· Connected Stores → Robot data loop creates a compounding ad-targeting moat</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ============================================================
// 7. Solutions
// ============================================================
function Solutions() {
  return (
    <section id="solutions" className="section-shell">
      <SectionHeader
        eyebrow="06 · Solve"
        title="Five Levers — One Coordinated Platform Move"
        sub="Robots reduce cost (Solution 1). Computer-Vision reuse increases reliability (Solution 2). Path-based ads fund savings (Solution 3). Retailer dashboard captures value (Solution 4). Shopper premium keeps earnings neutral (Solution 5)."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <SolutionHead icon={<Truck className="h-5 w-5" />} id="Solution 1" title="Sidewalk Fleet" lever="Cost lever" />
          <p className="mt-3 text-sm text-ic-textMute">Partner-fleet (Serve Robotics / Coco) plus Instacart dispatch and user-experience layer. Cuts $5.38 per order. Phase 1 commit.</p>
        </Card>
        <Card>
          <SolutionHead icon={<Cpu className="h-5 w-5" />} id="Solution 2" title="Caper Cart Computer-Vision Reuse" lever="Reliability lever" />
          <p className="mt-3 text-sm text-ic-textMute">Reuse Caper Cart Computer Vision for cargo verification. Closes the storefront-to-home loop without net-new intellectual property.</p>
        </Card>
        <Card>
          <SolutionHead icon={<Store className="h-5 w-5" />} id="Solution 4" title="Retailer Bay + Dashboard" lever="Retailer lever" />
          <p className="mt-3 text-sm text-ic-textMute">~50 square feet store-perimeter bay. Retailer panel: utilization, savings, Net Promoter Score, ad-share. Required before Solution 1 ships.</p>
        </Card>
        <Card>
          <SolutionHead icon={<Zap className="h-5 w-5" />} id="Solution 5" title="Shopper Premium" lever="Shopper lever" />
          <p className="mt-3 text-sm text-ic-textMute">${SHOPPER_ROBOT_PREMIUM} loading premium plus ${SHOPPER_ACCURACY_BONUS} accuracy bonus. Keeps earnings neutral; redirects to high-value picking.</p>
        </Card>
        <Card className="lg:col-span-2 bg-ic-greenSoft border-ic-greenDeep/40">
          <div className="flex items-start justify-between">
            <SolutionHead icon={<Megaphone className="h-5 w-5" />} id="Solution 3" title="Path-Based Dynamic Ads" lever="Funding lever · new intellectual property" />
            <Pill variant="orange">Patent-pending</Pill>
          </div>
          <p className="mt-3 text-sm text-ic-greenDeep">
            Micro-zone route targeting combines stock-keeping-unit velocity, point-of-interest and daypart context, and live inventory feed. The robot screen shown above (Kellogg's at HEB, Lay's at Kroger) is exactly this — co-branded retailer × consumer-packaged-goods ads tied to the path the robot is taking.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-3 ring-1 ring-ic-greenDeep/15">
              <div className="text-[10px] font-bold uppercase text-ic-greenDeep">Target by month 9</div>
              <div className="font-mono text-2xl font-extrabold text-ic-orange">${PBDA_REVENUE_PER_DELIVERY_TARGET.toFixed(2)} per delivery</div>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-ic-greenDeep/15">
              <div className="text-[10px] font-bold uppercase text-ic-greenDeep">Effective cost per order</div>
              <div className="font-mono text-2xl font-extrabold text-ic-orange">${SUCCESS_METRICS.costWithPbda.toFixed(2)}</div>
              <div className="text-[10px] text-ic-textMute">$4.72 base − $1.50 ad funding</div>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-ic-greenDeep/15">
              <div className="text-[10px] font-bold uppercase text-ic-greenDeep">Ad gross margin</div>
              <div className="font-mono text-2xl font-extrabold text-ic-orange">{(AD_GROSS_MARGIN * 100).toFixed(0)} percent</div>
              <div className="text-[10px] text-ic-textMute">Margin-accretive savings</div>
            </div>
          </div>
        </Card>
      </div>

      {/* The Real Moat — flywheel + KPIs + future state */}
      <div className="mt-12">
        <div className="text-xs font-bold uppercase tracking-wider text-ic-orange">The real moat</div>
        <h3 className="mt-1 text-2xl font-extrabold leading-tight text-ic-greenDeep md:text-3xl">
          Competitors deliver packages. We deliver ad-supported commerce.
        </h3>
        <p className="mt-2 max-w-3xl text-sm text-ic-textMute">
          The Connected Commerce omnichannel loop only closes when robots run paths funded by retailer × consumer-packaged-goods ads. Path-Based Dynamic Ads are the bridge from Connected Stores to Connected Commerce — and the flywheel below doesn't spin without them.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="flex justify-center lg:col-span-3">
            <ConnectedCommerceFlywheel />
          </div>
          <div className="grid gap-3 lg:col-span-2">
            <KPI label="Projected ad revenue · 2025" value={fmtCompact(INSTACART_AD_REVENUE_2025)} sub="+23 percent year over year" variant="green" />
            <KPI label="Average grocery Return on Ad Spend" value={`$${INSTACART_GROCERY_ROAS.toFixed(2)}`} sub="versus Amazon $4.92 · Pacvue first half 2025" variant="orange" />
            <KPI label="Ad revenue as percent of Gross Transaction Value" value={`${fmtPct(AD_REV_AS_PCT_OF_GTV_CURRENT, 1)} → ${fmtPct(AD_REV_AS_PCT_OF_GTV_TARGET, 1)}`} sub="long-term target · Path-Based Dynamic Ads expand the surface" variant="default" />
            <KPI label="Ad gross margins" value={`${(AD_GROSS_MARGIN * 100).toFixed(0)} percent or more`} sub="margin-accretive savings" variant="dark" />
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Card className="bg-ic-orangeSoft border-ic-orange/40">
            <div className="text-xs font-bold uppercase tracking-wider text-ic-orange">Future state · agentic commerce</div>
            <p className="mt-2 text-sm text-ic-greenDeep">
              AI agent on ChatGPT builds a basket → Instacart processes → robot delivers in 30 minutes. <strong>No human in the loop from order to doorstep.</strong>
            </p>
            <p className="mt-2 text-xs text-ic-textMute">Connected Delivery is the fulfillment backbone for agentic commerce.</p>
          </Card>
          <Card className="bg-ic-greenSoft border-ic-greenDeep/30">
            <div className="text-xs font-bold uppercase tracking-wider text-ic-greenDeep">The key differentiator</div>
            <p className="mt-2 text-sm text-ic-greenDeep">
              Amazon delivers packages. Walmart delivers groceries. <strong>We deliver ad-supported, data-enriched commerce across an omnichannel platform.</strong> That flywheel doesn't exist without Connected Delivery.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Connected Commerce circular flywheel
function ConnectedCommerceFlywheel() {
  // Six nodes spaced 60° apart, starting at the top (-90°) and going clockwise.
  const nodes = [
    { angle: -90, label: 'Caper Cart\nIn-Store Shopping', icon: '🛒' },
    { angle: -30, label: 'Customer Reorders\nor Forgets Item', icon: '🔁' },
    { angle: 30, label: 'Robot Delivers\n+ Brand Coupon', icon: '🤖' },
    { angle: 90, label: 'Order Data Enriches\nAd Targeting', icon: '📊' },
    { angle: 150, label: 'Retailer Reinvests\nin Technology', icon: '🏪' },
    { angle: 210, label: 'New Brand Ad\nDollars', icon: '💰' },
  ]

  // Geometry — all values in viewBox units (0–100), origin at center (50, 50).
  // Label boxes are FIXED 100 × 76 px. With the container locked to 560 px wide
  // (max), each pixel maps to 100 / 560 = 0.1786 viewBox units, so the box
  // measures 17.86 × 13.57 in viewBox terms.
  // We pick labelRadius so the inner edge of every box sits the same distance
  // from the ring — that's what "equidistant from center" really means visually.
  const cx = 50
  const cy = 50
  const ringRadius = 26 // dotted track
  const arcRadius = 28 // arrow arcs sit just outside the ring
  const labelRadius = 41 // label-box CENTERS — every box is the same size, so
  //                       every box edge ends up the same distance from center
  const containerMaxPx = 560
  const boxWpx = 100
  const boxHpx = 76

  return (
    <div className="flex w-full flex-col items-center rounded-3xl border-2 border-ic-greenDeep bg-white p-6 shadow-sm">
      <h4 className="w-full text-center text-base font-extrabold text-ic-greenDeep">Connected Commerce · Omnichannel Loop</h4>

      <div
        className="relative mx-auto mt-6 aspect-square w-full max-w-full"
        style={{ maxWidth: `${containerMaxPx}px` }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4ecc9" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#d4ecc9" stopOpacity="0" />
            </radialGradient>
            <marker id="flowArrow" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="3.2" markerHeight="3.2" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#ff7009" />
            </marker>
          </defs>

          {/* Background glow */}
          <circle cx={cx} cy={cy} r={ringRadius + 12} fill="url(#hubGlow)" />

          {/* Flywheel — dashed ring rotating continuously about its own center */}
          <circle
            className="cd-flywheel-ring"
            cx={cx}
            cy={cy}
            r={ringRadius}
            fill="none"
            stroke="#0a4525"
            strokeWidth="0.55"
            strokeDasharray="2.2 1.6"
            opacity="0.6"
          />

          {/* Six curved flow arrows, one between each pair of adjacent nodes */}
          {nodes.map((n, i) => {
            const next = nodes[(i + 1) % nodes.length]
            const gap = 0.22 // radian gap so each arrow stops short of the next anchor dot
            const a1 = (n.angle * Math.PI) / 180 + gap
            const a2 = (next.angle * Math.PI) / 180 - gap
            const x1 = cx + arcRadius * Math.cos(a1)
            const y1 = cy + arcRadius * Math.sin(a1)
            const x2 = cx + arcRadius * Math.cos(a2)
            const y2 = cy + arcRadius * Math.sin(a2)
            return (
              <path
                key={`arc-${i}`}
                className="cd-flywheel-arrow"
                d={`M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke="#ff7009"
                strokeWidth="0.7"
                opacity="0.75"
                markerEnd="url(#flowArrow)"
                style={{ animationDelay: `${i * 0.55}s` }}
              />
            )
          })}

          {/* Anchor dots ON the dotted ring — precisely at the same radius as the ring */}
          {nodes.map((n, i) => {
            const a = (n.angle * Math.PI) / 180
            const x = cx + ringRadius * Math.cos(a)
            const y = cy + ringRadius * Math.sin(a)
            return (
              <g key={`dot-${i}`}>
                <circle cx={x} cy={y} r="2.6" fill="#ff7009" />
                <circle cx={x} cy={y} r="3.8" fill="none" stroke="#0a4525" strokeWidth="0.4" />
              </g>
            )
          })}

          {/* Connector segment from each anchor dot outward to its label box */}
          {nodes.map((n, i) => {
            const a = (n.angle * Math.PI) / 180
            const inner = ringRadius + 1.4
            const outer = labelRadius - 6.5
            const x1 = cx + inner * Math.cos(a)
            const y1 = cy + inner * Math.sin(a)
            const x2 = cx + outer * Math.cos(a)
            const y2 = cy + outer * Math.sin(a)
            return (
              <line
                key={`conn-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#0a4525"
                strokeWidth="0.45"
                opacity="0.5"
              />
            )
          })}

          {/* Hub */}
          <circle cx={cx} cy={cy} r={12.5} fill="#0a4525" />
          <circle cx={cx} cy={cy} r={10} fill="none" stroke="#ff7009" strokeWidth="0.7" />
          <text x={cx} y={cy - 1.4} textAnchor="middle" fontSize="3.0" fontWeight="800" fill="#ffffff">CONNECTED</text>
          <text x={cx} y={cy + 2.0} textAnchor="middle" fontSize="3.0" fontWeight="800" fill="#ffffff">COMMERCE</text>
          <text x={cx} y={cy + 5.7} textAnchor="middle" fontSize="2.0" fontWeight="700" fill="#ff7009">Omnichannel Loop</text>
        </svg>

        {/* HTML label cards — every card is FIXED size, so every box edge sits the
            same distance from the center along its angular axis. The centers all
            sit on a circle of radius labelRadius (% of the square container). */}
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180
          const x = cx + labelRadius * Math.cos(rad)
          const y = cy + labelRadius * Math.sin(rad)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className="flex flex-col items-center justify-center rounded-xl border-2 border-ic-greenDeep bg-white px-2 py-1 text-center shadow-md"
                style={{ width: `${boxWpx}px`, height: `${boxHpx}px` }}
              >
                <div className="text-lg leading-none">{n.icon}</div>
                <div className="mt-1 whitespace-pre-line text-[10px] font-bold leading-[1.15] text-ic-greenDeep">
                  {n.label}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <p className="mx-auto mt-6 w-full max-w-lg text-center text-[11px] italic text-ic-textMute">
        Every card is anchored to the same-radius ring; the dashed track rotates continuously and arrows mark flow direction. Robots running ad-funded routes complete the loop competitors can't replicate.
      </p>
    </div>
  )
}

function SolutionHead({ icon, id, title, lever }: { icon: React.ReactNode; id: string; title: string; lever: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-ic-greenSoft text-ic-greenDeep">{icon}</div>
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-ic-cream2 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ic-greenDeep">{id}</span>
          <h3 className="text-base font-extrabold text-ic-greenDeep">{title}</h3>
        </div>
        <div className="text-[11px] font-semibold text-ic-orange">{lever}</div>
      </div>
    </div>
  )
}

// ============================================================
// 8. Priority — Gantt + RICE
// ============================================================
function Priority() {
  return (
    <section id="priority" className="section-alt">
      <div className="section-shell">
        <SectionHeader
          eyebrow="07 · Prioritize"
          title="Reach × Impact × Confidence ÷ Effort Sequencing — Why Solutions 2 and 4 Ship Before Solution 1, and Solution 3 Activates at Week 6"
          sub="Confidence and dependency drive the order. Caper Cart Computer-Vision reuse (Solution 2) has the highest confidence per engineer-month. Retailer instrumentation (Solution 4) gates onboarding. Sidewalk fleet (Solution 1) unlocks volume. Path-Based Dynamic Ads (Solution 3) only activate after route stability is proven."
        />
        <div className="mt-8">
          <GanttStrip />
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 9. Journeys
// ============================================================
function Journeys() {
  return (
    <section id="journeys" className="section-shell">
      <SectionHeader
        eyebrow="08 · Design"
        title="Journeys Across All Four Sides"
        sub="Retailer journey is expanded — Storefronts owns onboarding, the operating model, and weekly economics."
      />
      <div className="mt-8 space-y-4">
        <Card>
          <h3 className="text-lg font-extrabold text-ic-greenDeep">Customer</h3>
          <Stepper steps={['Browse', 'Robot opt-in at checkout', 'Track Estimated Time of Arrival', 'Unlock and receive', 'Reorder']} />
        </Card>
        <Card>
          <h3 className="text-lg font-extrabold text-ic-greenDeep">Shopper</h3>
          <Stepper steps={['Queue eligible order', 'Pick', 'Load + Computer-Vision verify', 'Continue in-store', 'Earn premium + bonus']} />
        </Card>
        <Card emphasize className="bg-ic-greenSoft">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-ic-greenDeep">Retailer · Primary journey</h3>
            <Pill variant="orange">Spine</Pill>
          </div>
          <Stepper steps={['Onboard bays', 'Configure ad mix + guardrails', 'Operate daily', 'Monitor dashboard', 'Reconcile weekly profit and loss', 'Reinvest ad-share into loyalty']} />
        </Card>
        <Card>
          <h3 className="text-lg font-extrabold text-ic-greenDeep">Advertiser / Consumer Packaged Goods Brand</h3>
          <Stepper steps={['Plan zone inventory', 'Bid by archetype and daypart', 'Upload creative', 'Run routes', 'Measure closed-loop Return on Ad Spend']} />
        </Card>
      </div>
    </section>
  )
}

function Stepper({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ic-textMute">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-ic-greenDeep font-mono text-[10px] font-bold text-white">{i + 1}</span>
          <span className="text-ic-greenDeep">{s}</span>
          {i < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-ic-textMute" />}
        </li>
      ))}
    </ol>
  )
}

// ============================================================
// 10. Metrics — ADCS-Net + success/guardrails + retailer panel
// ============================================================
function Metrics() {
  return (
    <section id="metrics" className="section-alt">
      <div className="section-shell">
        <SectionHeader
          eyebrow="09 · Measure"
          title="North-Star, Success, Guardrail, and Health Metrics"
          sub="One number measures whether the strategy is working operationally. Three success metrics tell us how. Three guardrails tell us when to pause. Six health metrics tell us whether the underlying system is fit to scale."
        />

        <div className="mt-8">
          <AdcsTrajectory />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <KPI label="Cost per order" value={`≤ $${SUCCESS_METRICS.costBase.toFixed(2)}`} sub={`≤ $${SUCCESS_METRICS.costWithPbda.toFixed(2)} with Path-Based Dynamic Ads`} variant="green" />
          <KPI label="Path-Based Dynamic Ads revenue" value={`≥ $${SUCCESS_METRICS.pbdaRevenue.toFixed(2)}`} sub="per delivery, by month 9" variant="green" />
          <KPI label="Robot opt-in rate" value={fmtPct(SUCCESS_METRICS.optInRate)} sub="of robot-eligible orders" variant="green" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card className="bg-ic-orangeSoft border-ic-orange/40">
            <div className="text-[10px] font-bold uppercase tracking-wider text-ic-orange">Guardrail</div>
            <div className="mt-1 font-mono text-2xl font-extrabold text-ic-greenDeep">≥ 95 percent</div>
            <div className="text-xs text-ic-greenDeep">Delivery success rate · pause if below 90 percent</div>
          </Card>
          <Card className="bg-ic-orangeSoft border-ic-orange/40">
            <div className="text-[10px] font-bold uppercase tracking-wider text-ic-orange">Guardrail</div>
            <div className="mt-1 font-mono text-2xl font-extrabold text-ic-greenDeep">≤ 5 points</div>
            <div className="text-xs text-ic-greenDeep">Net Promoter Score gap (robot versus human) · pause if above 10</div>
          </Card>
          <Card className="bg-ic-orangeSoft border-ic-orange/40">
            <div className="text-[10px] font-bold uppercase tracking-wider text-ic-orange">Guardrail</div>
            <div className="mt-1 font-mono text-2xl font-extrabold text-ic-greenDeep">±2 percent</div>
            <div className="text-xs text-ic-greenDeep">Shopper earnings parity · pause if above ±5 percent</div>
          </Card>
        </div>

        {/* HEALTH METRICS — operational system fitness */}
        <div className="mt-6 rounded-3xl border-2 border-ic-greenDeep bg-white p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-ic-greenDeep" />
            <div className="text-xs font-bold uppercase tracking-wider text-ic-greenDeep">Health metrics · system fitness for scale</div>
          </div>
          <h3 className="mt-2 text-xl font-extrabold text-ic-greenDeep">Is the underlying platform healthy enough to grow on?</h3>
          <p className="mt-1 max-w-3xl text-sm text-ic-textMute">
            Success and guardrail metrics tell us whether the strategy is working. Health metrics tell us whether the operating system can absorb 10× the volume without breaking. Reviewed weekly during the pilot, daily after Decision Gate Week 12.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <HealthMetric
              icon={<Bot className="h-4 w-4" />}
              label="Fleet availability"
              value="≥ 96 percent"
              sub="Robots online and dispatchable at any moment · alarm below 90 percent"
            />
            <HealthMetric
              icon={<Timer className="h-4 w-4" />}
              label="Mean time to recover"
              value="≤ 8 minutes"
              sub="From robot incident to back-on-route · alarm above 15 minutes"
            />
            <HealthMetric
              icon={<Hand className="h-4 w-4" />}
              label="Remote-takeover rate"
              value="≤ 12 percent"
              sub="Share of orders requiring a remote operator · trends downward weekly"
            />
            <HealthMetric
              icon={<Cpu className="h-4 w-4" />}
              label="Cargo-verification accuracy"
              value="≥ 99 percent"
              sub="Computer-Vision scans correctly verifying packed items · alarm below 97 percent"
            />
            <HealthMetric
              icon={<Activity className="h-4 w-4" />}
              label="Order-pipeline uptime"
              value="≥ 99.9 percent"
              sub="Customer app, dispatch backend, retailer dashboard · monthly rolling"
            />
            <HealthMetric
              icon={<Battery className="h-4 w-4" />}
              label="Battery-cycle health"
              value="≥ 80 percent"
              sub="Average remaining capacity at month 18 versus brand-new baseline"
            />
          </div>

          <p className="mt-4 text-[11px] italic text-ic-textMute">
            Any single health metric outside its alarm band triggers a within-week incident review; two simultaneous breaches escalate to the same pause threshold as the guardrails above.
          </p>
        </div>

        <div className="mt-6 rounded-3xl border-2 border-ic-greenDeep/15 bg-ic-greenSoft p-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-ic-orange" />
            <div className="text-xs font-bold uppercase tracking-wider text-ic-orange">Retailer panel · strategic outcome layer</div>
          </div>
          <h3 className="mt-2 text-xl font-extrabold text-ic-greenDeep">What the retailer sees that no operator metric captures</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <RetailerMetric label="Retailer-attributed Net Promoter Score lift" value="+ points surveyed" sub="versus control human-delivered" />
            <RetailerMetric label="Ad-share revenue per store" value="$4,100+ per year" sub="pilot baseline" />
            <RetailerMetric label="Branded impression rate" value="≥ 95 percent" sub="of robot deliveries" />
            <RetailerMetric label="Caper Cart → Robot continuity" value="42 percent" sub="orders carried across surfaces" />
          </div>
        </div>
      </div>
    </section>
  )
}

function RetailerMetric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-ic-greenDeep/20 bg-white p-4">
      <div className="text-[10px] font-bold uppercase tracking-wider text-ic-textMute">{label}</div>
      <div className="mt-1 font-mono text-2xl font-extrabold text-ic-greenDeep">{value}</div>
      <div className="text-[10px] text-ic-textMute">{sub}</div>
    </div>
  )
}

function HealthMetric({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-ic-greenDeep/20 bg-ic-cream2 p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-ic-greenDeep text-white">{icon}</span>
        <div className="text-[10px] font-bold uppercase tracking-wider text-ic-greenDeep">{label}</div>
      </div>
      <div className="mt-2 font-mono text-2xl font-extrabold text-ic-greenDeep">{value}</div>
      <div className="mt-1 text-[11px] leading-snug text-ic-textMute">{sub}</div>
    </div>
  )
}

// ============================================================
// 11. Risk + Pilot Investment
// ============================================================
function RiskAndPilot() {
  const risks: Array<[number, string, string, string, string]> = [
    [1, 'Theft or tampering', 'High', 'Medium', 'Locked compartments plus unlock codes. 360-degree cameras. Insurance. Human shadow weeks 1 to 2.'],
    [2, 'Shopper backlash', 'High', 'Medium', '$4 robot premium plus $1 accuracy bonus equals earnings-neutral. 30-day advance communications. Net-new small-basket volume.'],
    [3, 'Retailer resistance', 'High', 'Medium', 'Design-partner model · one retailer co-develops · shared cost savings · ~50 square foot footprint.'],
    [4, 'Partner viability', 'Medium', 'Medium', 'Serve Robotics negative margins ($80 million loss). Performance milestone contracts. Partner-agnostic application programming interface. Coco / Starship as backups.'],
    [5, 'Regulatory and Americans with Disabilities Act risk', 'Medium', 'Medium', 'Texas Senate Bill 969 statewide. Monitor municipal override risk. Americans with Disabilities Act sidewalk clearance. Liability in retailer contract.'],
    [6, 'Customer adoption', 'Medium', 'Medium', 'Always opt-in. First delivery free. $3 savings value proposition. A-versus-B-tested messaging.'],
    [7, 'Operational edge cases', 'Medium', 'High', 'Address pre-validation. Remote operator takeover (1 to 12 ratio). Auto-reroute to human courier. 100 percent fallback coverage.'],
    [8, 'Path-Based Dynamic Ads backlash', 'Medium', 'Medium', 'Zone-level anonymization. Frequency caps. Brand-safety controls. Opt-out in customer settings.'],
  ]

  return (
    <section id="risks" className="section-shell">
      <SectionHeader
        eyebrow="10 · Risk"
        title="Eight Risks Are Manageable, Downside Is Bounded"
        sub={`We're spending less than $1.2 million to validate a $100-million-or-more annual savings opportunity. If the pilot fails, we've lost less than one quarter's spend on a mid-tier marketing campaign.`}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Risks table */}
        <div className="lg:col-span-2 overflow-x-auto rounded-3xl border border-ic-border bg-white p-5 shadow-sm">
          <table className="w-full table-auto text-left text-sm">
            <thead className="text-ic-greenDeep">
              <tr className="border-b border-ic-border">
                <th className="pb-3">#</th>
                <th className="pb-3">Risk</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">Likelihood</th>
                <th className="pb-3">Mitigation</th>
              </tr>
            </thead>
            <tbody className="text-ic-textMute">
              {risks.map(([n, name, sev, lik, mit]) => (
                <tr key={n} className="border-t border-ic-border align-top">
                  <td className="py-2 font-mono">{n}</td>
                  <td className="py-2 font-bold text-ic-greenDeep">{name}</td>
                  <td className="py-2"><RiskChip level={sev} /></td>
                  <td className="py-2"><RiskChip level={lik} /></td>
                  <td className="py-2 text-xs">{mit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pilot investment */}
        <div className="rounded-3xl border-2 border-ic-greenDeep bg-ic-greenSoft p-6">
          <div className="text-xs font-bold uppercase tracking-wider text-ic-orange">Pilot investment · bounded downside</div>
          <div className="mt-3 space-y-2 text-sm">
            {Object.values(PILOT_INVESTMENT).map((line) => (
              <div key={line.label} className="flex items-baseline justify-between gap-4 border-b border-ic-greenDeep/15 pb-2">
                <span className="text-ic-greenDeep">{line.label}</span>
                <span className="font-mono font-bold text-ic-greenDeep">{fmtCompact(line.low)}–{fmtCompact(line.high)}</span>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 pt-2">
              <span className="text-base font-extrabold text-ic-greenDeep">Total pilot investment</span>
              <span className="font-mono text-base font-extrabold text-ic-orange">{fmtCompact(PILOT_INVESTMENT_TOTAL.low)}–{fmtCompact(PILOT_INVESTMENT_TOTAL.high)}</span>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-white p-3 text-xs text-ic-greenDeep ring-1 ring-ic-greenDeep/20">
            <strong className="text-ic-orange">Autonomy supplements — never replaces — human courier capacity.</strong> 100% fallback at all times.
          </div>
          <p className="mt-3 text-[10px] italic text-ic-greenDeep/70">
            Caveat: pilot investment excludes internal overhead for non-dedicated squads. Estimate held to direct, attributable spend.
          </p>
        </div>
      </div>
    </section>
  )
}

function RiskChip({ level }: { level: string }) {
  const map: Record<string, string> = {
    High: 'bg-red-100 text-red-700 border-red-300',
    Medium: 'bg-amber-100 text-amber-800 border-amber-300',
    Low: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  }
  return <span className={`inline-flex rounded border px-2 py-0.5 text-[10px] font-bold ${map[level] ?? ''}`}>{level}</span>
}

// ============================================================
// 12. Pilot Plan — DFW
// ============================================================
function PilotPlan() {
  return (
    <section id="pilot" className="section-alt">
      <div className="section-shell">
        <SectionHeader
          eyebrow="11 · Pilot"
          title={`Dallas–Fort Worth — 90 Days, ${PILOT_STORES} Stores, ${Math.round(PILOT_TOTAL_ORDERS)} Robot Orders`}
          sub="Dallas–Fort Worth is purpose-built for autonomy: Texas Senate Bill 969 permits sidewalk vehicles statewide, suburbs are car-centric with wide sidewalks, climate is forgiving year-round, and we have both Kroger and HEB partnerships in-region."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Why Dallas–Fort Worth + stores */}
          <Card>
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-ic-greenDeep"><MapIcon className="h-5 w-5" /> Why Dallas–Fort Worth</h3>
            <ul className="mt-3 space-y-1.5 text-xs text-ic-textMute">
              <li>· Texas Senate Bill 969 — autonomous sidewalk vehicles permitted statewide</li>
              <li>· Flat terrain, warm climate year-round</li>
              <li>· Kroger plus HEB presence (two partner types)</li>
              <li>· Car-centric suburbs, wide sidewalks (Frisco, McKinney, Plano)</li>
            </ul>
            <h4 className="mt-4 text-xs font-bold uppercase tracking-wider text-ic-orange">5 pilot stores</h4>
            <ol className="mt-2 space-y-1 text-xs text-ic-greenDeep">
              {PILOT_STORES_LIST.map((s) => (
                <li key={s.id}><span className="font-mono">{s.id}.</span> <strong>{s.retailer}</strong> · {s.address}</li>
              ))}
            </ol>
            <div className="mt-4 rounded-xl bg-ic-greenSoft p-3 text-xs text-ic-greenDeep">
              <strong>Target profile:</strong> Suburban · within 1.5 miles of store · 20 items or fewer / 40 pounds or less · price-sensitive and time-conscious
            </div>
          </Card>

          {/* Funnel math */}
          <Card>
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-ic-greenDeep"><LineChart className="h-5 w-5" /> Honest order funnel</h3>
            <div className="mt-4 space-y-2">
              <FunnelStep label={`${PILOT_ORDERS_PER_STORE_PER_DAY} orders per store per day`} sub="Instacart baseline" pct={1} />
              <FunnelStep label={`× ${fmtPct(PILOT_ROBOT_ELIGIBLE_PCT)} robot-eligible`} sub="weight + distance + no alcohol → 10 eligible" pct={0.7} />
              <FunnelStep label={`× ${fmtPct(PILOT_OPT_IN_PCT)} opt-in (conservative)`} sub={`→ ${(PILOT_ORDERS_PER_STORE_PER_DAY * PILOT_ROBOT_ELIGIBLE_PCT * PILOT_OPT_IN_PCT).toFixed(1)} robot orders per store per day`} pct={0.4} />
              <FunnelStep label={`× ${PILOT_STORES} stores × ${PILOT_DAYS} days`} sub={`→ ~${Math.round(PILOT_TOTAL_ORDERS)} total robot orders`} pct={0.25} dark />
            </div>
            <div className="mt-3 rounded-xl bg-ic-orangeSoft p-3 text-xs text-ic-greenDeep">
              <strong>{Math.round(PILOT_TOTAL_ORDERS)} orders is directional learning, not statistical proof.</strong> This pilot optimizes for <em>learning velocity</em>, not conversion lift.
            </div>
          </Card>

          {/* Decision framework */}
          <Card>
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-ic-greenDeep"><ClipboardCheck className="h-5 w-5" /> Decision framework</h3>
            <div className="mt-4 space-y-3 text-sm">
              <DecisionRow level="SCALE" color="green" criteria={`Success ≥ 95 percent · Net Promoter Score gap ≤ 5 · opt-in ≥ 15 percent`} action="Expand to 10 stores · begin Austin evaluation" />
              <DecisionRow level="ITERATE" color="orange" criteria="Success 90 to 95 percent OR Net Promoter Score gap 5 to 10" action="Fix issues · extend 30 days" />
              <DecisionRow level="PAUSE" color="red" criteria="Success below 90 percent OR Net Promoter Score gap above 10 OR safety incident" action={`Document learnings · exit cost less than ${fmtCompact(PILOT_INVESTMENT_TOTAL.high)}`} />
            </div>
            <h4 className="mt-5 text-xs font-bold uppercase tracking-wider text-ic-orange">Key pilot metrics</h4>
            <table className="mt-2 w-full text-xs">
              <tbody className="text-ic-textMute">
                <tr><td>Delivery success rate</td><td className="text-right font-mono font-bold text-ic-greenDeep">≥ 95 percent</td></tr>
                <tr><td>Net Promoter Score gap (robot versus human)</td><td className="text-right font-mono font-bold text-ic-greenDeep">≤ 5 points</td></tr>
                <tr><td>Opt-in rate</td><td className="text-right font-mono font-bold text-ic-greenDeep">≥ 15 percent</td></tr>
                <tr><td>Average delivery time (1.5 miles)</td><td className="text-right font-mono font-bold text-ic-greenDeep">≤ 25 minutes</td></tr>
                <tr><td>Robot utilization</td><td className="text-right font-mono font-bold text-ic-greenDeep">≥ 5 per day by week 8</td></tr>
                <tr><td>Shopper satisfaction</td><td className="text-right font-mono font-bold text-ic-greenDeep">≥ 4.0 / 5.0</td></tr>
                <tr><td>"Where is my order" ticket reduction</td><td className="text-right font-mono font-bold text-ic-greenDeep">≥ 20 percent</td></tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </section>
  )
}

function FunnelStep({ label, sub, pct, dark }: { label: string; sub: string; pct: number; dark?: boolean }) {
  return (
    <div className={`rounded-xl border ${dark ? 'border-ic-greenDeep bg-ic-greenDeep text-white' : 'border-ic-border bg-ic-cream2'} p-3`}>
      <div className={`flex items-baseline justify-between text-sm font-bold ${dark ? 'text-white' : 'text-ic-greenDeep'}`}>
        <span>{label}</span>
        <span className={`font-mono text-xs ${dark ? 'text-ic-orangeSoft' : 'text-ic-orange'}`}>{Math.round(pct * 100)}%</span>
      </div>
      <div className={`mt-1 text-[11px] ${dark ? 'text-white/80' : 'text-ic-textMute'}`}>{sub}</div>
    </div>
  )
}

function DecisionRow({ level, criteria, action, color }: { level: string; criteria: string; action: string; color: 'green' | 'orange' | 'red' }) {
  const colors = {
    green: 'bg-ic-greenSoft text-ic-greenDeep border-ic-greenDeep/30',
    orange: 'bg-ic-orangeSoft text-ic-greenDeep border-ic-orange/30',
    red: 'bg-red-50 text-red-700 border-red-200',
  }
  return (
    <div className={`rounded-xl border-2 p-3 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-extrabold">{level}</span>
      </div>
      <div className="mt-1 text-[11px]"><strong>If:</strong> {criteria}</div>
      <div className="mt-0.5 text-[11px]"><strong>Then:</strong> {action}</div>
    </div>
  )
}

// ============================================================
// 13. Wireframes — 5 live mini-interfaces
// ============================================================
function Wireframes() {
  return (
    <section id="wireframes" className="section-shell">
      <SectionHeader
        eyebrow="12 · Surfaces"
        title="Connected Delivery Across Five Live Interfaces"
        sub="Five Minimum Viable Product surfaces — Customer Checkout, Customer Tracking, Associate Loading, Retailer Dashboard (compact), Operator Fleet Monitor. Built as live components so the experience is one click from real."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <WfCustomerCheckout />
        <WfCustomerTracking />
        <WfAssociateLoading />
        <WfRetailerDashboard />
        <WfOperatorMonitor />
      </div>

      {/* Minimum Viable Product — 3 product surfaces breakdown */}
      <div className="mt-10 rounded-3xl border-2 border-ic-greenDeep/15 bg-white p-6 shadow-sm md:p-8">
        <div className="text-xs font-bold uppercase tracking-wider text-ic-orange">Minimum Viable Product · 3 product surfaces</div>
        <h3 className="mt-1 text-xl font-extrabold text-ic-greenDeep">What ships in the 90-day pilot</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-ic-border bg-ic-cream2 p-5">
            <div className="text-sm font-extrabold text-ic-greenDeep">Customer App</div>
            <ul className="mt-2 space-y-1 text-xs text-ic-textMute">
              <li>· Robot delivery option at checkout (opt-in)</li>
              <li>· Real-time Global Positioning System tracking plus Estimated Time of Arrival</li>
              <li>· Unlock code via push notification</li>
              <li>· Delivery photo confirmation</li>
              <li>· Rating flow plus reorder loop</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ic-border bg-ic-cream2 p-5">
            <div className="text-sm font-extrabold text-ic-greenDeep">Associate App</div>
            <ul className="mt-2 space-y-1 text-xs text-ic-textMute">
              <li>· Robot loading workflow (compartment, weight, Computer-Vision scan)</li>
              <li>· Robot-eligible order queue</li>
              <li>· Escalation button</li>
              <li>· Caper Cart Computer-Vision reuse for cargo verification</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ic-border bg-ic-cream2 p-5">
            <div className="text-sm font-extrabold text-ic-greenDeep">Operations Backend</div>
            <ul className="mt-2 space-y-1 text-xs text-ic-textMute">
              <li>· Address pre-validation</li>
              <li>· Dispatch algorithm</li>
              <li>· Remote operator console (1 to 12 ratio)</li>
              <li>· Auto-failover to human courier</li>
              <li>· Analytics dashboard plus retailer panel feed</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] italic text-ic-textMute">
        Caveat: wireframes represent Minimum Viable Product state; final user interface to align with the Instacart design system.
      </p>
    </section>
  )
}

// ============================================================
// 14. Closing
// ============================================================
function Closing() {
  return (
    <section className="section-alt">
      <div className="section-shell text-center">
        <Pill>Thesis</Pill>
        <h2 className="mx-auto mt-4 max-w-4xl text-balance text-3xl font-extrabold leading-tight text-ic-greenDeep md:text-5xl">
          Connected Delivery is the missing tier of the Instacart Operating System.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base text-ic-textMute md:text-lg">
          Commit Phase 1 sidewalk robots <strong>now</strong> to protect storefronts. Fund the savings with Path-Based Dynamic Ads. Earn the right to drones in Phase 2. Spend less than $1.2 million to learn whether $100 million or more in annual savings is real.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <KPI label="Cost per order at scale" value={`$${ROBOT_TARGET_COST.toFixed(2)}`} sub={`53 percent savings versus $${HUMAN_COURIER_COST.toFixed(2)}`} variant="green" />
          <KPI label="Pilot investment" value={`${fmtCompact(PILOT_INVESTMENT_TOTAL.low)}–${fmtCompact(PILOT_INVESTMENT_TOTAL.high)}`} sub="90 days · 5 stores · Dallas–Fort Worth" variant="orange" />
          <KPI label="Annual opportunity" value="$100 million or more" sub="savings, before ad upside" variant="dark" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#hero" className="inline-flex items-center gap-2 rounded-full border-2 border-ic-greenDeep px-5 py-2.5 text-sm font-bold text-ic-greenDeep transition hover:bg-ic-greenDeep hover:text-white">
            Back to top
          </a>
          <a href="#opportunity" className="inline-flex items-center gap-2 rounded-full bg-ic-orange px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
            Stress-test the unit economics <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Footer
// ============================================================
function Footer() {
  return (
    <footer className="border-t border-ic-border bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 text-xs text-ic-textMute md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="text-ic-greenDeep">Connected Delivery</strong> · Instacart Associate Product Manager Product Team Jam · Vishwajeet Jayanthi Karthikeyan
          </div>
          <div>
            Sources: Serve Robotics Securities and Exchange Commission 2024–2025 · Instacart Annual Report 2024 · Texas Senate Bill 969 · NerdWallet / Spocket 2025 · Pacvue · eMarketer
          </div>
        </div>
      </div>
    </footer>
  )
}
