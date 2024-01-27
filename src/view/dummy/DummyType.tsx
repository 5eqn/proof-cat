import { useTranslation } from "react-i18next";
import { Block } from "../../component/Block";
import { Draggable } from "../../component/Draggable";
import Text from "../../component/Text";
import { palette } from "../color";

export function DummyType(): JSX.Element {
  const { t } = useTranslation()
  return <Draggable id="ABecomeType">
    <Block color={palette.type} shape="U">
      <Text text={t('type')} />
    </Block>
  </Draggable>
}
