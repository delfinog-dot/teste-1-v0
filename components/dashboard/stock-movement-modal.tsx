"use client"

import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { useEffect, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { NumberInput } from "@/components/ui/number-input"
import type { Produto, TipoMovimentacao } from "@/lib/types"
import { useInventory } from "./inventory-provider"

interface StockMovementModalProps {
  open: boolean
  onClose: () => void
  produto: Produto | null
}

export function StockMovementModal({ open, onClose, produto }: StockMovementModalProps) {
  const { registrarMovimentacao } = useInventory()
  const [tipo, setTipo] = useState<TipoMovimentacao>("entrada")
  const [quantidade, setQuantidade] = useState<number>(1)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setTipo("entrada")
      setQuantidade(1)
      setErro(null)
    }
  }, [open])

  if (!produto) return null

  const saldoFinal = tipo === "entrada" ? produto.quantidade + quantidade : produto.quantidade - quantidade

  function onSubmit(evento: FormEvent) {
    evento.preventDefault()
    if (!produto) return
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      setErro("Informe uma quantidade inteira maior que zero.")
      return
    }
    if (tipo === "saida" && quantidade > produto.quantidade) {
      setErro("Saída maior que o estoque disponível.")
      return
    }
    registrarMovimentacao(produto.id, tipo, quantidade)
    onClose()
  }

  const opcoes: { valor: TipoMovimentacao; rotulo: string; Icon: typeof ArrowDownToLine; ativo: string }[] = [
    { valor: "entrada", rotulo: "Entrada", Icon: ArrowDownToLine, ativo: "border-emerald-500 bg-emerald-50 text-emerald-700" },
    { valor: "saida", rotulo: "Saída", Icon: ArrowUpFromLine, ativo: "border-red-500 bg-red-50 text-red-700" },
  ]

  return (
    <Modal open={open} onClose={onClose} title="Movimentar estoque" description={`${produto.sku} · ${produto.nome}`}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {opcoes.map((o) => (
            <button
              key={o.valor}
              type="button"
              onClick={() => setTipo(o.valor)}
              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                tipo === o.valor ? o.ativo : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
              aria-pressed={tipo === o.valor}
            >
              <o.Icon className="size-4" />
              {o.rotulo}
            </button>
          ))}
        </div>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Quantidade</span>
          <NumberInput
            autoFocus
            className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            value={quantidade}
            onValueChange={setQuantidade}
          />
        </label>

        <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3 text-sm">
          <span className="text-muted-foreground">Saldo atual: {produto.quantidade}</span>
          <span className="font-semibold">
            Saldo final: <span className="tabular-nums">{Math.max(0, saldoFinal)}</span>
          </span>
        </div>

        {erro ? <p className="text-sm text-destructive">{erro}</p> : null}

        <div className="mt-1 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Registrar {tipo === "entrada" ? "entrada" : "saída"}</Button>
        </div>
      </form>
    </Modal>
  )
}
