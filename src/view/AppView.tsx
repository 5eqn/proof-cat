import Slot from "../component/Slot"
import Text from "../component/Text"
import { CommonProps, TApp } from "../model"
import LabelView from "./LabelView"

export default function AppView(props: CommonProps<TApp>) {
  const records = props.value.arg.map((t, i) =>
    <LabelView
      key={i}
      level={props.level + 1}
      label={props.value.argID[i]}
      value={t}
      onChange={(updater) => props.onChange(draft => {
        updater(draft.arg[i])
      })}
    />
  )
  return <div>
    <Slot level={props.level}>
      <Text text="Apply" />
    </Slot>
    <div>{records}</div>
    <LabelView
      level={props.level}
      label="Target"
      value={props.value.func}
      onChange={(updater) => props.onChange(draft =>
        updater(draft.func)
      )}
    />
  </div>
}
