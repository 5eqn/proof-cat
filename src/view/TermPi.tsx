import { TPi } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import { TermGeneral } from "./TermGeneral";
import { Draggable } from "../component/Draggable";
import { joinLens } from "../typecheck/model/rec";
import Row from "../component/Row";
import Column from "../component/Column";
import Input from "../component/Input";
import { onUpdate } from "../state";
import { mkAction } from "../typecheck/model/action";
import { palette } from "./color";

export function TermPi({ term, lens }: TermProps<TPi>): JSX.Element {
  const paramLens = [...lens, 'param']
  return <Block color={palette.pi} >
    <Column>
      <Row>
        <Draggable id={'F' + joinLens(paramLens)}>
          <Block>
            <Input value={term.paramID} onChange={v => onUpdate(mkAction({
              action: 'override',
              backup: { ...term },
              term: { ...term, paramID: v },
            }, lens))} />
          </Block>
        </Draggable>
        <TermGeneral term={term.param} lens={paramLens} />
      </Row>
      <TermGeneral term={term.body} lens={[...lens, 'body']} />
    </Column>
  </Block>
}
