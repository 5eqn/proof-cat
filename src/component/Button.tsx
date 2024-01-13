import { Button as AButton } from "antd"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> { }

export default function Button(props: ButtonProps) {
  return <AButton onClick={props.onClick}>
    {props.children}
  </AButton>
}
