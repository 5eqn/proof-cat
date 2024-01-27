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

export function TermApp({ term, lens, parent }: TermProps<TApp>): JSX.Element {
  const { t } = useTranslation()
  const inferRes = useSnapshot(applyLens(state.inferResult, lens)) as any
  const color = palette.app
  return <Block
    color={color}
    shape={prettyStep(inferRes.ns, quote(inferRes.ns, inferRes.type))}
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

