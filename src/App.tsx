import { useImmer } from "use-immer";
import Center from "./component/Center";
import Text from "./component/Text";
import { Term } from "./typecheck/model/term";
import { pretty } from "./typecheck/pretty";
import { infer } from "./typecheck/infer";
import { quote } from "./typecheck/quote";
import { onRedo, onUndo, onUpdate } from "./typecheck/update";
import { KeyListener } from "./component/KeyListener";

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
    onChange: (action) => onUpdate(action, setState)
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
        <Text text="1. (A -> B) -> ((B -> 0) -> (A -> 0))" />
        <div style={{ height: '16px' }} />
        <Text text="2. (forall x. A(x) -> B(x)) -> (forall x. A(x)) -> (forall x. B(x))" />
        <div style={{ height: '16px' }} />
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
    <KeyListener callbacks={[
      {
        key: 'z',
        requireCtrl: true,
        callback: () => onUndo(setState)
      },
      {
        key: 'y',
        requireCtrl: true,
        callback: () => onRedo(setState)
      },
    ]} />
  </div>
}

export default App;
