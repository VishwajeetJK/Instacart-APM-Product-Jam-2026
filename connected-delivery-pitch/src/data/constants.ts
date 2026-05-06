/**
 * Single source of truth for every number on the page.
 * If Omar challenges an assumption in the jam, change it here once
 * and the entire page updates: cost cards, sliders, dashboards, charts.
 *
 * All sources documented in the original PDF pitch deck (page 3).
 */

// ============================================================
// COST ECONOMICS — base case from PDF page 3 sensitivity table
// ============================================================
export const HUMAN_COURIER_COST = 10.10 // 2024 avg per-order delivery cost
export const ROBOT_TARGET_COST = 4.72 // base-case sidewalk robot at scale

// Cost component drivers (assumptions block, PDF p3)
export const ROBOT_CAPEX = 2000 // Serve Gen-3 unit cost
export const ROBOT_DEPRECIATION_YEARS = 3
export const CHARGING_COST_PER_ORDER = 0.60
export const REMOTE_OPERATOR_WAGE_PER_HOUR = 25 // $/hr
export const REMOTE_OPERATOR_RATIO = 12 // 1 operator : 12 robots
export const OPERATOR_HOURS_PER_DAY = 8
export const MAINTENANCE_PCT_OF_CAPEX = 0.15 // 15% of annual CapEx
export const MAINTENANCE_WEAR_PER_ORDER = 0.20 // $/order
export const LOADING_LABOR_RATE = 18.50 // $/hr associate
export const LOADING_TIME_MINUTES = 2.5 // per loading event
export const LOADING_COST_PER_ORDER =
  (LOADING_LABOR_RATE / 60) * LOADING_TIME_MINUTES // ≈ $0.77

export const SCENARIOS = [
  { id: 'bear', label: 'Bear', deliveriesPerDay: 3, color: '#dc2626' },
  { id: 'base', label: 'Base', deliveriesPerDay: 5, color: '#f59e0b' },
  { id: 'bull', label: 'Bull', deliveriesPerDay: 8, color: '#16a34a' },
] as const

// ============================================================
// PILOT FUNNEL — DFW (PDF page 8)
// ============================================================
export const PILOT_ORDERS_PER_STORE_PER_DAY = 50
export const PILOT_ROBOT_ELIGIBLE_PCT = 0.20 // 20% (weight, distance, no alcohol)
export const PILOT_OPT_IN_PCT = 0.15 // conservative
export const PILOT_STORES = 5
export const PILOT_DAYS = 70
// Computed funnel: 50 × 20% × 15% × 5 × 70 ≈ 525 orders
export const PILOT_TOTAL_ORDERS =
  PILOT_ORDERS_PER_STORE_PER_DAY *
  PILOT_ROBOT_ELIGIBLE_PCT *
  PILOT_OPT_IN_PCT *
  PILOT_STORES *
  PILOT_DAYS

export const PILOT_INVESTMENT = {
  fleet: { low: 80_000, high: 120_000, label: 'Fleet lease (15 robots × 90 days)' },
  engineering: { low: 600_000, high: 900_000, label: 'Engineering (2 squads × 12 weeks)' },
  ops: { low: 100_000, high: 150_000, label: 'Ops hiring + training + Legal' },
}
export const PILOT_INVESTMENT_TOTAL = { low: 780_000, high: 1_170_000 }

// ============================================================
// AD ECONOMICS — PBDA (PDF p6 + S3 spec)
// ============================================================
export const PBDA_REVENUE_PER_DELIVERY_TARGET = 1.50 // by month 9
export const INSTACART_AD_REVENUE_2025 = 1_450_000_000
export const AD_REVENUE_YOY_GROWTH = 0.23
export const INSTACART_GROCERY_ROAS = 5.25
export const AMAZON_GROCERY_ROAS = 4.92
export const AD_GROSS_MARGIN = 0.80
export const AD_REV_AS_PCT_OF_GTV_CURRENT = 0.029
export const AD_REV_AS_PCT_OF_GTV_TARGET = 0.045 // mid of 4-5%

// ============================================================
// RETAILER ECONOMICS — base case for ROI calculator (§6b)
// Default: PDF pilot baseline numbers.
// ============================================================
export const RETAILER_DEFAULTS = {
  ordersPerStorePerDay: 50,
  robotEligiblePct: 0.20,
  robotOptInPct: 0.15,
  retailerAdSharePct: 0.30, // 30% of PBDA revenue flows back to retailer
  daysPerYear: 365,
}

// Per-order economics flowing to retailer
export const RETAILER_SAVINGS_PER_ORDER =
  HUMAN_COURIER_COST - ROBOT_TARGET_COST // $5.38 cost saved
export const RETAILER_CAPER_CONTINUITY_RATE = 0.42 // % of robot orders that came from a Caper Cart shopper

// ============================================================
// SHOPPER ECONOMICS (PDF p5)
// ============================================================
export const SHOPPER_ROBOT_PREMIUM = 4.00
export const SHOPPER_ACCURACY_BONUS = 1.00
export const SHOPPER_ACTIVE_COUNT = 600_000

