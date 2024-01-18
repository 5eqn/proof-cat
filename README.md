## CuCl2

Visually manipulate the Abstract Syntax Tree of a dependently-typed language with code actions, and display evaluation or type inference results on screen!

### Weird test case

```typescript
  // U
  const typeU: TUni = {
    term: 'uni',
  }

  // A
  const typeA: TType = {
    term: 'type',
    type: 'A',
  }

  // B
  const typeB: TType = {
    term: 'type',
    type: 'B',
  }

  // number
  const typeNum: TType = {
    term: 'type',
    type: 'number',
  }
  
  // (a: A, b: B, c: number) -> U
  const typeF: TPi = {
    term: 'pi',
    param: [typeA, typeB, typeNum],
    paramID: ['a', 'b', 'c'],
    body: typeU,
  }

  // 1
  const one: TNum = {
    term: 'num',
    num: 1,
  }

  // f
  const varF: TVar = {
    term: 'var',
    id: 'f',
    ix: 3,
  }

  // f(a, b, c)
  const innerApp: TApp = {
    term: 'app',
    argID: ['a', 'b', 'c'],
    arg: [2, 1, 0], 
    func: varF,
  }

  // let c = 1 in f(a, b, c)
  const innerLet: TLet = {
    term: 'let',
    id: 'c',
    body: one,
    next: innerApp,
  }

  // (b: B, a: A) => let c = 1 in f(a, b, c)
  const innerF: TFunc = {
    term: 'func',
    param: [typeB, typeA],
    paramID: ['b', 'a'],
    body: innerLet,
  }

  // (f: (a: A, b: B, c: number) -> U) => (b: B, a: A) => let c = 1 in f(a, b, c)
  const term: TFunc = {
    term: 'func',
    param: [typeF],
    paramID: ['f'],
    body: innerF,
  }
```

```typescript
  // context: T = number
  const env: Env = [
    {
      val: 'type',
      type: 'number',
    },
  ]
  const ctx: Ctx = [
    {
      val: 'uni',
    }
  ]
  const ns: string[] = ['T']

  // let a = 1 in ((T: U) => (x: T) => x)(T = T)(x = a)
  const before: TLet = {
    // let a = 1
    term: 'let',
    id: 'a',
    body: {
      term: 'num',
      num: 1,
    },
    next: {
      term: 'app',
      // x = a
      argID: ['x'],
      arg: [0],
      func: {
        term: 'app',
        // T = number
        argID: ['T'],
        arg: [1],
        func: {
          // T: U
          term: 'func',
          paramID: ['T'],
          param: [
            {
              term: 'uni',
            }
          ],
          body: {
            // x: T
            term: 'func',
            paramID: ['x'],
            param: [
              {
                term: 'var',
                id: 'T',
                ix: 0,
              }
            ],
            body: {
              // x
              term: 'var',
              id: 'x',
              ix: 0,
            }
          }
        }
      }
    }
  }
```

Old Infer App Test

```typescript
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

  // f(T = x)(T = x)
  const mockTAppBad: TApp = {
    term: 'app',
    argID: ['T'],
    arg: [mockTVarX],
    func: mockTApp,
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

  // Bad Infer request
  const mockReqBad: InferRequest<TApp> = {
    env: [mockVVarX, mockVVarF],
    ctx: [mockVUni, mockVPi],
    ns: ['x', 'f'],
    depth: 0,
    term: mockTAppBad,
    onChange: onChange,
  }
```

Old Infer App

```typescript
import { InferRequest, InferResult, getElements, getDebugs } from "../model/infer";
import { TApp, Term } from "../model/term";
import { evaluate } from "../evaluate";
import { Val, VPi } from "../model/value";
import { apply } from "../model/closure";
import { TermApp } from "../../view/TermApp";

import { infer } from "./index";
import { ErrorChangeApply } from "../model/error";
import { inferArg } from "./arg";

export function inferApp(req: InferRequest<TApp>): InferResult {
  // Get function type
  const { env, ctx, ns, depth, term }: InferRequest<TApp> = req
  const onFuncChange = () => {
    throw new ErrorChangeApply()
  }
  const { val: funcVal, element: funcElement }: InferResult = infer({
    env, ctx, ns,
    depth: depth + 1,
    term: term.func,
    onChange: onFuncChange
  })
  const funcType: VPi = funcVal as VPi
  // Make sure function's type is Pi
  // if (funcType.val !== 'pi') {
  //   throw new ErrorCallNonFunc(funcType)
  // }
  // Make sure application length match
  // if (term.arg.length !== funcType.param.length) {
  //   throw new 
  // }
  // Infer argument types
  const argInfers = inferArg(req)
  // Make sure application namespace match
  // Make sure argument's type match
  // Apply arguments to function type to get applied type
  const argVals: Val[] = term.arg.map((v: Term) => evaluate(env, v))
  const val: Val = apply(funcType.func, argVals)
  return {
    val: val,
    element: TermApp({
      req,
      type: val,
      args: getElements(argInfers),
      func: funcElement,
    }),
    debug: {
      onFuncChange,
      onArgChange: getDebugs(argInfers),
    }
  }
}
```
