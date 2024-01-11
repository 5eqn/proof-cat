import Button from "../component/Button"
import Slot from "../component/Slot"
import Spacer from "../component/Spacer"
import Text from "../component/Text"
import { CommonProps, TApp } from "../model"
import { listRecord } from "../util"
import LabelView from "./LabelView"
import NamedView from "./NamedView"

export default function AppView(props: CommonProps<TApp>) {
  const records = listRecord(props.value.arg, (id, t) =>
    <NamedView
      name={id}
      onNameChange={(name) => props.onChange(draft => {
        delete draft.arg[id]
        draft.arg[name] = t
      })}
      value={t}
      onChange={(updater) => props.onChange(draft => {
        updater(draft.arg[id])
      })}
      onDelete={() => props.onChange(draft => {
        delete draft.arg[id]
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
          draft.arg['test'] = { 'term': 'any' }
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