// ============================================================
// CUSTOMER ECONOMICS (PDF p5)
// ============================================================
export const CUSTOMER_ROBOT_FEE = 2.99
export const CUSTOMER_HUMAN_FEE = 5.99
export const CUSTOMER_FEE_SAVINGS = CUSTOMER_HUMAN_FEE - CUSTOMER_ROBOT_FEE
export const CUSTOMER_AVG_DELIVERY_MINUTES = 30
export const INSTACART_MAU = 14_400_000

// ============================================================
// PARTNER COUNTS
// ============================================================
export const RETAILER_PARTNERS = 1800
export const RETAILER_STORE_COUNT = 100_000
export const ADVERTISER_BRAND_COUNT = 7000

// ============================================================
// NORTH STAR — Autonomous Deliveries per Connected Store per Day
// at or below $4.72 net cost.
// Trajectory points: PDF + extension.
// ============================================================
export const ADCS_NET_TRAJECTORY = [
  { label: 'Week 1', value: 1.5, phase: 'Pilot' },
  { label: 'Week 4', value: 3.0, phase: 'Pilot' },
  { label: 'Week 8', value: 5.0, phase: 'Pilot' },
  { label: 'Week 12', value: 8.0, phase: 'Decision' },
  { label: 'Month 6', value: 14, phase: 'Scale' },
  { label: 'Month 12', value: 25, phase: 'Scale' },
  { label: 'Month 18', value: 42, phase: 'Scale' },
  { label: 'Month 24', value: 60, phase: 'Steady' },
] as const

// Success / guardrail thresholds (PDF p7 + p8)
export const SUCCESS_METRICS = {
  costBase: 4.72,
  costWithPbda: 3.22, // 4.72 - 1.50 ad rev
  pbdaRevenue: 1.50,
  optInRate: 0.15,
  deliverySuccess: 0.95,
  npsGap: 5,
  shopperParity: 0.02,
  utilizationByWeek8: 5,
  shopperSatisfaction: 4.0,
  wismoTicketReduction: 0.20,
}

// ============================================================
// COMPETITORS (PDF p2)
// ============================================================
export const COMPETITORS = [
  {
    name: 'Amazon Prime Air',
    status: 'Scaling',
    bullets: [
      'Active in 7+ US markets (early 2026)',
      'Targeting 500M drone deliveries/year by 2030',
      'MK30 drone: 5 lb max, 7.5-mile radius',
      'Subsidizing at ~$63/delivery cost',
    ],
  },
  {
    name: 'Walmart + Wing',
    status: 'Scaling',
    bullets: [
      'Wing drones deployed in DFW metro',
      'Serve Robotics partnership for sidewalk',
      '4,700+ US stores as launch infrastructure',
      'Building hyper-local fulfillment moats',
    ],
  },
  {
    name: 'DoorDash + Serve',
    status: 'Accelerating',
    bullets: [
      '2,000+ robots deployed (Largest fleet)',
      '3,600+ restaurant locations signed',
      'Gen-3 robots at 1/3 cost of Gen-2',
      'Multi-year DoorDash partnership',
    ],
  },
] as const

// ============================================================
// PILOT STORES — DFW
// ============================================================
export const PILOT_STORES_LIST = [
  { id: 1, retailer: 'Kroger', address: 'Custer Rd, Plano' },
  { id: 2, retailer: 'HEB', address: 'Main St, Frisco' },
  { id: 3, retailer: 'HEB', address: 'Eldorado Pkwy, McKinney' },
  { id: 4, retailer: 'Kroger', address: 'W. 15th St, Plano' },
  { id: 5, retailer: 'HEB', address: 'Preston Rd, Frisco' },
] as const

// ============================================================
// RICE SEQUENCE (PDF page 9 mapping)
// ============================================================
export const RICE_SEQUENCE = [
  {
    id: 'Solution 2',
    initiative: 'Caper Cart Computer-Vision Reuse',
    weeks: [0, 4],
    why: 'High confidence, highest leverage per engineer-month — reuses live intellectual property.',
    rice: 'Reach 4.5 · Impact 2 · Confidence 0.95 · Effort 1.5 → score 5.7',
  },
  {
    id: 'Solution 4',
    initiative: 'Retailer Bay + Dashboard',
    weeks: [2, 8],
    why: 'Required retailer instrumentation layer; gates onboarding.',
    rice: 'Reach 5 · Impact 3 · Confidence 0.85 · Effort 2 → score 6.4',
  },
  {
    id: 'Solution 1',
    initiative: 'Sidewalk Fleet (Minimum Viable Product)',
    weeks: [4, 10],
    why: 'Core volume and cost unlock; cannot test the North Star without it.',
    rice: 'Reach 5 · Impact 3 · Confidence 0.7 · Effort 4 → score 2.6',
  },
  {
    id: 'Solution 3',
    initiative: 'Path-Based Dynamic Ads (Minimum Viable Product)',
    weeks: [6, 12],
    why: 'Funding mechanism; activates only after route stability proven.',
    rice: 'Reach 4 · Impact 3 · Confidence 0.6 · Effort 3 → score 2.4',
  },
] as const

// ============================================================
// HELPERS
// ============================================================
export function fmtMoney(n: number, opts?: { decimals?: number }) {
  const d = opts?.decimals ?? 0
  return `$${n.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d })}`
}

export function fmtPct(n: number, decimals = 0) {
  return `${(n * 100).toFixed(decimals)}%`
}

export function fmtCompact(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)} billion`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)} million`
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)} thousand`
  return `$${n.toFixed(0)}`
}
