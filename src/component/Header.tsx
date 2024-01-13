import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Button from "./Button"
import InputButton from "./InputButton"

export default function Header(props: {
  depth: number,
  label: string,
  validate: (name: string) => string | null
  onDelete: () => void
  onAdd?: (name: string) => void
  onWrapLet: (name: string) => void
  onWrapFunc: () => void
  onWrapPi: () => void
  onWrapApp: () => void
}) {
  const addButton = props.onAdd ? <InputButton
    onConfirm={props.onAdd}
    validate={props.validate}
  > + </InputButton> : <div />
  return <div>
    <Slot depth={props.depth}>
      <Text text={props.label} />
      <Spacer />
      {addButton}
      <Button
        danger
        onClick={props.onDelete}
      > x </Button>
      <InputButton
        onConfirm={props.onWrapLet}
        validate={props.validate}
      > L </InputButton>
      <Button
        onClick={props.onWrapFunc}
      > F </Button>
      <Button
        onClick={props.onWrapPi}
      > P </Button>
      <Button
        onClick={props.onWrapApp}
      > A </Button>
    </Slot>
  </div>
}
