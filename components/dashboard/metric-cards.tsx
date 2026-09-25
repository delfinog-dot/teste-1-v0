"use client"

import { Clock, PackageCheck, TriangleAlert, Truck } from "lucide-react"
import type { ComponentType } from "react"
import { useInventory } from "./inventory-provider"

interface Metric {
  label: string
  value: number
  hint: string
  Icon: ComponentType<{ className?: string }>
  accent: string
  iconWrap: string
}

export function MetricCards() {
  const { carregamentos, produtos } = useInventory()

  const pendentes = carregamentos.filter((c) => c.status === "pendente").length
  const emAndamento = carregamentos.filter((c) => c.status === "em_andamento").length
  const expedidos = carregamentos.filter((c) => c.status === "expedido").length
  const estoqueBaixo = produtos.filter((p) => p.quantidade <= p.estoqueMinimo).length

  const metrics: Metric[] = [
    {
      label: "Carregamentos pendentes",
      value: pendentes,
      hint: "Aguardando separação",
      Icon: Clock,
      accent: "text-amber-600",
      iconWrap: "bg-amber-100 text-amber-700",
    },
    {
      label: "Em andamento",
      value: emAndamento,
      hint: "Sendo carregados",
      Icon: Truck,
      accent: "text-blue-600",
      iconWrap: "bg-blue-100 text-blue-700",
    },
    {
      label: "Expedidos",
      value: expedidos,
      hint: "Saíram do CD",
      Icon: PackageCheck,
      accent: "text-emerald-600",
      iconWrap: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Estoque baixo",
      value: estoqueBaixo,
      hint: "Itens no limite mínimo",
      Icon: TriangleAlert,
      accent: "text-red-600",
      iconWrap: "bg-red-100 text-red-700",
    },
  ]

  return (
    <section aria-label="Métricas gerais" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">{m.label}</span>
            <span className={`text-3xl font-semibold tabular-nums ${m.accent}`}>{m.value}</span>
            <span className="text-xs text-muted-foreground">{m.hint}</span>
          </div>
          <div className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${m.iconWrap}`}>
            <m.Icon className="size-5" />
          </div>
        </div>
      ))}
    </section>
  )
}
