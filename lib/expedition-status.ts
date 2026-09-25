import type { Carregamento } from "./types"

/**
 * Um carregamento está atrasado quando ainda não foi iniciado (status "pendente")
 * e o horário limite previsto (dataHoraPrevista) já passou.
 */
export function estaAtrasado(carregamento: Carregamento, agora: Date = new Date()): boolean {
  if (carregamento.status !== "pendente") return false
  return new Date(carregamento.dataHoraPrevista).getTime() < agora.getTime()
}

export function contarAtrasados(carregamentos: Carregamento[], agora: Date = new Date()): number {
  return carregamentos.reduce((total, c) => (estaAtrasado(c, agora) ? total + 1 : total), 0)
}

/** Horas de atraso (arredondadas para baixo). Retorna 0 quando não há atraso. */
export function horasDeAtraso(carregamento: Carregamento, agora: Date = new Date()): number {
  if (!estaAtrasado(carregamento, agora)) return 0
  const diffMs = agora.getTime() - new Date(carregamento.dataHoraPrevista).getTime()
  return Math.floor(diffMs / 3_600_000)
}
