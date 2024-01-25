import Center from "./component/Center";
import Text from "./component/Text";
import { pretty } from "./typecheck/pretty";
import { quote } from "./typecheck/quote";
import { onRedo, onUndo, onUpdate, state } from "./state";
import { KeyListener } from "./component/KeyListener";
import { useSnapshot } from "valtio";
import { Term, TFunc } from "./typecheck/model/term";
import { InferResult } from "./typecheck/model/infer";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { TermGeneral } from "./view/TermGeneral";
import { applyLens, splitLens } from "./typecheck/model/rec";
import { isPrefix } from "./util";
import { message } from "antd";
import { i18n } from "./i18n";
import { mkAction } from "./typecheck/model/action";
import Column from "./component/Column";
import { DummyFunc } from "./view/dummy/DummyFunc";
import { DummyPi } from "./view/dummy/DummyPi";
import { DummyApp } from "./view/dummy/DummyApp";
import { DummyLet } from "./view/dummy/DummyLet";
import { DummyNum } from "./view/dummy/DummyNum";
import { DummyType } from "./view/dummy/DummyType";
import { DummyUni } from "./view/dummy/DummyUni";

function App() {
  const termSnap: Term = useSnapshot(state.term) as Term
  const inferSnap: InferResult = useSnapshot(state.inferResult) as InferResult
  const tytm = quote(0, inferSnap.type)
  return <DndContext onDragEnd={handleDragEnd}>
    <div style={{
      position: "fixed",
      left: "40%",
      width: "60%",
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
      position: "fixed",
      left: "0%",
      width: "20%",
      padding: '16px',
      zIndex: 100,
    }}>
      <Column gap="16px">
        <DummyFunc />
        <DummyPi />
        <DummyApp />
        <DummyLet />
        <DummyNum />
        <DummyType />
        <DummyUni />
      </Column>
    </div>
    <div style={{
      position: "fixed",
      left: "20%",
      width: "20%",
      padding: '16px',
    }}>
      <Column>
        <TermGeneral term={termSnap} lens={[]} />
      </Column>
    </div>
    <KeyListener callbacks={[
      {
        key: 'z',
        requireCtrl: true,
        callback: onUndo,
      },
      {
        key: 'y',
        requireCtrl: true,
        callback: onRedo,
      },
    ]} />
  </DndContext>
}

function handleDragEnd(e: DragEndEvent) {
  if (!e.active || !e.over) return
  const activeID = e.active.id.toString()
  const overLens = splitLens(e.over.id.toString())
  const overInfer = applyLens(state.inferResult, overLens)
  const overEnvLen = overInfer.env.length
  const overType = overInfer.type
  const overTerm = applyLens(state.term, overLens)
  // Handle variable assignment (function)
  if (activeID[0] === 'F') {
    const activeLens = splitLens(activeID.substring(1))
    const funcLens = activeLens.slice(0, -2)
    if (!isPrefix(funcLens, overLens)) return message.error(i18n.err.noVariable)
    const funcEnvLen = applyLens(state.inferResult, funcLens).env.length
    const funcTerm = applyLens(state.term, funcLens) as TFunc
    const paramLen = funcTerm.param.length
    const paramIX = +activeLens[activeLens.length - 1]
    const varIX = overEnvLen - funcEnvLen - paramLen + paramIX
    onUpdate(mkAction({
      action: 'override',
      term: { term: 'var', ix: varIX },
      backup: { ...overTerm },
    }, overLens))
  }
  // Handle variable assignment (let definition)
  if (activeID[0] === 'L') {
    const activeLens = splitLens(activeID.substring(1))
    const letLens = activeLens.slice(0, -1)
    if (!isPrefix(letLens, overLens)) return message.error(i18n.err.noVariable)
    const letEnvLen = applyLens(state.inferResult, letLens).env.length
    const varIX = overEnvLen - letEnvLen - 1
    onUpdate(mkAction({
      action: 'override',
      term: { term: 'var', ix: varIX },
      backup: { ...overTerm },
    }, overLens))
  }
  // Handle instantiation
  if (activeID[0] === 'A') {
    switch (activeID) {
      case 'AWrapFunc': return onUpdate(mkAction({
        action: 'wrapFunc',
        name: 'x',
        envLen: overEnvLen,
      }, overLens))
      case 'AWrapPi': return onUpdate(mkAction({
        action: 'wrapPi',
        name: 'x',
        envLen: overEnvLen,
      }, overLens))
      case 'AWrapApp': return onUpdate(mkAction({
        action: 'wrapApp',
        envLen: overEnvLen,
        funcType: overType,
      }, overLens))
      case 'AWrapLet': return onUpdate(mkAction({
        action: 'wrapLet',
        name: 'x',
        envLen: overEnvLen,
      }, overLens))
      case 'ABecomeNum': return onUpdate(mkAction({
        action: 'override',
        term: { term: 'num', num: 114514 },
        backup: { ...overTerm },
      }, overLens))
      case 'ABecomeType': return onUpdate(mkAction({
        action: 'override',
        term: { term: 'type', type: 'A' },
        backup: { ...overTerm },
      }, overLens))
      case 'ABecomeUni': return onUpdate(mkAction({
        action: 'override',
        term: { term: 'uni' },
        backup: { ...overTerm },
      }, overLens))
    }
  }
}

export default App;
