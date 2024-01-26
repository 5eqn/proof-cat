import { palette } from "../view/color"
import Row from "./Row"

export function Block(props: {
  children?: JSX.Element[] | JSX.Element,
  color?: string,
  parent?: string,
  inset?: boolean
  shape?: string,
}) {
  const baseShadow = '0.6px 0.6px 1.8px #cccccc'
  const mainShadow = props.inset ? 'inset ' + baseShadow : baseShadow
  const mainColor = props.color ?? palette.neutral
  const parentColor = props.parent ?? palette.background
  const color = props.inset ? palette.background : mainColor
  const insetTextStyle: React.CSSProperties = {
    paddingRight: '8px',
    fontWeight: '900',
    fontSize: '32px',
    fontStyle: 'italic',
    fontFamily: 'monospace',
    color: 'transparent',
    backgroundColor: '#cccccc',
    textShadow: '0.6px 0.6px 1.8px ' + parentColor,
    backgroundClip: 'text',
    transform: 'translateY(10px)'
  }
  const normalTextStyle: React.CSSProperties = {
    paddingRight: '8px',
    fontWeight: '900',
    fontSize: '32px',
    fontStyle: 'italic',
    fontFamily: 'monospace',
    color: parentColor,
    textShadow: '0.6px 0.6px 1.8px #cccccc',
    transform: 'translateY(10px)'
  }
  const textStyle = props.inset ? normalTextStyle : insetTextStyle
  const blockStyle: React.CSSProperties = {
    minWidth: '42px',
    minHeight: '42px',
    borderRadius: '8px',
    backgroundColor: color,
    boxShadow: mainShadow,
  }
  const renderedShape = <div style={{
    overflow: 'hidden',
  }}>
    <div style={textStyle}>
      {props.shape}
    </div>
  </div>
  const shape = props.shape ? renderedShape : <div />
  return <div style={blockStyle}>
    <Row alignItems="end">
      <div style={{
        padding: '8px 0px 8px 8px',
      }}>
        {props.children}
      </div>
      {shape}
    </Row>
  </div>
}
