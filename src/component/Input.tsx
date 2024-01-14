import { Input as AInput } from "antd"
import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
}

export default function Input(props: InputProps) {
  return <AInput
    style={{
      width: '144px',
      fontFamily: 'monospace',
    }}
    onChange={props.onChange}
    value={props.value}
    data-testid={`input-${props.value}`}
    placeholder={props.placeholder}
  />
}
