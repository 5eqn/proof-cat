/*************
 CODE-ACTION
 *************/
import {Term} from "./term";
import {Draft} from "immer";

// Does Var(ix) occur in term? (can only be referred in Var or App)
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

// Delete Var(ix) in term (should only be called when no occurence)
// len: length of env before deletion
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

// Add Var(ix) in term
// len: length of env before addition
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