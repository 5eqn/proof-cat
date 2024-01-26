interface InputProps {
  placeholder?: string
  'data-testid'?: string
  value: string
  onChange: (value: string) => void
}

export default function Input(props: InputProps) {
  return <input
    style={{
      fontSize: '18px',
      width: '16px',
      fontFamily: 'monospace',
      fontWeight: "normal",
      color: "#444",
      border: 'none',
      backgroundColor: 'transparent',
      margin: "0px 2px",
    }}
    onChange={e => props.onChange(e.target.value)}
    value={props.value}
    data-testid={props["data-testid"]}
    placeholder={props.placeholder}
  />
}
