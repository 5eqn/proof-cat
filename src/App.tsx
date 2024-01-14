import { useImmer } from "use-immer";
import Center from "./component/Center";
import Text from "./component/Text";
import { pretty, quote, Term } from "./model";
import { infer } from "./view";

function App() {
  const [state, setState] = useImmer<Term>({
    term: 'any'
  })
  const { val, element } = infer({
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: state,
    onChange: (updater) => {
      setState(updater)
    },
  })
  const tytm = quote(0, val)
  return <div>
    <div style={{
      position: "fixed",
      left: "30%",
      width: "70%",
      top: "32px",
    }}>
      <Center>
        <Text text="You have proven: " />
        <div style={{ height: '16px' }} />
        <Text text={pretty([], tytm)} />
      </Center>
    </div>
    <div style={{
      width: "30%",
    }}>
      {element}
    </div>
  </div>
}

export default App;
