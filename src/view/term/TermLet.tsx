import { TLet } from "../../typecheck/model/term";
import { TermProps } from "../../typecheck/model/props";
import { TermGeneral } from "./TermGeneral";
import Row from "../../component/Row";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import { applyLens, joinLens } from "../../typecheck/model/lens";
import { Block } from "../../component/Block";
import Input from "../../component/Input";
import { state } from "../../state";
import { mkAction } from "../../typecheck/model/action";
import { useSnapshot } from "valtio";
import { prettyStep } from "../../typecheck/pretty";
import { quote } from "../../typecheck/quote";
import Text from "../../component/Text";
import { onUpdate } from "../../state/onUpdate";
import { useTranslation } from "react-i18next";
import { InferResult } from "../../typecheck/model/infer";

export function TermLet({ term, lens, parent }: TermProps<TLet>): JSX.Element {
  const { t } = useTranslation()
  const bodyLens = [...lens, 'body']
  const bodyInfer = useSnapshot(applyLens(state.inferResult, bodyLens)) as InferResult
  const ns = bodyInfer.ns
  return <Column>
    <Row>
      <Text text={t('let')} />
      <Draggable id={'L' + joinLens(bodyLens)}>
        <Block shape={prettyStep(ns, quote(ns.length, bodyInfer.type))} parent={parent}>
          <Input value={term.id} onChange={v => onUpdate(mkAction({
            action: 'override',
            backup: { ...term },
            term: { ...term, id: v },
          }, lens))} />
        </Block>
      </Draggable>
      <Text text="=" />
      <TermGeneral term={term.body} lens={[...lens, 'body']} parent={parent} />
    </Row>
    <TermGeneral term={term.next} lens={[...lens, 'next']} parent={parent} />
  </Column>
}

