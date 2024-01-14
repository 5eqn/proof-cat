import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Select from "./Select"

export default function SelectBar(props: {
  depth: number,
  label?: string,
  data: string[],
  index: number,
  onChange: (index: number) => void
}) {
  const label = props.label ? <Text text={props.label} /> : <div />
  return <div>
    <Slot depth={props.depth}>
      {label}
      <Spacer />
      <Select
        data={props.data}
        index={props.index}
        onChange={props.onChange}
      />
    </Slot>
  </div>
}
