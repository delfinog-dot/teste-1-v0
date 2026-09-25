import { AlertTriangle } from "lucide-react"

export function DelayBadge({ horas }: { horas?: number }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/30"
      role="status"
    >
      <AlertTriangle className="size-3.5" aria-hidden />
      Atrasado{typeof horas === "number" && horas > 0 ? ` · ${horas}h` : ""}
    </span>
  )
}
