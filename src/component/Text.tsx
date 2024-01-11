export default function Text(props: {
  text: string,
}) {
  return <div style={{
    fontSize: "24px",
    fontWeight: "normal",
    color: "#444",
    marginRight: "16px",
  }}> {props.text} </div>
}
