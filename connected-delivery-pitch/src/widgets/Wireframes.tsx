import { AlertTriangle, CheckCircle2, MapPin, Package, ShoppingCart } from 'lucide-react'

const WF_FRAME =
  'rounded-[28px] border-[6px] border-ic-greenDeep bg-white p-4 shadow-md'

// ============================================================
// 1) Customer Checkout
// ============================================================
export function WfCustomerCheckout() {
  return (
    <Wireframe label="Customer · Checkout">
      <div className={WF_FRAME}>
        <div className="text-center text-sm font-bold text-ic-greenDeep">Choose Your Delivery</div>
        <div className="mt-3 space-y-2">
          <DeliveryOption tier="Standard" eta="1 to 2 hours" price="$5.99" />
          <DeliveryOption tier="Robot" eta="~30 minutes" price="$2.99" badge="NEW" save="SAVE $3.00" highlight />
          <DeliveryOption tier="Priority" eta="30 minutes" price="$9.99" />
        </div>
        <button className="mt-4 w-full rounded-lg bg-ic-greenDeep py-2 text-sm font-bold text-white">
          Place Order $47.23
        </button>
      </div>
    </Wireframe>
  )
}

function DeliveryOption({
  tier,
  eta,
  price,
  badge,
  save,
  highlight,
}: {
  tier: string
  eta: string
  price: string
  badge?: string
  save?: string
  highlight?: boolean
}) {
  return (
    <div className={`rounded-lg border-2 p-2 ${highlight ? 'border-ic-orange bg-ic-orangeSoft' : 'border-ic-border bg-white'}`}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 font-bold text-ic-greenDeep">
          {tier}
          {badge && <span className="rounded bg-ic-orange px-1 text-[9px] text-white">{badge}</span>}
        </div>
        <div className="font-mono font-bold text-ic-greenDeep">{price}</div>
      </div>
      <div className="mt-0.5 flex items-center justify-between text-[10px] text-ic-textMute">
        <span>{eta}</span>
        {save && <span className="font-bold text-ic-orange">{save}</span>}
      </div>
    </div>
  )
}

// ============================================================
// 2) Customer Tracking
// ============================================================
export function WfCustomerTracking() {
  return (
    <Wireframe label="Customer · Tracking">
      <div className={WF_FRAME}>
        <div className="text-center text-sm font-bold text-ic-greenDeep">Your order is coming</div>
        <div className="mt-3 rounded-lg border border-dashed border-ic-greenDeep/30 bg-ic-cream2 p-3">
          <div className="flex items-center justify-between text-[11px] text-ic-greenDeep">
            <Package className="h-4 w-4" />
            <span>━━━━ ━━━━</span>
            <MapPin className="h-4 w-4 text-ic-orange" />
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded bg-white">
            <div className="h-full w-2/3 bg-ic-orange" />
          </div>
          <div className="mt-2 text-center text-[11px] text-ic-textMute">Estimated arrival: 8 minutes · 0.4 miles</div>
        </div>
        <div className="mt-3">
          <div className="text-[10px] uppercase text-ic-textMute">Unlock Code</div>
          <div className="mt-1 grid grid-cols-4 gap-1">
            {['7', '2', '9', '4'].map((d) => (
              <div key={d} className="rounded border border-ic-greenDeep py-1 text-center font-mono text-base font-bold text-ic-greenDeep">{d}</div>
            ))}
          </div>
        </div>
        <div className="mt-3 text-[10px] text-ic-textMute">Robot waits 5 minutes · <span className="font-bold text-ic-orange underline">Switch to human →</span></div>
      </div>
    </Wireframe>
  )
}

