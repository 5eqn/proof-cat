import { useImmer } from "use-immer";
import Center from "./component/Center";
import Text from "./component/Text";
import { evaluate, pretty, quote, sample, Term, wrap } from "./model";

function App() {
  const [state, _] = useImmer<Term>(sample)
  const value = wrap(() => pretty(quote(0, evaluate([], state))))
  return <div style={{
    display: "flex",
  }}>
    <div style={{
      marginTop: "32px",
      width: "80%",
    }}>
      <Center>
        <Text text={`Term : ${pretty(state)}`} />
        <Text text={`Value : ${value}`} />
      </Center>
    </div>
    <div style={{
      flexGrow: 1,
    }}>
    </div>
  </div>
}

export default App;
