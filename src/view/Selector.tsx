import Slot from "../component/Slot"
import Text from "../component/Text"
import { CUProps } from "../model"

export default function Selector(props: CUProps) {
  return <Slot>
    <Text text="Selector" />
  </Slot>
}
