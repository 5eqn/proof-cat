import Slot from "../component/Slot"
import Text from "../component/Text"
import { CommonProps, Term } from "../model"

export default function AnyView(props: CommonProps<Term>) {
  return <Slot level={props.level}>
    <Text text="Selector" />
  </Slot>
}
