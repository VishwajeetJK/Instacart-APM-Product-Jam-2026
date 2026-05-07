import { RICE_SEQUENCE } from '../data/constants'

const TOTAL_WEEKS = 12

export function GanttStrip() {
  const riceInfo = (rice: string) => {
    const m = rice.match(/Reach\s*([\d.]+)\s*·\s*Impact\s*([\d.]+)\s*·\s*Confidence\s*([\d.]+)\s*·\s*Effort\s*([\d.]+)\s*→\s*score\s*([\d.]+)/i)
    if (!m) return null
    const reach = Number(m[1])
    const impact = Number(m[2])
    const conf = Number(m[3])
    const effort = Number(m[4])
    const score = Number(m[5])
    return { reach, impact, conf, effort, score }
  }

  const RiceInfoIcon = ({
    rice,
    explain,
  }: {
    rice: string
    explain?: { reach: string; impact: string; confidence: string; effort: string }
  }) => {
    const parsed = riceInfo(rice)
    const numerator = parsed ? parsed.reach * parsed.impact * parsed.conf : null
    const computed = parsed ? numerator! / parsed.effort : null
    const tip = parsed
      ? `RICE score = (Reach × Impact × Confidence) ÷ Effort.\n\nInputs:\n- Reach: ${parsed.reach}${explain ? ` — ${explain.reach}` : ''}\n- Impact: ${parsed.impact}${explain ? ` — ${explain.impact}` : ''}\n- Confidence: ${parsed.conf}${explain ? ` — ${explain.confidence}` : ''}\n- Effort: ${parsed.effort}${explain ? ` — ${explain.effort}` : ''}\n\nTotals:\n- Reach × Impact × Confidence = ${numerator!.toFixed(3)}\n- Score = ${numerator!.toFixed(3)} ÷ ${parsed.effort} = ${computed!.toFixed(3)} (displayed as ${parsed.score})`
      : `RICE score = (Reach × Impact × Confidence) ÷ Effort.\n\nInputs used:\n${rice}`

    return (
      <span className="group/icon relative ml-1 inline-flex align-middle opacity-0 transition-opacity duration-150 group-hover/row:opacity-100">
        <button
          type="button"
          aria-label="Explain score calculation"
          className="grid h-4 w-4 place-items-center rounded-full border border-ic-border bg-white text-[10px] font-extrabold text-ic-greenDeep/80"
        >
          i
        </button>
        <span className="pointer-events-none invisible absolute right-0 top-full z-20 mt-2 w-72 whitespace-pre-line rounded-xl border border-ic-border bg-white p-2 text-left text-[11px] font-normal leading-snug text-ic-greenDeep opacity-0 shadow-lg transition group-hover/icon:visible group-hover/icon:opacity-100 group-focus-within/icon:visible group-focus-within/icon:opacity-100">
          {tip}
        </span>
      </span>
    )
  }

  return (
    <div className="rounded-3xl border-2 border-ic-greenDeep/15 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ic-orange">12-week build sequence</p>
          <h3 className="mt-1 text-lg font-extrabold text-ic-greenDeep">What ships when</h3>
        </div>
      </div>

      {/* Week ruler */}
      <div className="grid grid-cols-12 gap-2 border-b border-ic-border pb-2">
        <div className="col-span-3" />
        <div className="col-span-9 grid grid-cols-12 gap-1">
          {Array.from({ length: TOTAL_WEEKS }).map((_, i) => (
            <div key={i} className="text-center text-[10px] font-semibold text-ic-textMute">Week {i + 1}</div>
          ))}
        </div>
      </div>

      <div className="mt-2 space-y-2">
        {RICE_SEQUENCE.map((row) => {
          const startRaw = row.weeks[0]
          const end = row.weeks[1]
          // Normalize legacy "0" start to Week 1 for alignment with the ruler.
          const start = startRaw === 0 ? 1 : startRaw
          // Weeks are 1-indexed and inclusive (Week 1 should start at 0%).
          const leftPct = ((start - 1) / TOTAL_WEEKS) * 100
          const widthPct = ((end - start + 1) / TOTAL_WEEKS) * 100
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
            <div className="group/row mt-1 flex items-center gap-1 font-mono text-[10px] text-ic-greenDeep/70">
              <span>{row.rice}</span>
              <RiceInfoIcon rice={row.rice} explain={(row as any).riceExplain} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
