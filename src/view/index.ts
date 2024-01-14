import { message } from "antd";
import { DraftFunction } from "use-immer";
import { i18n } from "../i18n";
import { TAny, TApp, Term, TFunc, TLet, TNum, TPi, TType, TUni, TVar } from "../model/term";
import { Val, VPi } from "../model/value";
import { Env } from "../model/env";
import { Ctx } from "../model/ctx";
import { apply } from "../model/closure";
import { unify } from "../model/unify";
import { evaluate, quote } from "../model/evaluate";
import { addVar, deleteVar, hasOccurrence } from "../model/action";
import { TermUni } from "./TermUni";
import { TermVar } from "./TermVar";
import { TermNum } from "./TermNum";
import { TermLet } from "./TermLet";
import { TermArg } from "./TermArg";
import { TermApp } from "./TermApp";
import { TermAny } from "./TermAny";
import { TermType } from "./TermType";
import { TermParam } from "./TermParam";
import { TermFunc } from "./TermFunc";
import { TermFrom } from "./TermFrom";
import { TermPi } from "./TermPi";

/*******
  MODEL
 *******/

// Props of a rendered component
export interface TermPropsBase<T> {
  req: InferRequest<T>
  type: Val,
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
export const onAnify = (onChange: Callback<Term>) => {
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
export const onWrapLet = (name: string, onChange: Callback<Term>) => {
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
export const onWrapFunc = (onChange: Callback<Term>) => {
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
export const onWrapPi = (onChange: Callback<Term>) => {
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
export const onWrapApp = (ty: Val, ctx: Ctx, env: Env, onChange: Callback<Term>) => {
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

export const onBecomeU = (onChange: Callback<Term>) => {
  onChange(draft => {
    Object.assign(draft, {
      term: 'uni',
    })
  })
}
export const onBecomeType = (type: string, onChange: Callback<Term>) => {
  onChange(draft => {
    Object.assign(draft, {
      term: 'type',
      type,
    })
  })
}
export const onBecomeNum = (num: number, onChange: Callback<Term>) => {
  onChange(draft => {
    Object.assign(draft, {
      term: 'num',
      num,
    })
  })
}
export const onBecomeVar = (ns: string[], onChange: Callback<Term>) => {
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
export const onVarUpdate = (
  newIX: number,
  ns: string[],
  onChange: Callback<TVar>
) => {
  onChange(draft => {
    // Incrementally update variable index and name
    draft.ix = newIX
    draft.id = ns[newIX]
  })
}

export const onNumUpdate = (
  num: number,
  onChange: Callback<TNum>
) => {
  onChange(draft => {
    draft.num = num
  })
}

// Code action: add param
export const onPiAdd = (name: string, onChange: Callback<TPi>) => {
  onChange(draft => {
    draft.from = [{ term: 'any' }, ...draft.from]
    draft.fromID = [name, ...draft.fromID]
    addVar(0, draft.to)
  })
}
// Code action: delete param
export const onPiDelete = (
  ix: number,
  len: number,
  term: Term,
  onChange: Callback<TPi>
) => {
  if (hasOccurrence(len, ix, term))
    message.error(i18n.err.referred)
  else {
    onChange(draft => {
      draft.from.splice(ix, 1)
      draft.fromID.splice(ix, 1)
      deleteVar(ix, draft.to)
    })
  }
}
// Code action: add param
export const onFuncAdd = (name: string, onChange: Callback<TFunc>) => {
  onChange(draft => {
    draft.param = [{ term: 'any' }, ...draft.param]
    draft.paramID = [name, ...draft.paramID]
    addVar(0, draft.body)
  })
}
// Code action: delete param
export const onFuncDelete = (
  ix: number,
  len: number,
  term: Term,
  onChange: Callback<TFunc>
) => {
  if (hasOccurrence(len, ix, term))
    message.error(i18n.err.referred)
  else {
    onChange(draft => {
      draft.param.splice(ix, 1)
      draft.paramID.splice(ix, 1)
      deleteVar(ix, draft.body)
    })
  }
}
// Code action: delete let if not referred
export const onLetDelete = (env: Env, term: Term, onChange: Callback<TLet>) => {
  if (hasOccurrence(env.length + 1, 0, term))
    message.error(i18n.err.referred)
  else {
    onChange(draft => {
      deleteVar(0, draft.next)
      Object.assign(draft, draft.next)
    })
  }
}

// Make sure variable name don't duplicate in actions
export const validate = (name: string, ns: string[]) => {
  const containName = ns.map((n) => name === n).reduce((x, y) => x || y, false)
  return containName ? i18n.err.nameDup : null
}

export function inferUni(req: InferRequest<TUni>): InferResult {
  // U has type U
  const val: Val = {
    val: 'uni',
  }
  return {
    val,
    element: TermUni({ req, type: val })
  }
}

export function inferVar(req: InferRequest<TVar>): InferResult {
  // Infer type for variable
  const { ctx, term } = req
  const val = ctx[term.ix]
  return {
    val: val,
    element: TermVar({
      req,
      type: val,
    })
  }
}

export function inferNum(req: InferRequest<TNum>): InferResult {
  // All numbers have type number
  const val: Val = {
    val: 'type',
    type: 'number',
  }
  return {
    val: val,
    element: TermNum({
      req,
      type: val,
    })
  }
}

export function inferLet(req: InferRequest<TLet>): InferResult {
  const { env, ctx, ns, depth, term, onChange } = req
  const { val: bodyVal, element: bodyElement } = infer({
    env: env,
    ctx: ctx,
    ns: ns,
    depth: depth + 1,
    term: term.body,
    onChange: (updater) => {
      onChange(draft => { updater((draft as TLet).body) })
    }
  })
  const { val: nextVal, element: nextElement } = infer({
    env: [evaluate(env, term.body), ...env],
    ctx: [bodyVal, ...ctx],
    ns: [term.id, ...ns],
    depth,
    term: term.next,
    onChange: (updater) => {
      onChange(draft => { updater((draft as TLet).next) })
    }
  })
  return {
    val: nextVal,
    element: TermLet({
      req,
      type: nextVal,
      body: bodyElement,
      next: nextElement,
    })
  }
}

export function inferApp(req: InferRequest<TApp>): InferResult {
  // Get type from function's Pi type's destination type
  const { env, ctx, ns, depth, term } = req
  const { val: appFuncVal, element: funcElement } = infer({
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
  const argElements = term.argIX.map((globalIX, argIX) => TermArg({
    req, globalIX, argIX,
    type: appFuncPi.from[argIX],
    paramID: appFuncPi.fromID[argIX],
  }))
  return {
    val: val,
    element: TermApp({
      req,
      type: val,
      args: argElements,
      func: funcElement,
    }),
  }
}

export function inferAny(req: InferRequest<TAny>): InferResult {
  // Any term has type any
  const val: Val = {
    val: 'any',
  }
  return {
    val: val,
    element: TermAny({
      req,
      type: val,
    })
  }
}

export function inferType(req: InferRequest<TType>): InferResult {
  // All types have type U
  const val: Val = {
    val: 'uni',
  }
  return {
    val: val,
    element: TermType({
      req,
      type: val,
    })
  }
}

export function inferPi(req: InferRequest<TPi>): InferResult {
  // Construct element for to type
  const { env, ctx, ns, depth, term, onChange } = req
  const len = term.fromID.length + env.length
  const piVars = term.fromID.map<Val>((id, ix) => ({
    val: 'var',
    id,
    lvl: len - ix - 1,
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
      if (hasOccurrence(len, i, term.to)) message.error(i18n.err.referred)
      else onChange(draft => { updater((draft as TPi).from[i]) })
    },
  }))
  const fromElements = fromInfers.map(({ element }, i) => TermFrom({
    req,
    fromID: term.fromID[i],
    fromIX: i,
    from: element,
    len,
    to: term.to,
  }))
  // Construct type for pi, which is always U
  const val: Val = {
    val: 'uni',
  }
  // Concatenate
  return {
    val: val,
    element: TermPi({
      req,
      type: val,
      froms: fromElements,
      to: toElement,
    }),
  }
}

export function inferFunc(req: InferRequest<TFunc>): InferResult {
  // Construct element for function body
  const { env, ctx, ns, depth, term, onChange } = req
  const len = term.paramID.length + env.length
  const funcVars = term.paramID.map<Val>((id, ix) => ({
    val: 'var',
    id,
    // Params should take up upper region of level
    lvl: len - ix - 1,
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
      if (hasOccurrence(len, i, term.body)) message.error(i18n.err.referred)
      else onChange(draft => { updater((draft as TFunc).param[i]) })
    },
  }))
  const paramElements = paramInfers.map(({ element }, i) => TermParam({
    req,
    paramID: term.paramID[i],
    paramIX: i,
    param: element,
    len,
    body: term.body,
  }))
  const paramVals = term.param.map((t) => evaluate(env, t))
  // Construct type for func, which is Pi
  const val: Val = {
    val: 'pi',
    from: paramVals,
    fromID: term.paramID,
    to: {
      env,
      body: quote(len, bodyVal),
    }
  }
  // Concatenate
  return {
    val: val,
    element: TermFunc({
      req,
      type: val,
      params: paramElements,
      body: bodyElement,
    }),
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
