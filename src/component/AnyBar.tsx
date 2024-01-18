import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Button from "./Button"
import InputButton from "./InputButton"
import { i18n } from "../i18n"
import SelectButton from "./SelectButton"

export default function AnyBar(props: {
  depth: number,
  label?: string,
  ns: string[],
  onWrapLet: (name: string) => boolean
  onWrapFunc: (name: string) => boolean
  onWrapPi: (name: string) => boolean
  onBecomeVar: (id: string, ix: number) => boolean
  onBecomeType: (name: string) => boolean
  onBecomeU: () => boolean
  onBecomeNum: (num: string) => boolean
}) {
  const label = props.label ? <Text text={props.label} /> : <div />
  return <div>
    <Slot depth={props.depth} colored>
      {label}
      <Spacer />
      <SelectButton
        data={props.ns}
        title={i18n.prompt.becomeVar}
        onConfirm={props.onBecomeVar}
      > {i18n.prompt.becomeVar} </SelectButton>
      <InputButton
        title={i18n.prompt.addLet}
        placeholder={i18n.prompt.name}
        onConfirm={props.onWrapLet}
      > {i18n.prompt.wrapLet} </InputButton>
      <InputButton
        title={i18n.prompt.addAnEntry}
        placeholder={i18n.prompt.name}
        onConfirm={props.onWrapFunc}
      > {i18n.prompt.wrapFunc} </InputButton>
      <InputButton
        title={i18n.prompt.addType}
        placeholder={i18n.prompt.name}
        onConfirm={props.onBecomeType}
      > {i18n.prompt.becomeType} </InputButton>
      <InputButton
        title={i18n.prompt.addAnEntry}
        placeholder={i18n.prompt.name}
        onConfirm={props.onWrapPi}
      > {i18n.prompt.wrapPi} </InputButton>
      <Button
        onClick={props.onBecomeU}
      > {i18n.prompt.becomeU} </Button>
      <InputButton
        title={i18n.prompt.addNum}
        placeholder={i18n.prompt.value}
        onConfirm={props.onBecomeNum}
      > {i18n.prompt.becomeNum} </InputButton>
    </Slot>
  </div>
}
