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
  onDelete: () => void
}

export default function NamedView(props: CommonProps<Term> & NamedProps) {
  const [expanded, setExpanded] = useState(false)
  const content = expanded ?
    <TermView value={props.value} onChange={props.onChange} /> :
    <div />
  return <div>
    <Slot>
      <Input value={props.name} onChange={props.onNameChange} />
      <Spacer />
      <Button text="-" onClick={props.onDelete} />
      <Button text="v" onClick={() => setExpanded(!expanded)} />
    </Slot>
    {content}
  </div>
}
