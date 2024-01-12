import Button from "../component/Button"
import Slot from "../component/Slot"
import Spacer from "../component/Spacer"
import Text from "../component/Text"
import { CommonProps, TPi } from "../model"
import LabelView from "./LabelView"
import NamedView from "./NamedView"

export default function PiView(props: CommonProps<TPi>) {
  const records = props.value.from.map((t, i) =>
    <NamedView
      key={i}
      level={props.level + 1}
      name={props.value.fromID[i]}
      onNameChange={(name) => props.onChange(draft => {
        draft.fromID[i] = name
      })}
      value={t}
      onChange={(updater) => props.onChange(draft => {
        updater(draft.from[i])
      })}
    />
  )
  return <div>
    <Slot level={props.level}>
      <Text text="Pi" />
      <Spacer />
      <Button
        text="+"
        onClick={() => props.onChange(draft => {
          draft.from.push({ 'term': 'any' })
          draft.fromID.push('test')
        })}
      />
    </Slot>
    <div>{records}</div>
    <LabelView
      level={props.level}
      label="Destination"
      value={props.value.to}
      onChange={(updater) => props.onChange(draft =>
        updater(draft.to)
      )}
    />
  </div>
}
