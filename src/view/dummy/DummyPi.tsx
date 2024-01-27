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
          <Text text={t('if')} />
          <Block>
            <Text text='x' />
          </Block>
          <Text text={t('proves')} />
          <Block shape="U" inset parent={palette.pi} />
        </Row>
        <Row>
          <Text text={t('then')} />
          <Block shape="U" inset parent={palette.pi} />
        </Row>
      </Column>
    </Block>
  </Draggable>
}
