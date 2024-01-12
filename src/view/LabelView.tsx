import Slot from "../component/Slot"
import Button from "../component/Button"
import { CommonProps, Term } from "../model"
import { useState } from "react"
import TermView from "./TermView"
import Text from "../component/Text"
import Spacer from "../component/Spacer"

export type LabelProps = {
  label: string,
}

export default function LabelView(props: CommonProps<Term> & LabelProps) {
  const [expanded, setExpanded] = useState(false)
  const content = expanded ?
    <TermView
      level={props.level + 1}
      value={props.value}
      onChange={props.onChange}
    /> :
    <div />
  return <div>
    <Slot level={props.level}>
      <Text text={props.label} />
      <Spacer />
      <Button text="v" onClick={() => setExpanded(!expanded)} />
    </Slot>
    {content}
  </div>
}
