import { useImmer } from "use-immer";
import Center from "./component/Center";
import Text from "./component/Text";
import { Term } from "./typecheck/model/term";
import { pretty } from "./typecheck/pretty";
import { infer } from "./typecheck/infer";
import { quote } from "./typecheck/quote";
import { runAction } from "./typecheck/action";
import { CodeActionError } from "./typecheck/model/error";
import { message } from "antd";
import { revertAction } from "./typecheck/model/action";

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
    onChange: (action) => {
      let success = true
      setState(draft => {
        try {
          // Run action
          console.log(0)
          runAction(action, draft)
          try {
            // Check if new term is well-typed
            console.log(1)
            infer({
              env: [],
              ctx: [],
              ns: [],
              depth: 0,
              term: draft,
              onChange: (_) => true,
            })
          } catch (e) {
            // If not, revert action and throw error
            console.log(2)
            runAction(revertAction(action), draft)
            throw e;
          }
        } catch (e) {
          success = false
          console.log(3)
          if (e instanceof CodeActionError) {
            // Handle predefined error
            console.log(4)
            message.error(e.toString())
          } else {
            throw e;
          }
        }
      })
      return success;
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
  </div>
}

export default App;
