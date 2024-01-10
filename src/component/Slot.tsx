export default function Slot(props: {
  children: JSX.Element[] | JSX.Element,
  primary?: boolean,
}) {
  return <div style={{
    height: "32px",
    backgroundColor: props.primary ? "#e8e8e8" : "#e3e3e3",
    padding: "8px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "stretch",
  }}> {props.children} </div>
}
