export default function Center(props: {
  children: JSX.Element[] | JSX.Element,
  primary?: boolean,
}) {
  return <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}> {props.children} </div>
}
