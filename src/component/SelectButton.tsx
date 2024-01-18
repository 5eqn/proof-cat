import { Popconfirm } from "antd"
import { HTMLAttributes, useState } from "react"
import Button from "./Button"
import Select from "./Select"

interface SelectButtonProps extends Pick<HTMLAttributes<HTMLElement>, 'children'> {
  // Title
  title?: string
  // Data
  data: string[]
  // Called when confirm input value
  onConfirm: (id: string, ix: number) => boolean
  // Testing
  'data-testid'?: string
}

export default function SelectButton(props: SelectButtonProps) {
  const [ix, setIX] = useState(0)
  const [open, setOpen] = useState(false)
  const form: JSX.Element = <Select
    data={props.data}
    index={ix}
    onChange={setIX}
  />
  return <div>
    <Popconfirm
      title={props.title}
      description={form}
      open={open}
      onCancel={() => setOpen(false)}
      onConfirm={() => {
        if (props.onConfirm(props.data[ix], ix)) setOpen(false)
      }}>
      <Button
        onClick={() => setOpen(!open)}
        data-testid={props["data-testid"]}
      >
        {props.children}
      </Button>
    </Popconfirm>
  </div>
}
