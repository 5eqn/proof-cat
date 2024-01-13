import Slot from "../component/Slot"
import Button from "../component/Button"
import { useState } from "react"
import Text from "../component/Text"
import Spacer from "../component/Spacer"

export default function Named(props: {
  children: JSX.Element[] | JSX.Element,
  depth: number,
  name: string,
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const content = expanded ?
    props.children :
    <div />
  return <div>
    <Slot depth={props.depth}>
      <Text text={props.name} />
      <Spacer />
      <Button value="-" onClick={props.onDelete} />
      <Button value="v" onClick={() => setExpanded(!expanded)} />
    </Slot>
    {content}
  </div>
}
