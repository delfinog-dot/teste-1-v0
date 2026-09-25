import { STATUS_LABEL, type StatusCarregamento } from "@/lib/types"

const STATUS_STYLES: Record<StatusCarregamento, string> = {
  pendente: "bg-amber-100 text-amber-800 ring-amber-600/20",
  em_andamento: "bg-blue-100 text-blue-800 ring-blue-600/20",
  expedido: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
}

export function StatusBadge({ status }: { status: StatusCarregamento }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  )
}
