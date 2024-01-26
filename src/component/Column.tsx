export default function Column(props: {
  children: JSX.Element[] | JSX.Element,
  primary?: boolean,
  gap?: string,
}) {
  const children = Array.isArray(props.children) ? props.children : [props.children]
  const gapStyle = { height: props.gap ? props.gap : '8px' }
  const content = []
  for (let i = 0; i < children.length; i++) {
    if (i > 0) content.push(<div style={gapStyle} key={i * 2} />)
    content.push(<div children={children[i]} key={i * 2 + 1} />)
  }
  return <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
  }}> {content} </div>
}
