// Atom type variable, `number`
export type TType = {
    term: 'type',
    type: string,
}
// Atom variable, `x`
export type TVar = {
    term: 'var'
    id: string
    ix: number, // de-Bruijn index, 0 is the most recent variable
}
// Arbitrary value or type, `any`
export type TAny = {
    term: 'any',
}
// Function intro, `\x => y`
export type TFunc = {
    term: 'func'
    param: Term[]
    paramID: string[]
    body: Term
}
// Function elim, `(\x => x)(x)`
export type TApp = {
    term: 'app'
    func: Term
    argIX: number[]
    argID: string[]
}
// Let bind, `let id = body in next`
export type TLet = {
    term: 'let',
    id: string,
    body: Term,
    next: Term,
}
// Dependent function type, `(x: X) -> Y`
export type TPi = {
    term: 'pi',
    from: Term[]
    fromID: string[]
    to: Term
}
// Universe type, `U`
export type TUni = {
    term: 'uni',
}
// Editable number
export type TNum = {
    term: 'num',
    num: number,
}
// All possible terms
export type Term = TVar | TFunc | TApp | TType | TNum | TAny | TPi | TLet | TUni