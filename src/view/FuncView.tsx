import Button from "../component/Button"
import Slot from "../component/Slot"
import Spacer from "../component/Spacer"
import Text from "../component/Text"
import { TFunc, CommonProps } from "../model"
import LabelView from "./LabelView"
import NamedView from "./NamedView"

export default function FuncView(props: CommonProps<TFunc>) {
  const records = props.value.param.map((t, i) =>
    <NamedView
      key={i}
      level={props.level + 1}
      name={props.value.paramID[i]}
      onNameChange={(name) => props.onChange(draft => {
        draft.paramID[i] = name
      })}
      value={t}
      onChange={(updater) => props.onChange(draft => {
        updater(draft.param[i])
      })}
    />
  )
  return <div>
    <Slot level={props.level}>
      <Text text="Function" />
      <Spacer />
      <Button
        text="+"
        onClick={() => props.onChange(draft => {
          draft.param.push({ 'term': 'any' })
          draft.paramID.push('test')
        })}
      />
    </Slot>
    <div>{records}</div>
    <LabelView
      level={props.level}
      label="Body"
      value={props.value.body}
      onChange={(updater) => props.onChange(draft =>
        updater(draft.body)
      )}
    />
  </div>
}
