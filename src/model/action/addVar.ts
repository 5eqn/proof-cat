// Add Var(ix) in term
// len: length of env before addition
import {Draft} from "immer";
import {Term} from "../term";

export function addVar(ix: number, term: Draft<Term>) {
    switch (term.term) {
        case 'pi':
            term.from.forEach((t) => addVar(ix, t))
            addVar(ix + term.from.length, term.to)
            return
        case 'let':
            addVar(ix + 1, term.body)
            addVar(ix + 1, term.next)
            return
        case 'var':
            // Add index if the index will rise after addition
            if (term.ix >= ix) term.ix++
            return
        case 'app':
            addVar(ix, term.func)
            term.argIX.forEach((t, i) => {
                if (t >= ix) term.argIX[i]++
            })
            return
        case 'func':
            term.param.forEach((t) => addVar(ix, t))
            addVar(ix + term.param.length, term.body)
            return
        case 'num':
            return
        case 'any':
            return
        case 'type':
            return
        case 'uni':
            return
    }
}