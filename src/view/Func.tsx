import Slot from "../component/Slot"
import Text from "../component/Text"
import { CUProps } from "../model"

export default function Func(props: CUProps) {
  return <div>
    <Slot>
      <Text text="Function" />
    </Slot>
  </div>
}
