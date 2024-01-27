import Center from "./component/Center";
import Text from "./component/Text";
import { pretty } from "./typecheck/pretty";
import { quote } from "./typecheck/quote";
import { state } from "./state";
import { KeyListener } from "./component/KeyListener";
import { useSnapshot } from "valtio";
import { Term } from "./typecheck/model/term";
import { InferResult } from "./typecheck/model/infer";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { TermGeneral } from "./view/term/TermGeneral";
import { applyLens, splitLens } from "./typecheck/model/lens";
import { isPrefix } from "./util";
import { message } from "antd";
import { mkAction } from "./typecheck/model/action";
import Column from "./component/Column";
import { DummyFunc } from "./view/dummy/DummyFunc";
import { DummyPi } from "./view/dummy/DummyPi";
import { DummyApp } from "./view/dummy/DummyApp";
import { DummyLet } from "./view/dummy/DummyLet";
import { DummyNum } from "./view/dummy/DummyNum";
import { DummyType } from "./view/dummy/DummyType";
import { DummyUni } from "./view/dummy/DummyUni";
import { onUpdate } from "./state/onUpdate";
import { onRedo } from "./state/onRedo";
import { onUndo } from "./state/onUndo";
import i18n from "./i18n";
import { LangSwitch } from "./component/LangSwitch";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation()
  const termSnap: Term = useSnapshot(state.term) as Term
  const inferSnap: InferResult = useSnapshot(state.inferResult) as InferResult
  const tytm = quote(0, inferSnap.type)
  return <DndContext onDragEnd={handleDragEnd}>
    <div style={{
      position: 'absolute',
      right: '16px',
      bottom: '16px',
    }}>
      <a href="https://www.github.com/5eqn/proof-cat" style={{ marginRight: '8px' }}>
        GitHub
      </a>
      <LangSwitch />
    </div>
    <div style={{
      position: "fixed",
      left: "70%",
      width: "30%",
      top: "32px",
    }}>
      <Center>
        <Text text={t('youHaveProven')} />
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
      position: "relative",
      left: "20%",
      width: "50%",
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
  const overTerm = applyLens(state.term, overLens)
  // Handle variable assignment (function)
  if (activeID[0] === 'F') {
    const activeLens = splitLens(activeID.substring(1))
    const funcLens = activeLens.slice(0, -1)
    const bodyLens = [...funcLens, 'body']
    if (!isPrefix(bodyLens, overLens)) return message.error(i18n.t('varNotExist'))
    const funcEnvLen = applyLens(state.inferResult, funcLens).env.length
    const varIX = overEnvLen - funcEnvLen - 1
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
    const nextLens = [...letLens, 'next']
    if (!isPrefix(nextLens, overLens)) return message.error(i18n.t('varNotExist'))
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
