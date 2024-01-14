import { message } from "antd";
import { DraftFunction } from "use-immer";
import AnyBar from "../component/AnyBar";
import Header from "../component/Header";
import Labeled from "../component/Labeled";
import Named from "../component/Named";
import SelectBar from "../component/SelectBar";
import InputBar from "../component/InputBar";
import { i18n } from "../i18n";
import { TAny, TApp, Term, TFunc, TLet, TNum, TPi, TType, TUni, TVar } from "../model/term";
import { Val, VPi } from "../model/value";
import { Env } from "../model/env";
import { Ctx } from "../model/ctx";
import { apply } from "../model/closure";
import { unify } from "../model/unify";
import { evaluate, quote } from "../model/evaluate";
import { addVar, deleteVar, hasOccurrence } from "../model/action";

/*******
  MODEL
 *******/

// Props of a rendered component
export type CommonProps<T> = {
  value: T,
  level: number,
  onChange: (updater: DraftFunction<T>) => void,
}

// Callback of code actions
export type Callback<T> = (updater: DraftFunction<T>) => void

// Request for infer
export type InferRequest<T> = {
  // Current mapping from de-Bruijn index to value
  env: Env,
  // Current mapping from de-Bruijn index to type value
  ctx: Ctx,
  // Current names
  ns: string[],
  // Depth of rendered component
  depth: number,
  // Term to be inferred
  term: T,
  // Callback of code actions
  onChange: Callback<T>,
}

// Result after inferring the type of a term
export type InferResult = {
  // Inferred type value
  val: Val,
  // Element to be rendered for this inference
  element: JSX.Element
}

/********
  RENDER
 ********/

// Code action: anify
const onAnify = (onChange: Callback<Term>) => {
  onChange(draft => {
    switch (draft.term) {
      case 'app':
        Object.assign(draft, draft.func)
        return
      default:
        draft.term = 'any'
    }
  })
}
// Code action: wrap with let
const onWrapLet = (name: string, onChange: Callback<Term>) => {
  onChange(draft => {
    const copy = { ...draft }
    const tm = draft as TLet
    tm.term = 'let'
    tm.id = name
    tm.body = {
      term: 'any',
    }
    tm.next = copy
    addVar(0, tm.next)
  })
}
// Code action: wrap with func
const onWrapFunc = (onChange: Callback<Term>) => {
  onChange(draft => {
    const copy = { ...draft }
    const tm = draft as TFunc
    tm.term = 'func'
    tm.param = []
    tm.paramID = []
    tm.body = copy
  })
}
// Code action: wrap with pi
const onWrapPi = (onChange: Callback<Term>) => {
  onChange(draft => {
    const copy = { ...draft }
    const tm = (draft as TPi)
    tm.term = 'pi'
    tm.from = []
    tm.fromID = []
    tm.to = copy
  })
}
// Code action: wrap with app
const onWrapApp = (ty: Val, ctx: Ctx, env: Env, onChange: Callback<Term>) => {
  // Make sure the applied term is a function
  if (ty.val !== 'pi') message.error(i18n.err.callNonFunc)
  else {
    const argID = ty.fromID
    // Automatically find variable of same type in context
    const argIX = ty.from.map((v) => ctx.findIndex((t) =>
      unify(env.length, t, v) === null
    ))
    // Make sure variable of given type exists
    for (const ix of argIX) {
      if (ix === -1) {
        message.error(i18n.err.noVariable)
        console.log(ty.from)
        return
      }
    }
    onChange(draft => {
      const copy = { ...draft }
      const tm = draft as TApp
      tm.term = 'app'
      tm.func = copy
      tm.argIX = argIX
      tm.argID = argID
    })
  }
}

const onBecomeU = (onChange: Callback<Term>) => {
  onChange(draft => {
    Object.assign(draft, {
      term: 'uni',
    })
  })
}
const onBecomeType = (type: string, onChange: Callback<Term>) => {
  onChange(draft => {
    Object.assign(draft, {
      term: 'type',
      type,
    })
  })
}
const onBecomeNum = (num: number, onChange: Callback<Term>) => {
  onChange(draft => {
    Object.assign(draft, {
      term: 'num',
      num,
    })
  })
}
const onBecomeVar = (ns: string[], onChange: Callback<Term>) => {
  onChange(draft => {
    if (ns.length === 0) {
      message.error(i18n.err.noVariable)
      return
    }
    Object.assign(draft, {
      term: 'var',
      id: ns[0],
      ix: 0,
    })
  })
}

