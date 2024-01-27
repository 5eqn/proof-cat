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
          <Text text={t('assume')} />
          <Block>
            <Text text='x' />
          </Block>
          <Text text={t('proves')} />
          <Block shape="U" inset parent={palette.func} />
        </Row>
        <Row>
          <Text text={t('apply')} />
          <Block inset />
        </Row>
      </Column>
    </Block>
  </Draggable>
}

