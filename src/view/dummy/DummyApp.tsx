import { useTranslation } from "react-i18next";
import { Block } from "../../component/Block";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import Row from "../../component/Row";
import Text from "../../component/Text";
import { palette } from "../color";

export function DummyApp(): JSX.Element {
  const { t } = useTranslation()
  return <Draggable id="AWrapApp">
    <Block color={palette.app} >
      <Column>
        <Row>
          <Text text={t('for')} />
          <Block inset shape={'->'} parent={palette.app} />
        </Row>
        <Row>
          <Text text={t('useAssumption')} />
          <Block inset />
        </Row>
      </Column>
    </Block>
  </Draggable>
}
