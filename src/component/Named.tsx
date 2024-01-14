import Slot from "../component/Slot"
import Button from "../component/Button"
import { useState } from "react"
import Text from "../component/Text"
import Spacer from "../component/Spacer"

export default function Named(props: {
  children: JSX.Element[] | JSX.Element,
  depth: number,
  name: string,
  onDelete?: () => void
}) {
  const [expanded, setExpanded] = useState(true)
  const content = expanded ?
    props.children :
    <div />
  const deleteButton = props.onDelete !== null ?
    <Button onClick={props.onDelete}> - </Button> :
    <div />
  return <div>
    <Slot depth={props.depth} tagged>
      <Text text={props.name} />
      <Spacer />
      {deleteButton}
      <Button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'v' : '^'}
      </Button>
    </Slot>
    {content}
  </div>
}
