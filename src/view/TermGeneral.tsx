import { TermProps } from "../typecheck/model/props";
import { Term } from "../typecheck/model/term";
import { TermAny } from "./TermAny";
import { TermApp } from "./TermApp";
import { TermFunc } from "./TermFunc";
import { TermLet } from "./TermLet";
import { TermNum } from "./TermNum";
import { TermPi } from "./TermPi";
import { TermType } from "./TermType";
import { TermUni } from "./TermUni";
import { TermVar } from "./TermVar";

export function TermGeneral({ term, lens }: TermProps<Term>) {
  switch (term.term) {
    case 'any':
      return <TermAny term={term} lens={lens} />
    case 'pi':
      return <TermPi term={term} lens={lens} />
    case 'func':
      return <TermFunc term={term} lens={lens} />
    case 'app':
      return <TermApp term={term} lens={lens} />
    case 'let':
      return <TermLet term={term} lens={lens} />
    case 'type':
      return <TermType term={term} lens={lens} />
    case 'var':
      return <TermVar term={term} lens={lens} />
    case 'num':
      return <TermNum term={term} lens={lens} />
    case 'uni':
      return <TermUni term={term} lens={lens} />
  }
}
