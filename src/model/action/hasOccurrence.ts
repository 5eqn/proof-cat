// Does Var(ix) occur in term? (can only be referred in Var or App)
import {Term} from "../term";

export function hasOccurrence(len: number, ix: number, term: Term): boolean {
    switch (term.term) {
        case 'pi':
            const occurInFrom = term.from
                .map((t) => hasOccurrence(len, ix, t))
                .reduce((x, y) => x || y, false)
            const l = term.from.length
            const occurInTo = hasOccurrence(len + l, ix + l, term.to)
            return occurInFrom || occurInTo
        case 'let':
            const occurInBody = hasOccurrence(len + 1, ix + 1, term.body)
            const occurInNext = hasOccurrence(len + 1, ix + 1, term.next)
            return occurInBody || occurInNext
        case 'var':
            return term.ix === ix
        case 'app':
            const occurInFunc = hasOccurrence(len, ix, term.func)
            const occurInArg = term.argIX
                .map((x) => x === ix)
                .reduce((x, y) => x || y, false)
            return occurInFunc || occurInArg
        case 'func':
            const occurInParam = term.param
                .map((t) => hasOccurrence(len, ix, t))
                .reduce((x, y) => x || y, false)
            const fl = term.param.length
            const occurInFBody = hasOccurrence(len + fl, ix + fl, term.body)
            return occurInParam || occurInFBody
        case 'num':
            return false
        case 'any':
            return false
        case 'type':
            return false
        case 'uni':
            return false
    }
}