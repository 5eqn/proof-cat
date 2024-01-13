import { Select as ASelect } from "antd"

interface SelectProps {
  // Data source for select
  data: string[]
  // Index of selection
  index: number,
  // On change, only index in array is sent
  onChange: (i: number) => void
}

export default function Select(props: SelectProps) {
  return <ASelect
    style={{ width: '144px' }}
    value={props.index}
    showSearch
    onChange={props.onChange}
    filterOption={(input: string, option: any) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
    options={props.data.map((d, i) => ({
      value: i,
      label: d,
    }))}
  />
}
