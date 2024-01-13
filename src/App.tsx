import { useImmer } from "use-immer";
import { Term } from "./model";
import { infer } from "./view";

function App() {
  const [state, setState] = useImmer<Term>({
    term: 'any'
  })
  const { element } = infer({
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: state,
    onChange: (updater) => {
      setState(updater)
    },
  })
  return <div style={{
    display: "flex",
  }}>
    <div style={{
      marginTop: "32px",
      width: "80%",
    }}>
    </div>
    <div style={{
      flexGrow: 1,
    }}>
      {element}
    </div>
  </div>
}

export default App;
