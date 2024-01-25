import { TFunc } from "../typecheck/model/term";
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

export function TermFunc({ term, lens }: TermProps<TFunc>): JSX.Element {
  const params = term.param.map((t, i) => {
    const paramLens = [...lens, 'param', i.toString()]
    return <Row>
      <Draggable id={'F' + joinLens(paramLens)}>
        <Block>
          <Input value={term.paramID[i]} onChange={v => onUpdate(mkAction({
            action: 'renameParam',
            ix: i,
            oldID: term.paramID[i],
            newID: v,
          }, lens))} />
        </Block>
      </Draggable>
      <TermGeneral term={t} lens={paramLens} />
    </Row>
  })
  return <Block color={palette.func} >
    <Column>
      <Column>
        {params}
      </Column>
      <TermGeneral term={term.body} lens={[...lens, 'body']} />
    </Column>
  </Block>
}

