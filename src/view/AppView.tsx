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
      name={props.value.argID[i]}
      onNameChange={(name) => props.onChange(draft => {
        draft.argID[i] = name
      })}
      value={t}
      onChange={(updater) => props.onChange(draft => {
        updater(draft.arg[i])
      })}
      onDelete={() => props.onChange(draft => {
        delete draft.arg[i]
      })}
    />
  )
  return <div>
    <Slot>
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
      label="Target"
      value={props.value.func}
      onChange={(updater) => props.onChange(draft =>
        updater(draft.func)
      )}
    />
  </div>
}
