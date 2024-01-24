export function Block(props: {
  children?: JSX.Element[] | JSX.Element,
  inset?: boolean
}) {
  const insetFlag = props.inset ? 'inset ' : ''
  const color = props.inset ? '#ffffff' : '#f0f4ff'
  return <div style={{
    padding: '8px',
    minWidth: '24px',
    minHeight: '24px',
    borderRadius: '8px',
    backgroundColor: color,
    boxShadow: insetFlag + '1px 1px 3px #00000022',
  }}>
    {props.children}
  </div>
}
