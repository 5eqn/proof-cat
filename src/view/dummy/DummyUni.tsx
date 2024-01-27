import { useTranslation } from "react-i18next";
import { Block } from "../../component/Block";
import { Draggable } from "../../component/Draggable";
import Text from "../../component/Text";
import { palette } from "../color";

export function DummyUni(): JSX.Element {
  const { t } = useTranslation()
  return <Draggable id="ABecomeUni">
    <Block color={palette.type} shape="U">
      <Text text={t('uni')} />
    </Block>
  </Draggable>
}
