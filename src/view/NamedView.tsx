import Input from "../component/Input"
import Slot from "../component/Slot"
import Button from "../component/Button"
import { CommonProps, Term } from "../model"
import { useState } from "react"
import TermView from "./TermView"
import Spacer from "../component/Spacer"

export type NamedProps = {
  name: string,
  onNameChange: (name: string) => void
}

export default function NamedView(props: CommonProps<Term> & NamedProps) {
  const [expanded, setExpanded] = useState(false)
  const content = expanded ?
    <TermView
      level={props.level + 1}
      value={props.value}
      onChange={props.onChange}
    /> :
    <div />
  return <div>
    <Slot level={props.level} tagged>
      <Input value={props.name} onChange={props.onNameChange} />
      <Spacer />
      <Button text="v" onClick={() => setExpanded(!expanded)} />
    </Slot>
    {content}
  </div>
}
