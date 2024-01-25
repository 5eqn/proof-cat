export default function Text(props: {
  text: string,
}) {
  return <div style={{
    fontSize: "18px",
    fontFamily: 'monospace',
    fontWeight: "normal",
    color: "#444",
    margin: "0px 4px",
  }}> {props.text} </div>
}
