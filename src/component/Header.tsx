import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Button from "./Button"
import InputButton from "./InputButton"
import { i18n } from "../i18n"

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
    title={i18n.prompt.addAnEntry}
    placeholder={i18n.prompt.name}
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
        title={i18n.prompt.addLet}
        placeholder={i18n.prompt.name}
        onConfirm={props.onWrapLet}
        validate={props.validate}
      > {'x=val,*'} </InputButton>
      <Button
        onClick={props.onWrapFunc}
      > {'x=>*'} </Button>
      <Button
        onClick={props.onWrapPi}
      > {'x->*'} </Button>
      <Button
        onClick={props.onWrapApp}
      > {'*(arg)'} </Button>
    </Slot>
  </div>
}
