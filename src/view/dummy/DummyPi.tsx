import { useTranslation } from "react-i18next";
import { Block } from "../../component/Block";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import Row from "../../component/Row";
import Text from "../../component/Text";
import { palette } from "../color";

export function DummyPi(): JSX.Element {
  const { t } = useTranslation()
  return <Draggable id="AWrapPi">
    <Block color={palette.pi} shape='U' >
      <Column>
        <Row>
          <Block>
            <Text text={t('pi')} />
          </Block>
          <Text text=":" />
          <Block inset />
        </Row>
        <Block inset />
      </Column>
    </Block>
  </Draggable>
}
