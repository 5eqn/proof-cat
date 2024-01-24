export default function Row(props: {
  children: JSX.Element[] | JSX.Element,
  primary?: boolean,
  gap?: string,
}) {
  const children = Array.isArray(props.children) ? props.children : [props.children]
  const gap = <div style={{ width: props.gap ? props.gap : '8px' }} />
  return <div style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  }}> {children.map((e, i) => <div key={i}>
    {i === 0 ? <div /> : gap}
    {e}
  </div>)} </div>
}
