export function Block(props: {
  children?: JSX.Element[] | JSX.Element,
}) {
  return <div style={{
    padding: '8px',
    border: 'solid',
    borderRadius: '4px',
  }}>
    {props.children}
  </div>
}
