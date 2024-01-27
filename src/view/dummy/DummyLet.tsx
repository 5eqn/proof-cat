import { useTranslation } from "react-i18next";
import { Block } from "../../component/Block";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import Row from "../../component/Row";
import Text from "../../component/Text";

export function DummyLet(): JSX.Element {
  const { t } = useTranslation()
  return <Draggable id="AWrapLet">
    <Column>
      <Row>
        <Block>
          <Text text={t('let')} />
        </Block>
        <Text text="=" />
        <Block inset />
      </Row>
      <Block inset />
    </Column>
  </Draggable>
}
