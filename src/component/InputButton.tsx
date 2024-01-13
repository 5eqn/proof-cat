import { Popconfirm } from "antd"
import { useState } from "react"
import { i18n } from "../i18n"
import Button from "./Button"
import Input from "./Input"

interface InputButtonProps {
  onConfirm: (name: string) => void
}

export default function InputButton(props: InputButtonProps) {
  const [name, setName] = useState('')
  const form = <Input
    placeholder={i18n.prompt.entryName}
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  return <Popconfirm
    title={i18n.prompt.addAnEntry}
    description={form}
    onConfirm={() => {
      if (name === '') alert(i18n.err.empty)
      else props.onConfirm(name)
    }}>
    <Button> + </Button>
  </Popconfirm>
}
