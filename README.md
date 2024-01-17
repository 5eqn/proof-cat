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
    argIX: [2, 1, 0], 
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
