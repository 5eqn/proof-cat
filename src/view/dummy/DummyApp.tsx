import { Block } from "../../component/Block";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import Row from "../../component/Row";
import Text from "../../component/Text";
import { i18n } from "../../i18n";

export function DummyApp(): JSX.Element {
  return <Draggable id="AWrapApp">
    <Block>
      <Column>
        <Block />
        <Row>
          <Text text={i18n.prompt.wrapApp} />
          <Block />
        </Row>
      </Column>
    </Block>
  </Draggable>
}
