import { TApp, TLet, TNum, TVar } from "../model/term"
import { VApp, VNum, VVar } from "../model/value"
import { quoteApp } from "./app"

describe('quoteApp function', () => {
  const varD: VVar = {
    val: 'var',
    id: 'd',
    lvl: 3,
  }
  const varNum: VNum = {
    val: 'num',
    num: 114,
  }
  const varB: VVar = {
    val: 'var',
    id: 'b',
    lvl: 2,
  }
  const varA: VVar = {
    val: 'var',
    id: 'a',
    lvl: 1,
  }
  const varF: VVar = {
    val: 'var',
    id: 'f',
    lvl: 0,
  }
  const valApp: VApp = {
    val: 'app',
    arg: [varD, varA, varNum, varB],
    argID: ['d', 'a', 'c', 'b'],
    func: varF,
  }

  // f
  const termF: TVar = {
    term: 'var',
    id: 'f',
    // 4 because a let is inserted for `c`
    ix: 4,
  }

  // f(d, a, c, b)
  const termApp: TApp = {
    term: 'app',
    // `c` is 0 because inserted let is innermost
    argIX: [1, 3, 0, 2],
    argID: ['d', 'a', 'c', 'b'],
    func: termF,
  }

  // 114
  const oneOneFour: TNum = {
    term: 'num',
    num: 114,
  }

  // let c = 114 in f(d, a, c, b)
  const termLet: TLet = {
    term: 'let',
    id: 'c',
    body: oneOneFour,
    next: termApp,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should add let for non-variables', () => {
    const val = quoteApp(4, valApp)
    expect(val).toStrictEqual(termLet)
  })
})
