import { Block } from "../../component/Block";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import Row from "../../component/Row";
import Text from "../../component/Text";
import { i18n } from "../../i18n";

export function DummyLet(): JSX.Element {
  return <Draggable id="AWrapLet">
    <Column>
      <Row>
        <Block>
          <Text text={i18n.prompt.wrapLet} />
        </Block>
        <Block inset />
      </Row>
      <Block inset />
    </Column>
  </Draggable>
}