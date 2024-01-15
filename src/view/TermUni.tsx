import { i18n } from "../i18n";
import { TUni } from "../typecheck/model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../typecheck/model/props";

export interface TermUniProps extends TermPropsBase<TUni> { }

export function TermUni(props: TermUniProps): JSX.Element {
  return <TermHeader
    req={props.req}
    type={props.type}
    label={i18n.term.uni}
  />
}
