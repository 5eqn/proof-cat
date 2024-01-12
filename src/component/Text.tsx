export default function Text(props: {
  text: string,
}) {
  return <div style={{
    fontSize: "18px",
    fontFamily: 'monospace',
    fontWeight: "normal",
    color: "#444",
    marginRight: "16px",
  }}> {props.text} </div>
}
