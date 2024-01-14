// Delete Var(ix) in term (should only be called when no occurence)
// len: length of env before deletion
import {Draft} from "immer";
import {Term} from "../term";

export function deleteVar(ix: number, term: Draft<Term>) {
    switch (term.term) {
        case 'pi':
            term.from.forEach((t) => deleteVar(ix, t))
            deleteVar(ix + term.from.length, term.to)
            return
        case 'let':
            deleteVar(ix + 1, term.body)
            deleteVar(ix + 1, term.next)
            return
        case 'var':
            // Subtract index if the index will fall after deletion
            if (term.ix > ix) term.ix--
            return
        case 'app':
            deleteVar(ix, term.func)
            term.argIX.forEach((t, i) => {
                if (t > ix) term.argIX[i]--
            })
            return
        case 'func':
            term.param.forEach((t) => deleteVar(ix, t))
            deleteVar(ix + term.param.length, term.body)
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