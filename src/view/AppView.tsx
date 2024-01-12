import Button from "../component/Button"
import Slot from "../component/Slot"
import Spacer from "../component/Spacer"
import Text from "../component/Text"
import { CommonProps, TApp } from "../model"
import LabelView from "./LabelView"
import NamedView from "./NamedView"

export default function AppView(props: CommonProps<TApp>) {
  const records = props.value.arg.map((t, i) =>
    <NamedView
      key={i}
      level={props.level + 1}
      name={props.value.argID[i]}
      onNameChange={(name) => props.onChange(draft => {
        draft.argID[i] = name
      })}
      value={t}
      onChange={(updater) => props.onChange(draft => {
        updater(draft.arg[i])
      })}
    />
  )
  return <div>
    <Slot level={props.level}>
      <Text text="Apply" />
      <Spacer />
      <Button
        text="+"
        onClick={() => props.onChange(draft => {
          draft.arg.push({ 'term': 'any' })
          draft.argID.push('test')
        })}
      />
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
