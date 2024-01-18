import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Button from "./Button"
import InputButton from "./InputButton"
import { i18n } from "../i18n"

export default function Header(props: {
  depth: number,
  label: string,
  onDelete: () => boolean
  onAdd?: (name: string) => boolean
  onWrapLet: (name: string) => boolean
  onWrapFunc: (name: string) => boolean
  onWrapPi: (name: string) => boolean
  onWrapApp: () => boolean
}) {
  const addButton = props.onAdd ? <InputButton
    title={i18n.prompt.addAnEntry}
    placeholder={i18n.prompt.name}
    onConfirm={props.onAdd}
    data-testid={`add-${props.label}-${props.depth}`}
  > + </InputButton> : <div />
  return <div>
    <Slot depth={props.depth}>
      <Text text={props.label} />
      <Spacer />
      {addButton}
      <Button
        danger
        onClick={props.onDelete}
        data-testid={`delete-${props.label}-${props.depth}`}
      > x </Button>
      <InputButton
        title={i18n.prompt.addLet}
        placeholder={i18n.prompt.name}
        onConfirm={props.onWrapLet}
        data-testid={`wrapLet-${props.label}-${props.depth}`}
      > {i18n.prompt.wrapLet} </InputButton>
      <InputButton
        title={i18n.prompt.addAnEntry}
        placeholder={i18n.prompt.name}
        onConfirm={props.onWrapFunc}
        data-testid={`wrapFunc-${props.label}-${props.depth}`}
      > {i18n.prompt.wrapFunc} </InputButton>
      <InputButton
        title={i18n.prompt.addAnEntry}
        placeholder={i18n.prompt.name}
        onConfirm={props.onWrapFunc}
        data-testid={`wrapPi-${props.label}-${props.depth}`}
      > {i18n.prompt.wrapPi} </InputButton>
      <Button
        onClick={props.onWrapApp}
        data-testid={`wrapApp-${props.label}-${props.depth}`}
      > {i18n.prompt.wrapApp} </Button>
    </Slot>
  </div>
}
