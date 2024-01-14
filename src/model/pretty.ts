/**************
 PRETTY-PRINT
 **************/
import {Term} from "./term";

// Pretty-print a term
export function pretty(ns: string[], term: Term): string {
    switch (term.term) {
        case 'func':
            return `(${term.param.map((t, i) => `${term.paramID[i]}: ${pretty(ns, t)}`).join(', ')}) => ${pretty([...term.paramID, ...ns], term.body)}`
        case 'pi':
            return `(${term.from.map((t, i) => `${term.fromID[i]}: ${pretty(ns, t)}`).join(', ')}) -> ${pretty([...term.fromID, ...ns], term.to)}`
        case 'app':
            return `(${pretty(ns, term.func)})(${term.argIX.map((ix, i) => `${term.argID[i]} = ${ns[ix]}_${ix}`).join(', ')})`
        case 'var':
            return `${term.id}_${term.ix}`
        case 'num':
            return term.num.toString()
        case 'type':
            return term.type
        case 'any':
            return '*'
        case 'uni':
            return 'U'
        case 'let':
            return `${term.id} = ${pretty([term.id, ...ns], term.body)}; ${pretty([term.id, ...ns], term.next)}`
    }
}