import cloneDeep from 'lodash.clonedeep'
import { runAction } from '../action'
import { mkAction } from '../model/action'
import { Ctx } from '../model/ctx'
import { Env } from '../model/env'
import { InferRequest } from "../model/infer"
import { TAny, TApp, TNum, TType, TVar } from "../model/term"
import { VPi, VVar } from '../model/value'
import { inferApp } from "./app"

describe('inferArg apption', () => {
  // Most recent var term
  const mockTVar: TVar = {
    term: 'var',
    id: 'f',
    ix: 0,
  }

  // Var value: f
  const mockVVar: VVar = {
    val: 'var',
    id: 'f',
    lvl: 0,
  }

  // Env
  const env: Env = [mockVVar]
  const ns: string[] = ['f']

  // Var type: (a: number, T: U) -> number
  const mockVPi: VPi = {
    val: 'pi',
    param: [
      {
        val: 'type',
        type: 'number',
      },
      {
        val: 'uni',
      },
    ],
    paramID: ['a', 'T'],
    func: {
      env,
      body: {
        term: 'type',
        type: 'number',
      }
    }
  }

  const ctx: Ctx = [mockVPi]

  // Type A term
  const mockTType: TType = {
    term: 'type',
    type: 'A',
  }

  // Num term
  const mockTNum: TNum = {
    term: 'num',
    num: 113,
  }

  // Application term
  const mockTApp: TApp = {
    term: 'app',
    arg: [mockTNum, mockTType],
    argID: ['a', 'T'],
    func: mockTVar,
  }

  // Any term
  const mockTAny: TAny = {
    term: 'any',
  }

  // Expected term after deletion
  const expectedDeleteArg: TApp = {
    term: 'app',
    arg: [mockTNum, mockTAny],
    argID: ['a', 'T'],
    func: mockTVar,
  }

  // Infer request
  const onChange = jest.fn()
  const mockReq: InferRequest<TApp> = {
    env,
    ctx,
    ns,
    depth: 0,
    term: mockTApp,
    onChange: onChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('change in arg should be reflected', () => {
    const req = cloneDeep(mockReq)
    const { debug } = inferApp(req)
    debug.onArgChange[1](mkAction({
      action: 'remove',
    } as any))
    expect(onChange).toBeCalledTimes(1)
    const action = onChange.mock.lastCall[0]
    runAction(action, req.term)
    expect(req.term).toStrictEqual(expectedDeleteArg)
  })
})

