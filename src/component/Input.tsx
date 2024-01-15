import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  'data-testid'?: string
}

export default function Input(props: InputProps) {
  return <input
    style={{
      width: '144px',
      fontFamily: 'monospace',
    }}
    onChange={props.onChange}
    value={props.value}
    data-testid={props["data-testid"]}
    placeholder={props.placeholder}
  />
}
