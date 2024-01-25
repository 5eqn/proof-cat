import { palette } from "../view/color"

export function Block(props: {
  children?: JSX.Element[] | JSX.Element,
  color?: string,
  inset?: boolean
}) {
  const insetFlag = props.inset ? 'inset ' : ''
  const originalColor = props.color ? props.color : palette.neutral
  const color = props.inset ? palette.background : originalColor
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
