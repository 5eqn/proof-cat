import { useImmer } from "use-immer";
import Center from "./component/Center";
import Text from "./component/Text";
import { evaluate, pretty, quote, sample, Term } from "./model";
import TermView from "./view/TermView";

function App() {
  const [state, setState] = useImmer<Term>(sample)
  return <div style={{
    display: "flex",
  }}>
    <div style={{
      marginTop: "32px",
      width: "70%",
    }}>
      <Center>
        <Text text={`Term : ${pretty(state)}`} />
        <Text text={`Value : ${pretty(quote(0, evaluate([], state)))}`} />
      </Center>
    </div>
    <div style={{
      flexGrow: 1,
    }}>
      <TermView
        value={state}
        onChange={(updater) => setState(draft =>
          updater(draft)
        )}
      />
    </div>
  </div>
}

export default App;
