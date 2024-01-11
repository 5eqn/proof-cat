import Button from "../component/Button"
import Slot from "../component/Slot"
import Spacer from "../component/Spacer"
import Text from "../component/Text"
import { CommonProps, TPi } from "../model"
import { listRecord } from "../util"
import NamedView from "./NamedView"
import TermView from "./TermView"

export default function PiView(props: CommonProps<TPi>) {
  const records = listRecord(props.value.from, (id, t) =>
    <NamedView
      name={id}
      onNameChange={(name) => props.onChange(draft => {
        delete draft.from[id]
        draft.from[name] = t
      })}
      value={t}
      onChange={(updater) => props.onChange(draft => {
        updater(draft.from[id])
      })}
      onDelete={() => props.onChange(draft => {
        delete draft.from[id]
      })}
    />
  )
  return <div>
    <Slot>
      <Text text="Pi" />
      <Spacer />
      <Button
        text="+"
        onClick={() => props.onChange(draft => {
          draft.from['test'] = { 'term': 'any' }
        })}
      />
    </Slot>
    <div>{records}</div>
    <TermView
      value={props.value.to}
      onChange={(updater) => props.onChange(draft =>
        updater(draft.to)
      )}
    />
  </div>
}
