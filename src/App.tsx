import { message } from "antd";
import InputButton from "./component/InputButton";

function App() {
  const [messageApi, contextHolder] = message.useMessage()
  return <div>
    {contextHolder}
    <InputButton onConfirm={(name) => messageApi.open({
      type: 'success',
      content: `Name = ${name}!`
    })} />
  </div>
}

export default App;
