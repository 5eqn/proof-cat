import Button from "../component/Button"
import Slot from "../component/Slot"
import Spacer from "../component/Spacer"
import Text from "../component/Text"
import { TFunc, CommonProps } from "../model"
import { listRecord } from "../util"
import LabelView from "./LabelView"
import NamedView from "./NamedView"

export default function FuncView(props: CommonProps<TFunc>) {
  const records = listRecord(props.value.param, (id, t) =>
    <NamedView
      name={id}
      onNameChange={(name) => props.onChange(draft => {
        delete draft.param[id]
        draft.param[name] = t
      })}
      value={t}
      onChange={(updater) => props.onChange(draft => {
        updater(draft.param[id])
      })}
      onDelete={() => props.onChange(draft => {
        delete draft.param[id]
      })}
    />
  )
  return <div>
    <Slot>
      <Text text="Function" />
      <Spacer />
      <Button
        text="+"
        onClick={() => props.onChange(draft => {
          draft.param['test'] = { 'term': 'any' }
        })}
      />
    </Slot>
    <div>{records}</div>
    <LabelView
      label="Body"
      value={props.value.body}
      onChange={(updater) => props.onChange(draft =>
        updater(draft.body)
      )}
    />
  </div>
}
