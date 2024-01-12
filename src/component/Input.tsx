export default function Input(props: {
  value: string,
  onChange: (value: string) => void
}) {
  return <input onChange={(e) => props.onChange(e.target.value)} style={{
    fontSize: "16px",
    fontWeight: "normal",
    fontFamily: 'monospace',
    background: 'none',
    color: "#444",
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1.5px solid #888',
  }} value={props.value} data-testid={`input-${props.value}`} />
}