// Code action: add param
const onPiAdd = (name: string, onChange: Callback<TPi>) => {
  onChange(draft => {
    draft.from = [{ term: 'any' }, ...draft.from]
    draft.fromID = [name, ...draft.fromID]
    addVar(0, draft.to)
  })
}
// Code action: delete param
const onPiDelete = (ix: number, onChange: Callback<TPi>) => {
  onChange(draft => {
    draft.from.splice(ix, 1)
    draft.fromID.splice(ix, 1)
    deleteVar(ix, draft.to)
  })
}
// Code action: add param
const onFuncAdd = (name: string, onChange: Callback<TFunc>) => {
  onChange(draft => {
    draft.param = [{ term: 'any' }, ...draft.param]
    draft.paramID = [name, ...draft.paramID]
    addVar(0, draft.body)
  })
}
// Code action: delete param
const onFuncDelete = (ix: number, onChange: Callback<TFunc>) => {
  onChange(draft => {
    draft.param.splice(ix, 1)
    draft.paramID.splice(ix, 1)
    deleteVar(ix, draft.body)
  })
}

// Make sure variable name don't duplicate in actions
const validate = (name: string, ns: string[]) => {
  const containName = ns.map((n) => name === n).reduce((x, y) => x || y, false)
  return containName ? i18n.err.nameDup : null
}

export function inferUni({
  env, ctx, ns, depth, onChange
}: InferRequest<TUni>): InferResult {
  // U has type U
  const val: Val = {
    val: 'uni',
  }
  return {
    val,
    element: <Header
      depth={depth}
      label={i18n.term.uni}
      validate={(name) => validate(name, ns)}
      onDelete={() => onAnify(onChange)}
      onWrapLet={(name) => onWrapLet(name, onChange)}
      onWrapPi={() => onWrapPi(onChange)}
      onWrapApp={() => onWrapApp(val, env, ctx, onChange)}
      onWrapFunc={() => onWrapFunc(onChange)}
    />
  }
}

export function inferVar({
  env, ctx, ns, depth, term, onChange
}: InferRequest<TVar>): InferResult {
  // Infer type for variable
  const val = ctx[term.ix]
  return {
    val: val,
    element: <div>
      <Header
        depth={depth}
        label={i18n.term.var}
        validate={(name) => validate(name, ns)}
        onDelete={() => onAnify(onChange)}
        onWrapLet={(name) => onWrapLet(name, onChange)}
        onWrapPi={() => onWrapPi(onChange)}
        onWrapApp={() => onWrapApp(val, env, ctx, onChange)}
        onWrapFunc={() => onWrapFunc(onChange)}
      />
      <SelectBar
        label={i18n.term.val}
        depth={depth}
        data={ns}
        index={term.ix}
        onChange={(i2) => {
          onChange(draft => {
            // Incrementally update variable index and name
            draft.ix = i2
            draft.id = ns[i2]
          })
        }}
      />
    </div>
  }
}

export function inferNum({
  env, ctx, ns, depth, term, onChange
}: InferRequest<TNum>): InferResult {
  // All numbers have type number
  const val: Val = {
    val: 'type',
    type: 'number',
  }
  // Concatenate
  return {
    val: val,
    element: <div>
      <Header
        depth={depth}
        label={i18n.term.num}
        validate={(name) => validate(name, ns)}
        onDelete={() => onAnify(onChange)}
        onWrapLet={(name) => onWrapLet(name, onChange)}
        onWrapPi={() => onWrapPi(onChange)}
        onWrapApp={() => onWrapApp(val, env, ctx, onChange)}
        onWrapFunc={() => onWrapFunc(onChange)}
      />
      <InputBar
        depth={depth}
        label={i18n.term.val}
        value={term.num.toString()}
        onChange={(value) => {
          onChange(draft => {
            (draft as TNum).num = +value
          })
        }}
      />
    </div>
  }
}

export function inferLet({
  env, ctx, ns, depth, term, onChange
}: InferRequest<TLet>): InferResult {
  const { val: letBodyVal, element: letBodyElement } = infer({
    env: env,
    ctx: ctx,
    ns: ns,
    depth: depth + 1,
    term: term.body,
    onChange: (updater) => {
      onChange(draft => { updater((draft as TLet).body) })
    }
  })
  const { val: letNextVal, element: letNextElement } = infer({
    env: [evaluate(env, term.body), ...env],
    ctx: [letBodyVal, ...ctx],
    ns: [term.id, ...ns],
    depth,
    term: term.next,
    onChange: (updater) => {
      onChange(draft => { updater((draft as TLet).next) })
    }
  })
  // Code action: delete let if not referred
  const onLetDelete = () => {
    if (hasOccurrence(env.length + 1, 0, term.next))
      message.error(i18n.err.referred)
    else {
      onChange(draft => {
        const tm = draft as TLet
        deleteVar(0, tm.next)
        Object.assign(draft, tm.next)
      })
    }
  }
  // Concatenate
  return {
    val: letNextVal,
    element: <div>
      <Named
        depth={depth}
        name={term.id}
        onDelete={onLetDelete}
      >
        {letBodyElement}
      </Named>
      {letNextElement}
    </div>
  }
}

