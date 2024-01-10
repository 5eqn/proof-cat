export default function Input(props: {
  value: string,
  onChange: (value: string) => void
}) {
  return <input onChange={(e) => props.onChange(e.target.value)} style={{
    fontSize: "20px",
    fontWeight: "normal",
    color: "#444",
    border: "none",
  }} value={props.value} />
}
