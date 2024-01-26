export default function Row(props: {
  children: JSX.Element[] | JSX.Element,
  primary?: boolean,
  gap?: string,
  alignItems?: string,
}) {
  const children = Array.isArray(props.children) ? props.children : [props.children]
  const gapStyle = { width: props.gap ? props.gap : '8px' }
  const content = []
  for (let i = 0; i < children.length; i++) {
    if (i > 0) content.push(<div style={gapStyle} key={i * 2} />)
    content.push(<div children={children[i]} key={i * 2 + 1} />)
  }
  return <div style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: props.alignItems ?? "center",
  }}> {content} </div>
}
