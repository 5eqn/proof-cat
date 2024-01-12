import Input from "../component/Input"
import Slot from "../component/Slot"
import Text from "../component/Text"
import { CommonProps, TVar } from "../model"

export default function VarView(props: CommonProps<TVar>) {
  return <Slot level={props.level}>
    <Text text="Reference: " />
    <Input
      value={props.value.id}
      onChange={(str) => props.onChange(draft => {
        draft.id = str
      })} />
  </Slot>
}
