import type { StatItemProps } from "@/lib/types"

export function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-xl sm:text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs sm:text-sm text-slate-600">{label}</div>
    </div>
  )
} 