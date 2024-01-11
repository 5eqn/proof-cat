import Input from "../component/Input"
import Slot from "../component/Slot"
import Text from "../component/Text"
import { CommonProps, TType } from "../model"

export default function TypeView(props: CommonProps<TType>) {
  return <Slot>
    <Text text="Type: " />
    <Input
      value={props.value.type}
      onChange={(str) => props.onChange(draft => {
        draft.type = str
      })} />
  </Slot>
}