// ============================================================
// 3) Associate Loading
// ============================================================
export function WfAssociateLoading() {
  return (
    <Wireframe label="Associate · Loading">
      <div className={WF_FRAME}>
        <div className="text-center text-sm font-bold text-ic-greenDeep">Load Robot — Bay 2</div>
        <div className="mt-2 text-[11px] text-ic-textMute">Order #4721 · Compartment A · 12 items · 18.4 pounds</div>
        <ul className="mt-3 space-y-1 text-[11px]">
          {[
            { label: 'Organic bananas (1)', done: true },
            { label: 'Whole milk, 1 gal', done: true },
            { label: 'Sourdough bread', done: true },
            { label: 'Greek yogurt', done: false, scanning: true },
          ].map((it) => (
            <li key={it.label} className="flex items-center gap-2">
              {it.done ? <CheckCircle2 className="h-3.5 w-3.5 text-ic-greenDeep" /> : it.scanning ? <span className="h-3.5 w-3.5 animate-pulse rounded-full bg-ic-orange" /> : <span className="h-3.5 w-3.5 rounded-full border border-ic-textMute" />}
              <span className={it.done ? 'text-ic-greenDeep' : 'text-ic-textMute'}>{it.label}{it.scanning ? ' ↻ scanning' : ''}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 h-1.5 overflow-hidden rounded bg-ic-cream2">
          <div className="h-full w-3/4 bg-ic-greenDeep" />
        </div>
        <div className="mt-2 text-[10px] text-ic-greenDeep">📷 Computer-Vision auto-verify ✓</div>
        <button className="mt-3 w-full rounded bg-ic-orangeSoft py-2 text-xs font-bold text-ic-greenDeep">Seal Compartment</button>
        <button className="mt-1 w-full rounded border border-ic-border py-1 text-[10px] text-ic-textMute">Report Issue</button>
      </div>
    </Wireframe>
  )
}

// ============================================================
// 4) Retailer Dashboard (mini)
// ============================================================
export function WfRetailerDashboard() {
  return (
    <Wireframe label="Retailer · Dashboard">
      <div className={WF_FRAME}>
        <div className="text-center text-sm font-bold text-ic-greenDeep">Connected Delivery — Kroger Plano</div>
        <div className="mt-2 grid grid-cols-2 text-[10px]">
          <div className="text-ic-textMute">Today: <span className="font-bold text-ic-greenDeep">8 orders | $34 saved</span></div>
          <div className="text-right text-ic-textMute">Week: <span className="font-bold text-ic-greenDeep">42 orders | $178 saved</span></div>
        </div>
        <div className="mt-2 flex h-16 items-end gap-1 rounded border border-dashed border-ic-border p-2">
          {[3, 4, 6, 8, 7, 9, 6, 5].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-ic-greenDeep" style={{ height: `${h * 8}%` }} />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 text-[9px] text-ic-textMute">
          <div>Bay utilization: <span className="font-bold text-ic-greenDeep">34 percent</span></div>
          <div>Load: <span className="font-bold text-ic-greenDeep">3.2 minutes</span></div>
          <div>Saved: <span className="font-bold text-ic-greenDeep">4.1 hours</span></div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1">
          <button className="rounded bg-ic-greenSoft py-1 text-[10px] font-bold text-ic-greenDeep">Export Report</button>
          <button className="rounded bg-ic-orangeSoft py-1 text-[10px] font-bold text-ic-greenDeep">Configure Bays</button>
        </div>
      </div>
    </Wireframe>
  )
}

// ============================================================
// 5) Operator Fleet Monitor
// ============================================================
export function WfOperatorMonitor() {
  return (
    <Wireframe label="Operator · Fleet Monitor">
      <div className={WF_FRAME}>
        <div className="text-center text-sm font-bold text-ic-greenDeep">Fleet Monitor — Dallas–Fort Worth · 12 active</div>
        <div className="mt-2 grid grid-cols-4 gap-1 text-[10px]">
          {['R-01', 'R-02', 'R-03', 'R-04', 'R-05', 'R-06', 'R-07', 'R-08'].map((id) => {
            const alert = id === 'R-03'
            return (
              <div key={id} className={`flex items-center justify-center gap-1 rounded p-1 ${alert ? 'bg-ic-orangeSoft text-ic-greenDeep' : 'bg-ic-greenSoft text-ic-greenDeep'}`}>
                <span className="font-mono">{id}</span>
                {alert ? <AlertTriangle className="h-3 w-3 text-ic-orange" /> : <CheckCircle2 className="h-3 w-3 text-ic-greenDeep" />}
              </div>
            )
          })}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded border border-dashed border-ic-border p-2 text-[10px] text-ic-textMute">
          <ShoppingCart className="h-4 w-4" />
          <span>[ MAP VIEW: All robots ]</span>
        </div>
        <div className="mt-2 rounded border border-ic-orange bg-ic-orangeSoft p-2 text-[10px] text-ic-greenDeep">
          <div className="font-bold">R-03 ⚠ Nav fail</div>
          <div className="mt-1 grid grid-cols-2 gap-1">
            <button className="rounded bg-ic-greenDeep py-1 text-white">Takeover</button>
            <button className="rounded border border-ic-greenDeep py-1">Reroute</button>
          </div>
        </div>
      </div>
    </Wireframe>
  )
}

function Wireframe({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 inline-flex rounded-full bg-ic-greenDeep px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        {label}
      </div>
      {children}
    </div>
  )
}
