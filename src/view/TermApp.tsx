import { TApp } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import { TermGeneral } from "./TermGeneral";
import Row from "../component/Row";
import Column from "../component/Column";
import { palette } from "./color";
import { useSnapshot } from "valtio";
import { applyLens } from "../typecheck/model/rec";
import { state } from "../state";
import { prettyStep } from "../typecheck/pretty";
import { quote } from "../typecheck/quote";

export function TermApp({ term, lens, parent }: TermProps<TApp>): JSX.Element {
  const inferRes = useSnapshot(applyLens(state.inferResult, lens)) as any
  const color = palette.app
  return <Block
    color={color}
    shape={prettyStep(inferRes.ns, quote(inferRes.ns, inferRes.type))}
    parent={parent}
  >
    <Column>
      <TermGeneral term={term.func} lens={[...lens, 'func']} parent={color} />
      <Column>
        <Row>
          <TermGeneral term={term.arg} lens={[...lens, 'arg']} parent={color} />
        </Row>
      </Column>
    </Column>
  </Block>
}

