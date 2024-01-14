import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Input from "./Input"

export default function InputBar(props: {
  depth: number,
  label?: string,
  placeholder?: string,
  value: string,
  onChange: (value: string) => void
}) {
  const label = props.label ? <Text text={props.label} /> : <div />
  return <div>
    <Slot depth={props.depth}>
      {label}
      <Spacer />
      <Input
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Slot>
  </div>
}
