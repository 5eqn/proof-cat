import cloneDeep from "lodash.clonedeep"
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

  // Expected result
  const expected: VVar = mockVVarX

  // Infer request
  const mockReq: InferRequest<TApp> = {
    env: [mockVVarX, mockVVarF],
    ctx: [mockVUni, mockVPi],
    ns: ['x', 'f'],
    tm: mockTApp,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of dependent app should be calculated correctly', () => {
    const { type: val } = inferApp(mockReq)
    expect(val).toStrictEqual(expected)
  })

  test('applying non-function should not typecheck', () => {
    const req = cloneDeep(mockReq)
    // x(T = x)
    req.tm.func = mockTVarX
    expect(() => inferApp(req)).toThrow()
  })

  test('applying function with wrong namespace should not typecheck', () => {
    const req = cloneDeep(mockReq)
    // f(114 = x)
    req.tm.argID[0] = '114'
    expect(() => inferApp(req)).toThrow()
  })

  test('applying function with wrong value should not typecheck', () => {
    const req = cloneDeep(mockReq)
    // f(T = f)
    req.tm.arg[0] = mockTVarF
    expect(() => inferApp(req)).toThrow()
  })
})

