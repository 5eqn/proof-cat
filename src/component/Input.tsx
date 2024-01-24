interface InputProps {
  placeholder?: string
  'data-testid'?: string
  value: string
  onChange: (value: string) => void
}

export default function Input(props: InputProps) {
  return <input
    style={{
      width: '144px',
      fontFamily: 'monospace',
      border: 'none',
      backgroundColor: 'transparent',
    }}
    onChange={e => props.onChange(e.target.value)}
    value={props.value}
    data-testid={props["data-testid"]}
    placeholder={props.placeholder}
  />
}
