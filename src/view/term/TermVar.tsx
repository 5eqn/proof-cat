import { TVar } from "../../typecheck/model/term";
import { TermProps } from "../../typecheck/model/props";
import { Block } from "../../component/Block";
import Text from "../../component/Text";
import { useSnapshot } from "valtio";
import { state } from "../../state";
import { applyLens } from "../../typecheck/model/lens";
import { prettyStep } from "../../typecheck/pretty";
import { quote } from "../../typecheck/quote";
import { InferResult } from "../../typecheck/model/infer";

export function TermVar({ term, lens, parent }: TermProps<TVar>): JSX.Element {
  const inferRes = useSnapshot(applyLens(state.inferResult, lens)) as InferResult
  const ns: string[] = inferRes.ns
  return <Block shape={prettyStep(ns, quote(ns.length, inferRes.type))} parent={parent} >
    <Text text={ns[term.ix]} />
  </Block>
}
