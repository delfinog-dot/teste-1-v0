"use client"

import { useState } from "react"
import { Truck } from "lucide-react"

// Exemplo da estrutura de dados de uma expedição
interface Expedition {
  id: string
  code: string
  client: string
  carrier: string
  items: number
  eta: string
  status: "Pendente" | "Em andamento" | "Expedido"
  isDelayed?: boolean
}

export function ExpeditionTable() {
  // 1. Estado para controlar se o Modal está aberto
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 2. Estado com a lista de expedições
  const [expeditions, setExpeditions] = useState<Expedition[]>([
    {
      id: "1",
      code: "EXP-2026-0148",
      client: "Tech Distribuidora LTDA",
      carrier: "Rodo Expresso",
      items: 24,
      eta: "23/09, 03:00",
      status: "Pendente",
      isDelayed: true,
    },
    {
      id: "2",
      code: "EXP-2026-0149",
      client: "Mercado Central",
      carrier: "Log Brasil",
      items: 112,
      eta: "24/09, 09:00",
      status: "Em andamento",
    },
  ])

  // 3. Estado do formulário
  const [formData, setFormData] = useState({
    client: "",
    carrier: "",
    items: "",
    eta: "",
  })

  // Função para cadastrar a nova expedição
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.client || !formData.carrier || !formData.items) return

    const newExpedition: Expedition = {
      id: String(Date.now()),
      code: `EXP-2026-0${Math.floor(100 + Math.random() * 900)}`, // Gera um código dinâmico
      client: formData.client,
      carrier: formData.carrier,
      items: Number(formData.items),
      eta: formData.eta || "A definir",
      status: "Pendente",
    }

    // Adiciona o novo item no início da lista
    setExpeditions([newExpedition, ...expeditions])

    // Limpa o formulário e fecha o modal
    setFormData({ client: "", carrier: "", items: "", eta: "" })
    setIsModalOpen(false)
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      {/* Cabeçalho do Card */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Controle de expedição</h2>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {expeditions.length} carregamentos
          </span>
          
          {/* Botão para ABRIR o Modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 transition-colors"
          >
            Nova Expedição
          </button>
        </div>
      </div>

      {/* MODAL / DIALOG DE CADASTRO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Cadastrar Nova Expedição</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mercado Central"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full mt-1 p-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Transportadora</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Log Brasil"
                  value={formData.carrier}
                  onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
                  className="w-full mt-1 p-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Qtd. Itens</label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 50"
                    value={formData.items}
                    onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                    className="w-full mt-1 p-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Previsão (ETA)</label>
                  <input
                    type="text"
                    placeholder="Ex: 28/09, 14:00"
                    value={formData.eta}
                    onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
                    className="w-full mt-1 p-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Botões do Modal */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm rounded-md border hover:bg-accent transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Salvar Expedição
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABELA DE EXPEDIÇÕES */}
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 text-left">
              <th className="h-12 px-4 font-medium text-muted-foreground">CÓDIGO</th>
              <th className="h-12 px-4 font-medium text-muted-foreground">CLIENTE</th>
              <th className="h-12 px-4 font-medium text-muted-foreground">TRANSPORTADORA</th>
              <th className="h-12 px-4 font-medium text-muted-foreground">ITENS</th>
              <th className="h-12 px-4 font-medium text-muted-foreground">PREVISÃO</th>
              <th className="h-12 px-4 font-medium text-muted-foreground">STATUS</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {expeditions.map((item) => (
              <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 font-medium">{item.code}</td>
                <td className="p-4">{item.client}</td>
                <td className="p-4 text-muted-foreground">{item.carrier}</td>
                <td className="p-4">{item.items}</td>
                <td className="p-4">{item.eta}</td>
                <td className="p-4">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}