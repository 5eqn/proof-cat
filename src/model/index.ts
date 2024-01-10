// Atom type variable, `number`
export type CUType = {
  ast: 'type',
  type: string,
}

// Atom variable, `x`
export type CUVar = {
  ast: 'var'
  id: string
}

// Function intro, `\x => y`
export type CUFun = {
  ast: 'fun'
  param: Record<string, CUVal>
  body: CUVal
}

// Function elim, `f(x)`
export type CUApp = {
  ast: 'app'
  fun: CUVal
  arg: Record<string, CUVal>
}

// Editable number
export type CUNum = {
  ast: 'num',
  num: number,
}

// All possible values
export type CUVal = CUVar | CUFun | CUApp | CUType | CUNum

// Mapping from id to type
export type CUCtx = Record<string, CUVal>

// Mapping from id to value
export type CUEnv = Record<string, CUVal>

// Props of a rendered component
export type CUProps = {
  ctx: CUCtx,
  env: CUEnv,
  value: CUVal,
  onChange: (value: CUVal) => void,
}

// Evaluate a CU value
export function evaluate(ctx: CUCtx, env: CUEnv, val: CUVal): any {
  switch (val.ast) {
    case 'app': return evaluate(ctx, { ...env, ...val.arg }, val.fun)
    case 'fun': return evaluate({ ...ctx, ...val.param }, env, val.body)
    case 'var': return env[val.id]
    case 'num': return val.num
    case 'type': return val.type
  }
}

// Sample composition
export const sample: CUApp = {
  ast: 'app',
  fun: {
    ast: 'fun',
    param: {
      x: {
        ast: 'type',
        type: 'number',
      },
      y: {
        ast: 'type',
        type: 'number',
      },
    },
    body: {
      ast: 'var',
      id: 'x',
    },
  },
  arg: {
    x: {
      ast: 'var',
      id: 'vx',
    },
    y: {
      ast: 'var',
      id: 'vy',
    },
  }
}
