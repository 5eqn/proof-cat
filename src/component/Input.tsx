import { AutowidthInput } from "react-autowidth-input"

interface InputProps {
  placeholder?: string
  'data-testid'?: string
  value: string
  onChange: (value: string) => void
}

export default function Input(props: InputProps) {
  return <AutowidthInput
    style={{
      fontSize: '18px',
      fontFamily: 'monospace',
      fontWeight: "normal",
      color: "#444",
      border: 'none',
      backgroundColor: 'transparent',
      margin: "0px 2px",
    }}
    onChange={e => props.onChange(e.target.value)}
    value={props.value}
    extraWidth='0'
    data-testid={props["data-testid"]}
    placeholder={props.placeholder}
  />
}
