export default function Button(props: {
  text: string,
  onClick: () => void
}) {
  return <div style={{
    fontSize: "20px",
    fontWeight: "normal",
    color: "#444",
    marginRight: "16px",
    cursor: 'pointer',
  }} onClick={props.onClick}> {props.text} </div>
}
