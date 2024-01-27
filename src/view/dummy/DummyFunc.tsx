import { useTranslation } from "react-i18next";
import { Block } from "../../component/Block";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import Row from "../../component/Row";
import Text from "../../component/Text";
import { palette } from "../color";

export function DummyFunc(): JSX.Element {
  const { t } = useTranslation()
  return <Draggable id="AWrapFunc">
    <Block color={palette.func} shape='->' >
      <Column>
        <Row>
          <Block>
            <Text text={t('func')} />
          </Block>
          <Text text=":" />
          <Block inset />
        </Row>
        <Block inset />
      </Column>
    </Block>
  </Draggable>
}

