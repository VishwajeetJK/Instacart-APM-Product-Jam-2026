import { RICE_SEQUENCE } from '../data/constants'

const TOTAL_WEEKS = 12

export function GanttStrip() {
  return (
    <div className="rounded-3xl border-2 border-ic-greenDeep/15 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ic-orange">12-week build sequence</p>
          <h3 className="mt-1 text-lg font-extrabold text-ic-greenDeep">What ships when</h3>
        </div>
      </div>

      {/* Week ruler */}
      <div className="grid grid-cols-12 gap-1 border-b border-ic-border pb-2">
        {Array.from({ length: TOTAL_WEEKS }).map((_, i) => (
          <div key={i} className="text-center text-[10px] font-semibold text-ic-textMute">Week {i + 1}</div>
        ))}
      </div>

      <div className="mt-2 space-y-2">
        {RICE_SEQUENCE.map((row) => {
          const start = row.weeks[0]
          const end = row.weeks[1]
          const leftPct = (start / TOTAL_WEEKS) * 100
          const widthPct = ((end - start) / TOTAL_WEEKS) * 100
          const fillColor: Record<string, string> = {
            'Solution 1': 'bg-ic-orange',
            'Solution 2': 'bg-ic-greenDeep',
            'Solution 3': 'bg-amber-500',
            'Solution 4': 'bg-emerald-700',
          }
          return (
            <div key={row.id} className="grid grid-cols-12 items-center gap-2">
              <div className="col-span-3 text-sm font-bold text-ic-greenDeep">
                <span className="mr-2 inline-block rounded bg-ic-cream2 px-2 py-0.5 text-[11px]">{row.id}</span>
                {row.initiative}
              </div>
              <div className="col-span-9 relative h-7 rounded bg-ic-cream2">
                <div
                  className={`absolute inset-y-0 rounded ${fillColor[row.id] ?? 'bg-ic-greenDeep'}`}
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                />
                <div
                  className="absolute inset-y-0 flex items-center px-2 text-[10px] font-bold text-white"
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                >
                  Week {start} to Week {end}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {RICE_SEQUENCE.map((row) => (
          <div key={`why-${row.id}`} className="rounded-xl border border-ic-border bg-ic-cream2 p-3">
            <div className="text-xs font-bold text-ic-greenDeep">{row.id} · {row.initiative}</div>
            <div className="mt-1 text-[11px] text-ic-textMute">{row.why}</div>
            <div className="mt-1 font-mono text-[10px] text-ic-greenDeep/70">{row.rice}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