export function inferApp({
  env, ctx, ns, depth, term, onChange
}: InferRequest<TApp>): InferResult {
  // Get type from function's Pi type's destination type
  const { val: appFuncVal, element: appFuncElement } = infer({
    env, ctx, ns,
    depth: depth + 1,
    term: term.func,
    onChange: (_) => {
      // Applied term should not change
      message.error(i18n.err.changeApply)
    }
  })
  const argVals = term.argIX.map((ix, i) => evaluate(env, {
    term: 'var',
    id: term.argID[i],
    ix: ix
  }))
  const appFuncPi = appFuncVal as VPi
  const val = apply(appFuncPi.to, argVals)

  // Generate argument elements
  const argElements = term.argIX.map((globalIX, argIX) => {
    // Filter variable of correct type
    const selection = ns
      .map<[string, number]>((n, globalIX) => [n, globalIX])
      .filter(([_, globalIX]) =>
        unify(ns.length, ctx[globalIX], appFuncPi.from[argIX]) === null)
    // Invert selection
    let invSel = new Array(ns.length)
    selection.forEach(([_, globalIX], localIX) => {
      invSel[globalIX] = localIX
    })
    // Construct elements
    return <Named
      key={appFuncPi.fromID[argIX]}
      depth={depth + 1}
      name={appFuncPi.fromID[argIX]}
    >
      <SelectBar
        depth={depth + 1}
        label={i18n.term.val}
        data={selection.map(([n, _]) => n)}
        index={invSel[globalIX]}
        onChange={(localIX) => {
          onChange(draft => {
            // Incrementally update argument index and name
            draft.argIX[argIX] = selection[localIX][1]
            draft.argID[argIX] = selection[localIX][0]
          })
        }}
      />
    </Named>
  })
  // Concatenate
  return {
    val: val,
    element: <div>
      <Header
        depth={depth}
        label={i18n.term.apply}
        validate={(name) => validate(name, ns)}
        onDelete={() => onAnify(onChange)}
        onWrapLet={(name) => onWrapLet(name, onChange)}
        onWrapPi={() => onWrapPi(onChange)}
        onWrapApp={() => onWrapApp(val, env, ctx, onChange)}
        onWrapFunc={() => onWrapFunc(onChange)}
      />
      {argElements}
      <Labeled
        depth={depth}
        label={i18n.term.target}
        children={appFuncElement}
      />
    </div>,
  }
}

export function inferAny({
  ns, depth, onChange
}: InferRequest<TAny>): InferResult {
  // Any term has type any
  const val: Val = {
    val: 'any',
  }
  return {
    val: val,
    element: <AnyBar
      depth={depth}
      validate={(name) => validate(name, ns)}
      onWrapLet={(name) => onWrapLet(name, onChange)}
      onWrapPi={() => onWrapPi(onChange)}
      onWrapFunc={() => onWrapFunc(onChange)}
      onBecomeVar={() => onBecomeVar(ns, onChange)}
      onBecomeU={() => onBecomeU(onChange)}
      onBecomeType={(name) => onBecomeType(name, onChange)}
      onBecomeNum={(num) => onBecomeNum(num, onChange)}
    />
  }
}

export function inferType({
  env, ctx, ns, depth, term, onChange
}: InferRequest<TType>): InferResult {
  // All types have type U
  const val: Val = {
    val: 'uni',
  }
  // Concatenate
  return {
    val: val,
    element: <div>
      <Header
        depth={depth}
        label={i18n.term.type}
        validate={(name) => validate(name, ns)}
        onDelete={() => onAnify(onChange)}
        onWrapLet={(name) => onWrapLet(name, onChange)}
        onWrapPi={() => onWrapPi(onChange)}
        onWrapApp={() => onWrapApp(val, env, ctx, onChange)}
        onWrapFunc={() => onWrapFunc(onChange)}
      />
      <InputBar
        label={i18n.term.val}
        depth={depth}
        value={term.type}
        onChange={(value) => {
          onChange(draft => {
            draft.type = value
          })
        }}
      />
    </div>
  }
}

