export default function Row(props: {
  children: JSX.Element[] | JSX.Element,
  primary?: boolean,
  gap?: string,
}) {
  const children = Array.isArray(props.children) ? props.children : [props.children]
  const gap = <div style={{ width: props.gap ? props.gap : '8px' }} />
  const content = [children[0]]
  for (let i = 1; i < children.length; i++) {
    content.push(gap)
    content.push(children[i])
  }
  return <div style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  }}> {content} </div>
}
