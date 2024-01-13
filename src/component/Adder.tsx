import Slot from "../component/Slot"
import Button from "../component/Button"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Input from "./Input"
import { useState } from "react"
import { i18n } from "../i18n"

export default function Adder(props: {
  depth: number,
  label: string,
  onDelete: () => void
  onAdd: (name: string) => void
}) {
  const [name, setName] = useState('')
  return <div>
    <Slot depth={props.depth}>
      <Text text={props.label} />
      <Spacer />
      <Input value={name} onChange={setName} />
      <Button text="+" onClick={() => {
        if (name === '') alert(i18n.err.empty)
        else props.onAdd(name)
      }} />
      <Button text="x" onClick={() => {
        props.onDelete
      }} />
    </Slot>
  </div>
}
