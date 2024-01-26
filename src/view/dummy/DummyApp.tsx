import { Block } from "../../component/Block";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import Row from "../../component/Row";
import Text from "../../component/Text";
import { i18n } from "../../i18n";
import { palette } from "../color";

export function DummyApp(): JSX.Element {
  return <Draggable id="AWrapApp">
    <Block color={palette.app} >
      <Column>
        <Row>
          <Block inset shape={'->'} parent={palette.app} />
          <Block inset />
        </Row>
        <Text text={i18n.prompt.wrapApp} />
      </Column>
    </Block>
  </Draggable>
}
