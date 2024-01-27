interface ButtonProps {
  onClick: () => void
  children?: string | JSX.Element | JSX.Element[]
  'data-testid'?: string
}

export default function Button(props: ButtonProps) {
  return <button
    style={{
      fontFamily: 'monospace'
    }}
    onClick={props.onClick}
    data-testid={props["data-testid"]}
  >
    {props.children}
  </button>
}
