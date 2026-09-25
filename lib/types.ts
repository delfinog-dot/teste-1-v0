export type StatusCarregamento = "pendente" | "em_andamento" | "expedido"

export interface Produto {
  id: string
  sku: string
  nome: string
  categoria: string
  quantidade: number
  estoqueMinimo: number
  preco: number
  localizacao: string
  atualizadoEm: string
}

export interface Carregamento {
  id: string
  codigo: string
  cliente: string
  transportadora: string
  status: StatusCarregamento
  quantidadeItens: number
  /** Data e hora limite prevista para o início/expedição do carregamento (ISO 8601). */
  dataHoraPrevista: string
  atualizadoEm: string
}

export type TipoMovimentacao = "entrada" | "saida"

export const STATUS_ORDER: StatusCarregamento[] = ["pendente", "em_andamento", "expedido"]

export const STATUS_LABEL: Record<StatusCarregamento, string> = {
  pendente: "Pendente",
  em_andamento: "Em andamento",
  expedido: "Expedido",
}
