import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Button from "./Button"
import InputButton from "./InputButton"
import { i18n } from "../i18n"

export default function AnyBar(props: {
  depth: number,
  label?: string,
  validate: (name: string) => string | null
  onWrapLet: (name: string) => void
  onWrapFunc: () => void
  onWrapPi: () => void
  onBecomeVar: () => void
  onBecomeType: (name: string) => void
  onBecomeU: () => void
  onBecomeNum: (num: number) => void
}) {
  const label = props.label ? <Text text={props.label} /> : <div />
  return <div>
    <Slot depth={props.depth} colored>
      {label}
      <Spacer />
      <Button
        onClick={props.onBecomeVar}
      > {i18n.prompt.becomeVar} </Button>
      <InputButton
        title={i18n.prompt.addLet}
        placeholder={i18n.prompt.name}
        onConfirm={props.onWrapLet}
        validate={props.validate}
      > {i18n.prompt.wrapLet} </InputButton>
      <InputButton
        title={i18n.prompt.addType}
        placeholder={i18n.prompt.name}
        onConfirm={props.onBecomeType}
        validate={props.validate}
      > {i18n.prompt.becomeType} </InputButton>
      <Button
        onClick={props.onWrapFunc}
      > {i18n.prompt.wrapFunc} </Button>
      <Button
        onClick={props.onWrapPi}
      > {i18n.prompt.wrapPi} </Button>
      <Button
        onClick={props.onBecomeU}
      > {i18n.prompt.becomeU} </Button>
      <InputButton
        title={i18n.prompt.addNum}
        placeholder={i18n.prompt.value}
        onConfirm={(str) => {
          props.onBecomeNum(+str)
        }}
        validate={(str) => {
          return isNaN(+str) ? `${str} is not a number!` : null
        }}
      > {i18n.prompt.becomeNum} </InputButton>
    </Slot>
  </div>
}
