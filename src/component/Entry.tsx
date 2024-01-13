import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Input from "./Input"
import { i18n } from "../i18n"

export default function Entry(props: {
  depth: number,
  name: string,
  value: string,
  onChange: (value: string) => void
}) {
  return <div>
    <Slot depth={props.depth}>
      <Text text={props.name} />
      <Spacer />
      <Input
        placeholder={i18n.prompt.typeName}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Slot>
  </div>
}
