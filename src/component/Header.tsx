import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Button from "./Button"
import InputButton from "./InputButton"

export default function Header(props: {
  depth: number,
  label: string,
  onDelete: () => void
  onAdd: (name: string) => void
}) {

  return <div>
    <Slot depth={props.depth}>
      <Text text={props.label} />
      <Spacer />
      <InputButton onConfirm={props.onAdd} />
      <Button value="x" onClick={props.onDelete} />
    </Slot>
  </div>
}
