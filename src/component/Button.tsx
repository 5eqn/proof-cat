import { Button as AButton } from "antd"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  danger?: boolean
}

export default function Button(props: ButtonProps) {
  return <AButton
    style={{
      fontFamily: 'monospace'
    }}
    onClick={props.onClick}
    danger={props.danger}
  >
    {props.children}
  </AButton>
}
