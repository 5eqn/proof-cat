import { useImmer } from "use-immer";
import Center from "./component/Center";
import Text from "./component/Text";
import { evaluate, pretty, quote, sample, Term, wrap } from "./model";
import TermView from "./view/TermView";

function App() {
  const [state, setState] = useImmer<Term>(sample)
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
      <TermView
        level={0}
        value={state}
        onChange={(updater) => setState(draft =>
          updater(draft)
        )}
      />
    </div>
  </div>
}

export default App;
