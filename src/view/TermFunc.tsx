import { TFunc } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import { TermGeneral } from "./TermGeneral";
import { Draggable } from "../component/Draggable";
import { applyLens, joinLens } from "../typecheck/model/rec";
import Row from "../component/Row";
import Column from "../component/Column";
import Input from "../component/Input";
import { onUpdate, state } from "../state";
import { mkAction } from "../typecheck/model/action";
import { palette } from "./color";
import { useSnapshot } from "valtio";
import { prettyStep } from "../typecheck/pretty";

export function TermFunc({ term, lens }: TermProps<TFunc>): JSX.Element {
  const inferRes = useSnapshot(applyLens(state.inferResult, lens)) as any
  const paramLens = [...lens, 'param']
  const color = palette.func
  return <Block color={color} >
    <Column>
      <Row>
        <Draggable id={'F' + joinLens(paramLens)}>
          <Block shape={prettyStep(inferRes.ns, inferRes.tm.param)} parent={color} >
            <Input value={term.paramID} onChange={v => onUpdate(mkAction({
              action: 'override',
              backup: { ...term },
              term: { ...term, paramID: v },
            }, lens))} />
          </Block>
        </Draggable>
        <TermGeneral term={term.param} lens={paramLens} parent={color} />
      </Row>
      <TermGeneral term={term.body} lens={[...lens, 'body']} parent={color} />
    </Column>
  </Block>
}

