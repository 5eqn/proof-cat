import { message } from "antd";
import { DraftFunction } from "use-immer";
import Header from "../component/Header";
import Labeled from "../component/Labeled";
import Named from "../component/Named";
import { i18n } from "../i18n";
import { Ctx, deleteVar, Env, evaluate, hasOccurrence, TApp, Term, TFunc, TLet, TPi, Val } from "../model";

/*******
  MODEL
 *******/

// Props of a rendered component
export type CommonProps<T> = {
  value: T,
  level: number,
  onChange: (updater: DraftFunction<T>) => void,
}

// Request for infer
export type InferRequest = {
  // Current mapping from de-Bruijn index to value
  env: Env,
  // Current mapping from de-Bruijn index to type value
  ctx: Ctx,
  // Current names
  ns: string[],
  // Depth of rendered component
  depth: number,
  // Term to be inferred
  term: Term,
  // Callback of code actions
  onChange: (updater: DraftFunction<Term>) => void,
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

export function infer({
  env, ctx, ns, depth, term, onChange
}: InferRequest): InferResult {
  // Code action: anify
  const onAnify = () => {
    onChange(draft => {
      draft.term = 'any'
    })
  }
  // Code action: wrap with let
  const onWrapLet = (name: string) => {
    onChange(draft => {
      const copy = { ...draft }
      const tm = (draft as TLet)
      tm.term = 'let'
      tm.id = name
      tm.body = {
        term: 'any',
      }
      tm.next = copy
    })
  }
  // Code action: wrap with func
  const onWrapFunc = () => {
    onChange(draft => {
      const copy = { ...draft }
      const tm = (draft as TFunc)
      tm.term = 'func'
      tm.param = []
      tm.paramID = []
      tm.body = copy
    })
  }
  // Code action: wrap with pi
  const onWrapPi = () => {
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
  const onWrapApp = (ty: Val) => () => {
    if (ty.val !== 'pi') message.error(i18n.err.callNonFunc)
    else {
      const argID = ty.fromID
      // Automatically find variable of same type in context
      const argIX = ty.from.map((v) => ctx.findIndex((t) => t === v))
      onChange(draft => {
        const copy = { ...draft }
        const tm = (draft as TApp)
        tm.term = 'app'
        tm.func = copy
        tm.argIX = argIX
        tm.argID = argID
      })
    }
  }
  // Make sure variable name don't duplicate in actions
  const validate = (name: string) => {
    const containName = ns.map((n) => name === n).reduce((x, y) => x || y)
    return containName ? i18n.err.nameDup : null
  }
  switch (term.term) {
    case 'pi':
      // Construct element for to type
      const piLen = term.fromID.length + env.length
      const piVars = term.fromID.map<Val>((id) => ({
        val: 'var',
        id,
        lvl: env.length,
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
      // Code action: add param
      const onPiAdd = (name: string) => {
        onChange(draft => {
          const tm = draft as TPi
          tm.from.push({ term: 'any' })
          tm.fromID.push(name)
        })
      }
      // Code action: delete param
      const onPiDelete = (ix: number) => {
        onChange(draft => {
          const tm = draft as TPi
          tm.from.splice(ix, 1)
          tm.fromID.splice(ix, 1)
          deleteVar(piLen, ix, tm.to)
        })
      }
      // Construct element for from types
      const fromInfers = term.from.map((t, i) => infer({
        env, ctx, ns,
        depth: depth + 2,
        term: t,
        onChange: (updater) => {
          if (hasOccurrence(piLen, i, term.to)) message.error(i18n.err.referred)
          else onChange(draft => { updater((draft as TPi).from[i]) })
        },
      }))
      const fromElements = fromInfers.map(({ element }, i) =>
        <Named
          name={term.fromID[i]}
          depth={depth + 1}
          children={element}
          onDelete={() => onPiDelete(i)}
        />)
      // Construct type for pi, which is always U
      const piVal: Val = {
        val: 'uni',
      }
      // Concatenate
      return {
        val: piVal,
        element: <div>
          <Header
            depth={depth}
            label={i18n.term.pi}
            validate={validate}
            onAdd={onPiAdd}
            onDelete={onAnify}
            onWrapLet={onWrapLet}
            onWrapPi={onWrapPi}
            onWrapApp={onWrapApp(piVal)}
            onWrapFunc={onWrapFunc}
          />
          {fromElements}
          <Labeled
            depth={depth}
            label={i18n.term.to}
            children={toElement}
          />
        </div>,
      }
    case 'func':
      // Construct element for function body
      const funcLen = term.paramID.length + env.length
      const funcVars = term.paramID.map<Val>((id) => ({
        val: 'var',
        id,
        lvl: env.length,
      }))
      const funcTypes = term.param.map((t) => evaluate(env, t))
      const { element: bodyElement } = infer({
        env: [...funcVars, ...env],
        ctx: [...funcTypes, ...ctx],
        ns: [...term.paramID, ...ns],
        depth: depth + 1,
        term: term.body,
        onChange: (updater) => {
          onChange(draft => { updater((draft as TFunc).body) })
        },
      })
      // Code action: add param
      const onFuncAdd = (name: string) => {
        onChange(draft => {
          const tm = draft as TFunc
          tm.param.push({ term: 'any' })
          tm.paramID.push(name)
        })
      }
      // Code action: delete param
      const onFuncDelete = (ix: number) => {
        onChange(draft => {
          const tm = draft as TFunc
          tm.param.splice(ix, 1)
          tm.paramID.splice(ix, 1)
          deleteVar(funcLen, ix, tm.body)
        })
      }
      // Construct element for params
      const paramInfers = term.param.map((t, i) => infer({
        env, ctx, ns,
        depth: depth + 2,
        term: t,
        onChange: (updater) => {
          if (hasOccurrence(funcLen, i, term.body)) message.error(i18n.err.referred)
          else onChange(draft => { updater((draft as TFunc).param[i]) })
        },
      }))
      const paramElements = paramInfers.map(({ element }, i) =>
        <Named
          name={term.paramID[i]}
          depth={depth + 1}
          children={element}
          onDelete={() => onFuncDelete(i)}
        />)
      const paramVals = paramInfers.map(({ val }) => val)
      // Construct type for func, which is Pi
      const funcVal: Val = {
        val: 'pi',
        from: paramVals,
        fromID: term.paramID,
        to: {
          env,
          body: term.body,
        }
      }
      // Concatenate
      return {
        val: funcVal,
        element: <div>
          <Header
            depth={depth}
            label={i18n.term.func}
            validate={validate}
            onAdd={onFuncAdd}
            onDelete={onAnify}
            onWrapLet={onWrapLet}
            onWrapPi={onWrapPi}
            onWrapApp={onWrapApp(funcVal)}
            onWrapFunc={onWrapFunc}
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
  // TODO remove default case
  return {
    val: {
      val: 'any'
    },
    element: <div />
  }
}
