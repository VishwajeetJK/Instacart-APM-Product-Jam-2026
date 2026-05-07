import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

// ============================================================
// Pill - small label badge
// ============================================================
export function Pill({ children, variant = 'orange' }: { children: ReactNode; variant?: 'orange' | 'green' }) {
  const cls = variant === 'green' ? 'bg-ic-greenSoft' : 'bg-ic-orangeSoft'
  return (
    <span className={`inline-flex rounded-full ${cls} px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-ic-greenDeep`}>
      {children}
    </span>
  )
}

// ============================================================
// Section Header - eyebrow + title + sub
// ============================================================
export function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <header className="space-y-3">
      <Pill>{eyebrow}</Pill>
      <h2 className="text-balance text-3xl font-extrabold leading-tight text-ic-greenDeep md:text-5xl">{title}</h2>
      <p className="max-w-4xl text-base text-ic-textMute md:text-lg">{sub}</p>
    </header>
  )
}

// ============================================================
// KPI Tile - big number with label, optional sub
// ============================================================
export function KPI({
  label,
  value,
  sub,
  variant = 'default',
}: {
  label: string
  value: string
  sub?: string
  variant?: 'default' | 'green' | 'orange' | 'dark'
}) {
  const styles: Record<string, string> = {
    default: 'border-ic-border bg-white',
    green: 'border-ic-greenDeep/20 bg-ic-greenSoft',
    orange: 'border-ic-orange bg-ic-orangeSoft',
    dark: 'border-ic-greenDeep bg-ic-greenDeep text-white',
  }
  const valueColor = variant === 'dark' ? 'text-white' : 'text-ic-greenDeep'
  const labelColor = variant === 'dark' ? 'text-white/70' : 'text-ic-textMute'

  return (
    <div className={`rounded-2xl border-2 p-5 shadow-sm ${styles[variant]}`}>
      <div className={`text-xs font-semibold uppercase tracking-wider ${labelColor}`}>{label}</div>
      <div className={`mt-2 text-3xl font-extrabold leading-tight ${valueColor} md:text-4xl`}>{value}</div>
      {sub && <div className={`mt-1 text-xs ${labelColor}`}>{sub}</div>}
    </div>
  )
}

// ============================================================
// Animated Counter - counts up on first view
// ============================================================
export function Counter({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.4,
}: {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionVal = useMotionValue(0)
  const [hasStarted, setHasStarted] = useState(false)
  const display = useTransform(motionVal, (latest) =>
    `${prefix}${latest.toFixed(decimals)}${suffix}`,
  )

  useEffect(() => {
    if (!ref.current || hasStarted) return
    const el = ref.current
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          animate(motionVal, to, { duration, ease: 'easeOut' })
          obs.disconnect()
        }
      })
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, motionVal, duration, hasStarted])

  return <motion.span ref={ref}>{display}</motion.span>
}

// ============================================================
// Slider - labeled range input
// ============================================================
export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  format: (v: number) => string
  hint?: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-ic-greenDeep">{label}</label>
        <span className="font-mono text-base font-bold text-ic-orange">{format(value)}</span>
      </div>
      <div className="relative h-2">
        <div className="absolute inset-0 rounded-full bg-ic-cream2" />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-ic-orange transition-[width]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:bg-ic-greenDeep
            [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:bg-ic-greenDeep
            [&::-moz-range-thumb]:shadow-md"
        />
      </div>
      {hint && <p className="text-xs text-ic-textMute">{hint}</p>}
    </div>
  )
}

// ============================================================
// PresetButton row - quick-set scenario buttons
// ============================================================
export function Preset({
  active,
  onClick,
  children,
  color = 'green',
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  color?: 'green' | 'orange' | 'red'
}) {
  const colors = {
    green: 'border-ic-greenDeep/40 bg-ic-greenSoft text-ic-greenDeep',
    orange: 'border-ic-orange/40 bg-ic-orangeSoft text-ic-greenDeep',
    red: 'border-red-300 bg-red-50 text-red-700',
  }
  const base = 'rounded-full border px-3 py-1 text-xs font-bold transition'
  return (
    <button
      onClick={onClick}
      className={`${base} ${colors[color]} ${active ? 'ring-2 ring-ic-greenDeep ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
    >
      {children}
    </button>
  )
}

// ============================================================
// Card - base panel
// ============================================================
export function Card({
  children,
  className = '',
  emphasize,
}: {
  children: ReactNode
  className?: string
  emphasize?: boolean
}) {
  const ring = emphasize ? 'ring-2 ring-ic-orange' : ''
  return <article className={`rounded-3xl border border-ic-border bg-white p-6 shadow-sm ${ring} ${className}`}>{children}</article>
}

// ============================================================
// SoftSpring number - for live KPI values that smoothly tween
// ============================================================
export function SoftSpring({ value, format }: { value: number; format: (v: number) => string }) {
  const spring = useSpring(value, { stiffness: 120, damping: 24 })
  const display = useTransform(spring, format)
  useEffect(() => { spring.set(value) }, [value, spring])
  return <motion.span>{display}</motion.span>
}

// ============================================================
// Reveal - fade + slide on scroll into view
// ============================================================
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
