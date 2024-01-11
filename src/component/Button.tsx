export default function Button(props: {
  text: string,
  onClick: () => void
}) {
  return <div style={{
    fontSize: "24px",
    fontWeight: "normal",
    color: "#444",
    marginRight: "16px",
  }} onClick={props.onClick}> {props.text} </div>
}
