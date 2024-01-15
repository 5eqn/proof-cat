import { message, Popconfirm } from "antd"
import { HTMLAttributes, useState } from "react"
import Button from "./Button"
import Input from "./Input"

interface InputButtonProps extends Pick<HTMLAttributes<HTMLElement>, 'children'> {
  // Placeholder
  placeholder?: string
  // Title
  title?: string
  // Called when confirm input value
  onConfirm: (name: string) => void
  // Validator for input value
  validate?: (name: string) => string | null
}

export default function InputButton(props: InputButtonProps) {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const form: JSX.Element = <Input
    placeholder={props.placeholder}
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  return <div>
    <Popconfirm
      title={props.title}
      description={form}
      open={open}
      onCancel={() => setOpen(false)}
      onConfirm={() => {
        const msg: string | null = props.validate ? props.validate(name) : null
        if (msg !== null) message.error(msg)
        else {
          props.onConfirm(name)
          setOpen(false)
        }
      }}>
      <Button onClick={() => setOpen(!open)}>
        {props.children}
      </Button>
    </Popconfirm>
  </div>
}
