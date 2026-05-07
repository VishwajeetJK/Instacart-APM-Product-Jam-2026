import { Area, AreaChart, CartesianGrid, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ADCS_NET_TRAJECTORY } from '../data/constants'

export function AdcsTrajectory() {
  const data = ADCS_NET_TRAJECTORY.map((d) => ({ ...d }))
  return (
    <div className="rounded-3xl border-2 border-ic-greenDeep/15 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ic-orange">North Star Trajectory</p>
          <h3 className="mt-1 text-xl font-extrabold text-ic-greenDeep">Autonomous Deliveries per Connected Store per Day at or below $4.72 net cost</h3>
          <p className="mt-1 max-w-3xl text-xs text-ic-textMute">
            Meaning: for each Connected Store, we track how many robot deliveries are completed per day while keeping net delivery cost per order at or below $4.72.
          </p>
          <p className="mt-1 max-w-3xl text-xs text-ic-textMute">
            Why this is the North Star: it combines <strong>scale</strong> (deliveries per store per day) with <strong>unit economics</strong> (cost at or below $4.72) in one metric, so growth only counts when it is economically sustainable.
          </p>
        </div>
        <div className="text-xs text-ic-textMute">
          Pilot · Scale · Steady-state milestones
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 16, right: 24, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="adcsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a4525" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#0a4525" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d2" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#0a4525' }} />
            <YAxis tick={{ fontSize: 11, fill: '#4a6b57' }} label={{ value: 'Deliveries / store / day', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#4a6b57' } }} />
            <ReferenceArea x1="Week 1" x2="Week 12" y1={0} y2={70} fill="#fde68a" fillOpacity={0.25} label={{ value: 'Pilot', position: 'insideTop', fontSize: 10, fill: '#92400e' }} />
            <ReferenceArea x1="Week 12" x2="Month 18" y1={0} y2={70} fill="#bbf7d0" fillOpacity={0.20} label={{ value: 'Scale', position: 'insideTop', fontSize: 10, fill: '#065f46' }} />
            <ReferenceArea x1="Month 18" x2="Month 24" y1={0} y2={70} fill="#dbeafe" fillOpacity={0.25} label={{ value: 'Steady', position: 'insideTop', fontSize: 10, fill: '#1e40af' }} />
            <Tooltip
              contentStyle={{ borderRadius: 12, borderColor: '#d9d2c0', fontSize: 12 }}
              formatter={(v: unknown) => [`${Number(v)} per store per day`, 'Daily autonomous deliveries']}
            />
            <Area type="monotone" dataKey="value" stroke="#0a4525" strokeWidth={3} fill="url(#adcsGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-center text-xs md:grid-cols-4">
        <Milestone phase="Week 8" value="5 per day" hint="Pilot success threshold" />
        <Milestone phase="Month 12" value="25 per day" hint="Post-scale steady state" />
        <Milestone phase="Month 18" value="42 per day" hint="Drone gate evaluation" />
        <Milestone phase="Month 24" value="60 per day" hint="Long-run model assumption" />
      </div>
    </div>
  )
}

function Milestone({ phase, value, hint }: { phase: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-ic-border bg-ic-cream2 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-ic-textMute">{phase}</div>
      <div className="font-mono text-base font-extrabold text-ic-greenDeep">{value}</div>
      <div className="text-[10px] text-ic-textMute">{hint}</div>
    </div>
  )
}
