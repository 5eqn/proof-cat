import Slot from "../component/Slot"
import Text from "../component/Text"
import Spacer from "../component/Spacer"
import Button from "./Button"
import InputButton from "./InputButton"

export default function AnyBar(props: {
  depth: number,
  label: string,
  validate: (name: string) => string | null
  onBecomeVar: (name: string) => void
  onBecomeLet: (name: string) => void
  onBecomeType: (name: string) => void
  onBecomeFunc: () => void
  onBecomePi: () => void
  onBecomeU: () => void
  onBecomeNum: (num: number) => void
}) {
  return <div>
    <Slot depth={props.depth}>
      <Text text={props.label} />
      <Spacer />
      <InputButton
        onConfirm={props.onBecomeVar}
        validate={props.validate}
      > V </InputButton>
      <InputButton
        onConfirm={props.onBecomeLet}
        validate={props.validate}
      > L </InputButton>
      <InputButton
        onConfirm={props.onBecomeType}
        validate={props.validate}
      > T </InputButton>
      <Button
        onClick={props.onBecomeFunc}
      > F </Button>
      <Button
        onClick={props.onBecomePi}
      > P </Button>
      <Button
        onClick={props.onBecomeU}
      > A </Button>
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
