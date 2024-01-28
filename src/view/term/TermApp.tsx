import { TApp } from "../../typecheck/model/term";
import { TermProps } from "../../typecheck/model/props";
import { Block } from "../../component/Block";
import { TermGeneral } from "./TermGeneral";
import Row from "../../component/Row";
import Column from "../../component/Column";
import { palette } from "../color";
import { useSnapshot } from "valtio";
import { applyLens } from "../../typecheck/model/lens";
import { state } from "../../state";
import { prettyStep } from "../../typecheck/pretty";
import { quote } from "../../typecheck/quote";
import { useTranslation } from "react-i18next";
import Text from "../../component/Text";
import { InferResult } from "../../typecheck/model/infer";

export function TermApp({ term, lens, parent }: TermProps<TApp>): JSX.Element {
  const { t } = useTranslation()
  const inferRes = useSnapshot(applyLens(state.inferResult, lens)) as InferResult
  const ns = inferRes.ns
  const color = palette.app
  return <Block
    color={color}
    shape={prettyStep(ns, quote(ns.length, inferRes.type))}
    parent={parent}
  >
    <Column>
      <Row>
        <Text text={t('for')} />
        <TermGeneral term={term.func} lens={[...lens, 'func']} parent={color} />
      </Row>
      <Row>
        <Text text={t('useAssumption')} />
        <TermGeneral term={term.arg} lens={[...lens, 'arg']} parent={color} />
      </Row>
    </Column>
  </Block>
}

