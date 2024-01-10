import Input from "../component/Input"
import Slot from "../component/Slot"
import Text from "../component/Text"
import { CUProps, evaluate } from "../model"

export default function Number(props: CUProps) {
  return <Slot>
    <Text text="Number: " />
    <Input
      value={evaluate(props.ctx, props.env, props.value)}
      onChange={(str) => props.onChange({
        ast: 'num',
        num: +str
      })} />
  </Slot>
}
