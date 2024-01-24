import { Block } from "../../component/Block";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import Row from "../../component/Row";
import Text from "../../component/Text";
import { i18n } from "../../i18n";

export function DummyPi(): JSX.Element {
  return <Draggable id="AWrapPi">
    <Block>
      <Column>
        <Row>
          <Block>
            <Text text={i18n.prompt.wrapPi} />
          </Block>
          <Block />
        </Row>
        <Block />
      </Column>
    </Block>
  </Draggable>
}
