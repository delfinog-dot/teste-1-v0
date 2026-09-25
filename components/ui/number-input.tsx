"use client"

import { forwardRef, useEffect, useRef, useState, type InputHTMLAttributes } from "react"

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
  value: number
  onValueChange: (value: number) => void
  /** Permite casas decimais (ex.: preços). Padrão: apenas inteiros. */
  allowDecimal?: boolean
}

/**
 * Limpa o texto digitado removendo caracteres inválidos e zeros à esquerda
 * indesejados (ex.: "0100" -> "100", "007" -> "7"), preservando "0" e "0.5".
 */
function sanitize(raw: string, allowDecimal: boolean): string {
  let s = raw.replace(allowDecimal ? /[^0-9.]/g : /[^0-9]/g, "")

  if (allowDecimal) {
    const [inteiro, ...resto] = s.split(".")
    s = resto.length ? `${inteiro}.${resto.join("")}` : inteiro
  }

  // Remove zeros à esquerda apenas quando houver outro dígito na sequência.
  s = s.replace(/^0+(?=\d)/, "")

  return s
}

/**
 * Input numérico controlado que guarda o texto localmente. Isso evita o bug do
 * campo `type="number"` ligado a um número, que impede apagar o "0" e produz
 * valores como "0100". Emite sempre um número válido via onValueChange.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  { value, onValueChange, allowDecimal = false, ...rest },
  ref,
) {
  const [text, setText] = useState(() => String(value))
  const focado = useRef(false)

  // Sincroniza o texto quando o valor muda por fora (reset de formulário, etc.),
  // sem atrapalhar o que o usuário está digitando no momento.
  useEffect(() => {
    if (focado.current) return
    const atual = text === "" ? Number.NaN : Number(text)
    if (atual !== value) setText(Number.isFinite(value) ? String(value) : "")
  }, [value, text])

  return (
    <input
      ref={ref}
      type="text"
      inputMode={allowDecimal ? "decimal" : "numeric"}
      value={text}
      onFocus={(e) => {
        focado.current = true
        rest.onFocus?.(e)
      }}
      onBlur={(e) => {
        focado.current = false
        // Normaliza um campo vazio de volta para o número atual ao sair.
        if (text === "" || text === ".") setText(String(value))
        rest.onBlur?.(e)
      }}
      onChange={(e) => {
        const limpo = sanitize(e.target.value, allowDecimal)
        setText(limpo)
        onValueChange(limpo === "" || limpo === "." ? 0 : Number(limpo))
      }}
      {...rest}
    />
  )
})
