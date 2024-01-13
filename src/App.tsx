import { message } from "antd";
import { useState } from "react";
import InputButton from "./component/InputButton";
import Select from "./component/Select";

function App() {
  const data = [
    '114',
    '514',
    'eggy_party',
    'foo',
    'yuanmeng_zhixing',
  ]
  const [index, setIndex] = useState(0)
  return <div style={{ padding: '32px' }}>
    <InputButton onConfirm={(name) => {
      if (name === 'eggy') {
        return 'Player of Eggy Party is not allowed to use this app now!'
      }
      message.success(`Name = ${name}!`)
      return null
    }} />
    <div style={{ height: '16px' }} />
    <Select onChange={(id) => {
      message.success(`Data = ${data[id]}!`)
      setIndex(id)
    }} data={data} index={index} />
  </div>
}

export default App;
