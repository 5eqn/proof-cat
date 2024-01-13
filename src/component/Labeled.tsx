import Slot from "../component/Slot"
import Button from "../component/Button"
import { useState } from "react"
import Text from "../component/Text"
import Spacer from "../component/Spacer"

export default function Labeled(props: {
  children: JSX.Element[] | JSX.Element,
  depth: number,
  label: string,
}) {
  const [expanded, setExpanded] = useState(false)
  const content = expanded ?
    props.children :
    <div />
  return <div>
    <Slot depth={props.depth}>
      <Text text={props.label} />
      <Spacer />
      <Button value="v" onClick={() => setExpanded(!expanded)} />
    </Slot>
    {content}
  </div>
}
