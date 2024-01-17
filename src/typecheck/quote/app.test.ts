import { quote } from "."
import { TApp, TVar } from "../model/term"
import { VApp, VNum, VVar } from "../model/value"

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
    ix: 3,
  }

  // f(d, a, c, b)
  const termApp: TApp = {
    term: 'app',
    arg: [
      {
        term: 'var',
        id: 'd',
        ix: 0,
      },
      {
        term: 'var',
        id: 'a',
        ix: 2,
      },
      {
        term: 'num',
        num: 114,
      },
      {
        term: 'var',
        id: 'b',
        ix: 1,
      }
    ],
    argID: ['d', 'a', 'c', 'b'],
    func: termF,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should quote args and func', () => {
    const val = quote(4, valApp)
    expect(val).toStrictEqual(termApp)
  })
})
