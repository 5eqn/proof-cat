import cloneDeep from "lodash.clonedeep"
import { runAction } from "../action"
import { mkAction } from "../model/action"
import { InferRequest } from "../model/infer"
import { TApp, TVar } from "../model/term"
import { VVar, VPi, VUni } from "../model/value"
import { inferApp } from "./app"

describe('inferApp function', () => {
  // Most recent var
  const mockTVarX: TVar = {
    term: 'var',
    id: 'x',
    ix: 0,
  }

  // Variable in environment
  const mockVVarX: VVar = {
    val: 'var',
    id: 'x',
    lvl: 1,
  }

  // Variable type in context
  const mockVUni: VUni = {
    val: 'uni',
  }

  // Function var term
  const mockTVarF: TVar = {
    term: 'var',
    id: 'f',
    ix: 1,
  }

  // Function var term, another
  const mockTVarG: TVar = {
    term: 'var',
    id: 'g',
    ix: 1,
  }

  // Function var value
  const mockVVarF: VVar = {
    val: 'var',
    id: 'f',
    lvl: 0,
  }

  // Argument type
  const mockVType: VUni = {
    val: 'uni',
  }

  // Reference to the nearest variable with name T
  const mockVVarT: TVar = {
    term: 'var',
    id: 'T',
    ix: 0,
  }

  // Function type in context
  const mockVPi: VPi = {
    val: 'pi',
    param: [mockVType],
    paramID: ['T'],
    func: {
      // Pi has no env because its instance `f` is defined first
      env: [],
      body: mockVVarT,
    }
  }

  // f(T = x)
  const mockTApp: TApp = {
    term: 'app',
    argID: ['T'],
    arg: [mockTVarX],
    func: mockTVarF,
  }

  // g(T = x)
  const expectedChangeFunc: TApp = {
    term: 'app',
    argID: ['T'],
    arg: [mockTVarX],
    func: mockTVarG,
  }

  // Expected result
  const expected: VVar = mockVVarX

  // Infer request
  const onChange = jest.fn()
  const mockReq: InferRequest<TApp> = {
    env: [mockVVarX, mockVVarF],
    ctx: [mockVUni, mockVPi],
    ns: ['x', 'f'],
    depth: 0,
    term: mockTApp,
    onChange: onChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of dependent app should be calculated correctly', () => {
    const { val } = inferApp(mockReq)
    expect(val).toStrictEqual(expected)
  })

  test('applying non-function should not typecheck', () => {
    const req = cloneDeep(mockReq)
    // x(T = x)
    req.term.func = mockTVarX
    expect(() => inferApp(req)).toThrow()
  })

  test('applying function with wrong namespace should not typecheck', () => {
    const req = cloneDeep(mockReq)
    // f(114 = x)
    req.term.argID[0] = '114'
    expect(() => inferApp(req)).toThrow()
  })

  test('applying function with wrong value should not typecheck', () => {
    const req = cloneDeep(mockReq)
    // f(T = f)
    req.term.arg[0] = mockTVarF
    expect(() => inferApp(req)).toThrow()
  })

  test('change in function should be reflected if well-typed', () => {
    const req = cloneDeep(mockReq)
    const { debug } = inferApp(req)
    debug.onFuncChange(mkAction({
      action: 'updateVar',
      oldID: 'f',
      oldIX: 1,
      newID: 'g',
      newIX: 1,
    }))
    expect(onChange).toBeCalledTimes(1)
    const action = onChange.mock.lastCall[0]
    runAction(action, req.term)
    expect(req.term).toStrictEqual(expectedChangeFunc)
  })
})

