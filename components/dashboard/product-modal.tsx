"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { NumberInput } from "@/components/ui/number-input"
import type { Produto } from "@/lib/types"
import { useInventory, type ProdutoInput } from "./inventory-provider"

interface ProductModalProps {
  open: boolean
  onClose: () => void
  produto?: Produto | null
}

const vazio: ProdutoInput = {
  sku: "",
  nome: "",
  categoria: "",
  quantidade: 0,
  estoqueMinimo: 0,
  preco: 0,
  localizacao: "",
}

const inputClass =
  "h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"

export function ProductModal({ open, onClose, produto }: ProductModalProps) {
  const { criarProduto, atualizarProduto } = useInventory()
  const [form, setForm] = useState<ProdutoInput>(vazio)
  const [erros, setErros] = useState<Record<string, string>>({})

  const editando = Boolean(produto)

  useEffect(() => {
    if (!open) return
    if (produto) {
      const { id, atualizadoEm, ...rest } = produto
      setForm(rest)
    } else {
      setForm(vazio)
    }
    setErros({})
  }, [open, produto])

  function set<K extends keyof ProdutoInput>(chave: K, valor: ProdutoInput[K]) {
    setForm((f) => ({ ...f, [chave]: valor }))
  }

  function validar() {
    const e: Record<string, string> = {}
    if (!form.sku.trim()) e.sku = "Informe o SKU"
    if (!form.nome.trim()) e.nome = "Informe o nome"
    if (form.quantidade < 0) e.quantidade = "Não pode ser negativo"
    if (form.estoqueMinimo < 0) e.estoqueMinimo = "Não pode ser negativo"
    if (form.preco < 0) e.preco = "Não pode ser negativo"
    setErros(e)
    return Object.keys(e).length === 0
  }

  function onSubmit(evento: FormEvent) {
    evento.preventDefault()
    if (!validar()) return
    const payload: ProdutoInput = {
      ...form,
      sku: form.sku.trim(),
      nome: form.nome.trim(),
      categoria: form.categoria.trim() || "Geral",
      localizacao: form.localizacao.trim() || "Não definida",
    }
    if (produto) atualizarProduto(produto.id, payload)
    else criarProduto(payload)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editando ? "Editar mercadoria" : "Adicionar mercadoria"}
      description={editando ? "Atualize as informações do produto." : "Cadastre um novo item no estoque."}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">SKU</span>
            <input
              className={inputClass}
              value={form.sku}
              onChange={(e) => set("sku", e.target.value)}
              aria-invalid={Boolean(erros.sku)}
              placeholder="ELE-0001"
            />
            {erros.sku ? <span className="text-xs text-destructive">{erros.sku}</span> : null}
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">Categoria</span>
            <input
              className={inputClass}
              value={form.categoria}
              onChange={(e) => set("categoria", e.target.value)}
              placeholder="Eletrônicos"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Nome do produto</span>
          <input
            className={inputClass}
            value={form.nome}
            onChange={(e) => set("nome", e.target.value)}
            aria-invalid={Boolean(erros.nome)}
            placeholder="Cabo HDMI 2.1 - 2m"
          />
          {erros.nome ? <span className="text-xs text-destructive">{erros.nome}</span> : null}
        </label>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">Quantidade</span>
            <NumberInput
              className={inputClass}
              value={form.quantidade}
              onValueChange={(v) => set("quantidade", v)}
              aria-invalid={Boolean(erros.quantidade)}
            />
            {erros.quantidade ? <span className="text-xs text-destructive">{erros.quantidade}</span> : null}
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">Estoque mínimo</span>
            <NumberInput
              className={inputClass}
              value={form.estoqueMinimo}
              onValueChange={(v) => set("estoqueMinimo", v)}
              aria-invalid={Boolean(erros.estoqueMinimo)}
            />
            {erros.estoqueMinimo ? <span className="text-xs text-destructive">{erros.estoqueMinimo}</span> : null}
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">Preço (R$)</span>
            <NumberInput
              allowDecimal
              className={inputClass}
              value={form.preco}
              onValueChange={(v) => set("preco", v)}
              aria-invalid={Boolean(erros.preco)}
            />
            {erros.preco ? <span className="text-xs text-destructive">{erros.preco}</span> : null}
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Localização</span>
          <input
            className={inputClass}
            value={form.localizacao}
            onChange={(e) => set("localizacao", e.target.value)}
            placeholder="Corredor A / Prateleira 3"
          />
        </label>

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{editando ? "Salvar alterações" : "Adicionar produto"}</Button>
        </div>
      </form>
    </Modal>
  )
}
