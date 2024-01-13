import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Select from "./Select"

export default function SelectBar(props: {
  depth: number,
  label: string,
  data: string[],
  index: number,
  onChange: (index: number) => void
}) {
  return <div>
    <Slot depth={props.depth}>
      <Text text={props.label} />
      <Spacer />
      <Select
        data={props.data}
        index={props.index}
        onChange={props.onChange}
      />
    </Slot>
  </div>
}
