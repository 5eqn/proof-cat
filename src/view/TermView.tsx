import { CommonProps, Term } from "../model"
import AnyView from "./AnyView"
import AppView from "./AppView"
import FuncView from "./FuncView"
import NumberView from "./NumberView"
import PiView from "./PiView"
import TypeView from "./TypeView"
import VarView from "./VarView"

function getView<T extends Term>(term: T): (props: CommonProps<T>) => JSX.Element {
  // Using any because Typescript's typecheck is FUCKED UP
  switch (term.term) {
    case 'app': return AppView as any
    case 'var': return VarView as any
    case 'any': return AnyView as any
    case 'pi': return PiView as any
    case 'num': return NumberView as any
    case 'func': return FuncView as any
    case 'type': return TypeView as any
  }
}

export default function TermView(props: CommonProps<Term>) {
  const View = getView(props.value)
  return <View
    value={props.value}
    onChange={props.onChange}
  />
}
