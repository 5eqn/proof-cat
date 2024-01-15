## CuCl2

## Code Actions

I hope this is a way to conveniently create all possible terms.

### Construct values

```
target: (x: int) => (f: (p: (q: int) -> int) -> int) => f((_: int) => x)

init  | *
intro | (x: int) => *
intro | (x: int) => (f: (p: (q: int) -> int) -> int) => *
let   | (x: int) => (f: (p: (q: int) -> int) -> int) => let p = (q: int) => x
apply | (x: int) => (f: (p: (q: int) -> int) -> int) => f(p = p)
```

- `init`: anything starts with a `*` with no type constraints
- `intro`: convert a `*` with no type constraints to `param => *`
  - `body` can only refer to `param` without `*`
  - if a `param` is referred to, it can no longer be changed
- `let`: create a new `*` with no type constraints in context
- `apply`: apply variables of given type in context to a function
  - both `func` and `arg` should be directly in context, this is for typecheck
- `var`, `num`: directly introduce a variable

### Construct types

```
target: (a: A) -> (b: B(a)) -> B(a)

init  | *
intrp | (a: A) -> *
intrp | (a: A) -> (b: B(a)) -> *
apply | (a: A) -> (b: B(a)) -> B(a)
```

- `intrp`: like `intro`, but for Pi types
- `type`: directly introduce a type
- `uno`: directly introduce `U`
  - even if something isn't instance of `U`, it can still be a type, for simplicity

### Regret

- `prune`: `eval` and then `quote` term
- `elab`: make variable name longer (?)
- `void`: make a term `any`

## Examples

### Counter

```
apply | column(main = even+2, cross = center, children = <[Widget]>)
let   | children = [<Widget>]
let   | title = text(size = <number>, text = <string>)
let   | size = 24
let   | text = "Counter"
bind  | title = text(size = text, text = size)
let   | row = row(main = default, cross = center, children = <[Widget]>)
let   | sub = button(text = <string>, onPress = <Updater(Count)>)
let   | text = "-"
let   | onPress = updater(f = <(c: Count) -> Count>)
let   | f = (c: Count) => count(num: <number>)
let   | num = num(c)
bind  | f = (c: Count) => count(num: num)
bind  | onPress = updater(f = f)
bind  | sub = button(text = text, onPress = onPress)
...
```
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
