import { TVar } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import Text from "../component/Text";
import { useSnapshot } from "valtio";
import { state } from "../state";
import { applyLens } from "../typecheck/model/rec";

export function TermVar({ term, lens }: TermProps<TVar>): JSX.Element {
  const inferRes = useSnapshot(applyLens(state.inferResult, lens))
  return <Block>
    <Text text={inferRes.ns[term.ix]} />
  </Block>
}
