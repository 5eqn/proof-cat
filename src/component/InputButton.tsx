import { message, Popconfirm } from "antd"
import { useState } from "react"
import { i18n } from "../i18n"
import Button from "./Button"
import Input from "./Input"

interface InputButtonProps {
  // Called when confirm input value, return error message if failed
  onConfirm: (name: string) => string | null
}

export default function InputButton(props: InputButtonProps) {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const form = <Input
    placeholder={i18n.prompt.entryName}
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  return <div>
    <Popconfirm
      title={i18n.prompt.addAnEntry}
      description={form}
      open={open}
      onCancel={() => setOpen(false)}
      onConfirm={() => {
        if (name === '') message.error(i18n.err.empty)
        else {
          const msg = props.onConfirm(name)
          if (msg !== null) message.error(msg)
          else setOpen(false)
        }
      }}>
      <Button onClick={() => setOpen(!open)}> + </Button>
    </Popconfirm>
  </div>
}
