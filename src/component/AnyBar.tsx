import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Button from "./Button"
import InputButton from "./InputButton"

export default function AnyBar(props: {
  depth: number,
  label: string,
  validate: (name: string) => string | null
  onWrapLet: (name: string) => void
  onWrapFunc: () => void
  onWrapPi: () => void
  onBecomeVar: () => void
  onBecomeType: (name: string) => void
  onBecomeU: () => void
  onBecomeNum: (num: number) => void
}) {
  return <div>
    <Slot depth={props.depth}>
      <Text text={props.label} />
      <Spacer />
      <Button
        onClick={props.onBecomeVar}
      > V </Button>
      <InputButton
        onConfirm={props.onWrapLet}
        validate={props.validate}
      > L </InputButton>
      <InputButton
        onConfirm={props.onBecomeType}
        validate={props.validate}
      > T </InputButton>
      <Button
        onClick={props.onWrapFunc}
      > F </Button>
      <Button
        onClick={props.onWrapPi}
      > P </Button>
      <Button
        onClick={props.onBecomeU}
      > U </Button>
      <InputButton
        onConfirm={(str) => {
          props.onBecomeNum(+str)
        }}
        validate={(str) => {
          return isNaN(+str) ? `${str} is not a number!` : null
        }}
      > n </InputButton>
    </Slot>
  </div>
}
