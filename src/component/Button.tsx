import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  danger?: boolean
  'data-testid'?: string
}

export default function Button(props: ButtonProps) {
  return <button
    style={{
      fontFamily: 'monospace'
    }}
    onClick={props.onClick}
    data-testid={props["data-testid"]}
  >
    {props.children}
  </button>
}