export function inferPi({
  env, ctx, ns, depth, term, onChange
}: InferRequest<TPi>): InferResult {
  // Construct element for to type
  const piLen = term.fromID.length + env.length
  const piVars = term.fromID.map<Val>((id, ix) => ({
    val: 'var',
    id,
    lvl: piLen - ix - 1,
  }))
  const piTypes = term.from.map((t) => evaluate(env, t))
  const { element: toElement } = infer({
    env: [...piVars, ...env],
    ctx: [...piTypes, ...ctx],
    ns: [...term.fromID, ...ns],
    depth: depth + 1,
    term: term.to,
    onChange: (updater) => {
      onChange(draft => { updater((draft as TPi).to) })
    },
  })
  // Construct element for from types
  const fromInfers = term.from.map((t, i) => infer({
    env, ctx, ns,
    depth: depth + 1,
    term: t,
    onChange: (updater) => {
      if (hasOccurrence(piLen, i, term.to)) message.error(i18n.err.referred)
      else onChange(draft => { updater((draft as TPi).from[i]) })
    },
  }))
  const fromElements = fromInfers.map(({ element }, i) =>
    <Named
      key={term.fromID[i]}
      name={term.fromID[i]}
      depth={depth + 1}
      children={element}
      onDelete={() => {
        if (hasOccurrence(piLen, i, term.to)) message.error(i18n.err.referred)
        else onPiDelete(i, onChange)
      }}
    />)
  // Construct type for pi, which is always U
  const val: Val = {
    val: 'uni',
  }
  // Concatenate
  return {
    val: val,
    element: <div>
      <Header
        depth={depth}
        label={i18n.term.pi}
        validate={(name) => validate(name, ns)}
        onDelete={() => onAnify(onChange)}
        onWrapLet={(name) => onWrapLet(name, onChange)}
        onWrapPi={() => onWrapPi(onChange)}
        onWrapApp={() => onWrapApp(val, env, ctx, onChange)}
        onWrapFunc={() => onWrapFunc(onChange)}
        onAdd={(name) => onPiAdd(name, onChange)}
      />
      {fromElements}
      <Labeled
        depth={depth}
        label={i18n.term.to}
        children={toElement}
      />
    </div>,
  }
}

export function inferFunc({
  env, ctx, ns, depth, term, onChange
}: InferRequest<TFunc>): InferResult {
  // Construct element for function body
  const funcLen = term.paramID.length + env.length
  const funcVars = term.paramID.map<Val>((id, ix) => ({
    val: 'var',
    id,
    // Params should take up upper region of level
    lvl: funcLen - ix - 1,
  }))
  const funcTypes = term.param.map((t) => evaluate(env, t))
  const { val: bodyVal, element: bodyElement } = infer({
    env: [...funcVars, ...env],
    ctx: [...funcTypes, ...ctx],
    ns: [...term.paramID, ...ns],
    depth: depth + 1,
    term: term.body,
    onChange: (updater) => {
      onChange(draft => { updater((draft as TFunc).body) })
    },
  })
  // Construct element for params
  const paramInfers = term.param.map((t, i) => infer({
    env, ctx, ns,
    depth: depth + 1,
    term: t,
    onChange: (updater) => {
      if (hasOccurrence(funcLen, i, term.body)) message.error(i18n.err.referred)
      else onChange(draft => { updater((draft as TFunc).param[i]) })
    },
  }))
  const paramElements = paramInfers.map(({ element }, i) =>
    <Named
      key={term.paramID[i]}
      name={term.paramID[i]}
      depth={depth + 1}
      children={element}
      onDelete={() => onFuncDelete(i, onChange)}
    />)
  const paramVals = term.param.map((t) => evaluate(env, t))
  // Construct type for func, which is Pi
  const val: Val = {
    val: 'pi',
    from: paramVals,
    fromID: term.paramID,
    to: {
      env,
      body: quote(funcLen, bodyVal),
    }
  }
  // Concatenate
  return {
    val: val,
    element: <div>
      <Header
        depth={depth}
        label={i18n.term.func}
        validate={(name) => validate(name, ns)}
        onDelete={() => onAnify(onChange)}
        onWrapLet={(name) => onWrapLet(name, onChange)}
        onWrapPi={() => onWrapPi(onChange)}
        onWrapApp={() => onWrapApp(val, env, ctx, onChange)}
        onWrapFunc={() => onWrapFunc(onChange)}
        onAdd={(name) => onFuncAdd(name, onChange)}
      />
      {paramElements}
      <Labeled
        depth={depth}
        label={i18n.term.body}
        children={bodyElement}
      />
    </div>,
  }
}

export function infer(req: InferRequest<Term>): InferResult {
  switch (req.term.term) {
    case 'uni':
      return inferUni(req as any)
    case 'var':
      return inferVar(req as any)
    case 'num':
      return inferNum(req as any)
    case 'let':
      return inferLet(req as any)
    case 'app':
      return inferApp(req as any)
    case 'any':
      return inferAny(req as any)
    case 'type':
      return inferType(req as any)
    case 'pi':
      return inferPi(req as any)
    case 'func':
      return inferFunc(req as any)
  }
}
