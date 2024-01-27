import { TUni } from "../../typecheck/model/term";
import { TermProps } from "../../typecheck/model/props";
import { Block } from "../../component/Block";
import Text from "../../component/Text";
import { palette } from "../color";
import { useTranslation } from "react-i18next";

export function TermUni({ parent }: TermProps<TUni>): JSX.Element {
  const { t } = useTranslation()
  return <Block color={palette.type} shape="U" parent={parent}>
    <Text text={t('uni')} />
  </Block>
}
