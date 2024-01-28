import { TFunc } from "../../typecheck/model/term";
import { TermProps } from "../../typecheck/model/props";
import { Block } from "../../component/Block";
import { TermGeneral } from "./TermGeneral";
import { Draggable } from "../../component/Draggable";
import { applyLens, joinLens } from "../../typecheck/model/lens";
import Row from "../../component/Row";
import Column from "../../component/Column";
import Input from "../../component/Input";
import { state } from "../../state";
import { mkAction } from "../../typecheck/model/action";
import { palette } from "../color";
import { useSnapshot } from "valtio";
import { prettyStep } from "../../typecheck/pretty";
import Text from "../../component/Text";
import { onUpdate } from "../../state/onUpdate";
import { useTranslation } from "react-i18next";
import { InferResult } from "../../typecheck/model/infer";

export function TermFunc({ term, lens, parent }: TermProps<TFunc>): JSX.Element {
  const { t } = useTranslation()
  const tm = useSnapshot(applyLens(state.term, lens)) as TFunc
  const inferRes = useSnapshot(applyLens(state.inferResult, lens)) as InferResult
  const paramLens = [...lens, 'param']
  const color = palette.func
  return <Block color={color} parent={parent} shape='->' >
    <Column>
      <Row>
        <Text text={t('assume')} />
        <Draggable id={'F' + joinLens(paramLens)}>
          <Block shape={prettyStep(inferRes.ns, tm.param)} parent={color} >
            <Input value={term.paramID} onChange={v => onUpdate(mkAction({
              action: 'override',
              backup: { ...term },
              term: { ...term, paramID: v },
            }, lens))} />
          </Block>
        </Draggable>
        <Text text={t('proves')} />
        <TermGeneral term={term.param} lens={paramLens} parent={color} />
      </Row>
      <Row>
        <Text text={t('apply')} />
        <TermGeneral term={term.body} lens={[...lens, 'body']} parent={color} />
      </Row>
    </Column>
  </Block>
}

