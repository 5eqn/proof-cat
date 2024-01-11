import Input from "../component/Input"
import Slot from "../component/Slot"
import Text from "../component/Text"
import { TNum, CommonProps } from "../model"

export default function NumberView(props: CommonProps<TNum>) {
  return <Slot>
    <Text text="Number: " />
    <Input
      value={props.value.num.toString()}
      onChange={(str) => props.onChange(draft => {
        draft.num = +str
      })} />
  </Slot>
}
