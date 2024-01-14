import { message } from "antd";
import { DraftFunction } from "use-immer";
import AnyBar from "../component/AnyBar";
import Header from "../component/Header";
import Labeled from "../component/Labeled";
import Named from "../component/Named";
import SelectBar from "../component/SelectBar";
import InputBar from "../component/InputBar";
import { i18n } from "../i18n";
import {TApp, Term, TFunc, TLet, TNum, TPi, TType, TUni, TVar} from "../model/term";
import {Val, VPi} from "../model/value";
import {Env} from "../model/env";
import {Ctx} from "../model/ctx";
import {apply} from "../model/closure";
import {unify} from "../model/unify";
import {evaluate, quote} from "../model/evaluate";
import {addVar, deleteVar, hasOccurrence} from "../model/action";

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
  const onWrapLet = (name: string) => {
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
  const onWrapFunc = () => {
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
  // Make sure variable name don't duplicate in actions
  const validate = (name: string, addedNS: string[] = []) => {
    const newNS = [...addedNS, ...ns]
    const containName = newNS.map((n) => name === n).reduce((x, y) => x || y, false)
    return containName ? i18n.err.nameDup : null
  }
  switch (term.term) {
    case 'uni':
      // U has type U
      const uniVal: Val = {
        val: 'uni',
      }
      // Concatenate
      return {
        val: uniVal,
        element: <Header
          depth={depth}
          label={i18n.term.uni}
          validate={validate}
          onDelete={onAnify}
          onWrapLet={onWrapLet}
          onWrapPi={onWrapPi}
          onWrapApp={onWrapApp(uniVal)}
          onWrapFunc={onWrapFunc}
        />
      }
    case 'var':
      // Infer type for variable
      const varType = ctx[term.ix]
      // Concatenate
      return {
        val: varType,
        element: <div>
          <Header
            depth={depth}
            label={i18n.term.var}
            validate={validate}
            onDelete={onAnify}
            onWrapLet={onWrapLet}
            onWrapPi={onWrapPi}
            onWrapApp={onWrapApp(varType)}
            onWrapFunc={onWrapFunc}
          />
          <SelectBar
            label={i18n.term.val}
            depth={depth}
            data={ns}
            index={term.ix}
            onChange={(i2) => {
              onChange(draft => {
                // Incrementally update variable index and name
                const tm = draft as TVar
                tm.ix = i2
                tm.id = ns[i2]
              })
            }}
          />
        </div>
      }
    case 'num':
      // All numbers have type number
      const numVal: Val = {
        val: 'type',
        type: 'number',
      }
      // Concatenate
      return {
        val: numVal,
        element: <div>
          <Header
            depth={depth}
            label={i18n.term.num}
            validate={validate}
            onDelete={onAnify}
            onWrapLet={onWrapLet}
            onWrapPi={onWrapPi}
            onWrapApp={onWrapApp(numVal)}
            onWrapFunc={onWrapFunc}
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
    case 'let':
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
    case 'app':
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
      const appVal = apply(appFuncPi.to, argVals)

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
                const tm = draft as TApp
                tm.argIX[argIX] = selection[localIX][1]
                tm.argID[argIX] = selection[localIX][0]
              })
            }}
          />
        </Named>
      })
      // Concatenate
      return {
        val: appVal,
        element: <div>
          <Header
            depth={depth}
            label={i18n.term.apply}
            validate={validate}
            onDelete={onAnify}
            onWrapLet={onWrapLet}
            onWrapPi={onWrapPi}
            onWrapApp={onWrapApp(appVal)}
            onWrapFunc={onWrapFunc}
          />
          {argElements}
          <Labeled
            depth={depth}
            label={i18n.term.target}
            children={appFuncElement}
          />
        </div>,
      }
    case 'any':
      // Any term has type any
      const anyVal: Val = {
        val: 'any',
      }
      const onBecomeU = () => {
        onChange(draft => {
          const tm = draft as TUni
          tm.term = 'uni'
        })
      }
      const onBecomeType = (type: string) => {
        onChange(draft => {
          const tm = draft as TType
          tm.term = 'type'
          tm.type = type
        })
      }
      const onBecomeNum = (num: number) => {
        onChange(draft => {
          const tm = draft as TNum
          tm.term = 'num'
          tm.num = num
        })
      }
      const onBecomeVar = () => {
        onChange(draft => {
          if (ns.length === 0) {
            message.error(i18n.err.noVariable)
            return
          }
          const tm = draft as TVar
          tm.term = 'var'
          tm.id = ns[0]
          tm.ix = 0
        })
      }
      return {
        val: anyVal,
        element: <AnyBar
          depth={depth}
          validate={validate}
          onWrapPi={onWrapPi}
          onWrapLet={onWrapLet}
          onWrapFunc={onWrapFunc}
          onBecomeVar={onBecomeVar}
          onBecomeU={onBecomeU}
          onBecomeType={onBecomeType}
          onBecomeNum={onBecomeNum}
        />
      }
    case 'type':
      // All types have type U
      const typeVal: Val = {
        val: 'uni',
      }
      // Concatenate
      return {
        val: typeVal,
        element: <div>
          <Header
            depth={depth}
            label={i18n.term.type}
            validate={validate}
            onDelete={onAnify}
            onWrapLet={onWrapLet}
            onWrapPi={onWrapPi}
            onWrapApp={onWrapApp(typeVal)}
            onWrapFunc={onWrapFunc}
          />
          <InputBar
            label={i18n.term.val}
            depth={depth}
            value={term.type}
            onChange={(value) => {
              onChange(draft => {
                (draft as TType).type = value
              })
            }}
          />
        </div>
      }
    case 'pi':
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
      // Code action: add param
      const onPiAdd = (name: string) => {
        onChange(draft => {
          const tm = draft as TPi
          tm.from = [{ term: 'any' }, ...tm.from]
          tm.fromID = [name, ...tm.fromID]
          addVar(0, tm.to)
        })
      }
      // Code action: delete param
      const onPiDelete = (ix: number) => {
        onChange(draft => {
          const tm = draft as TPi
          tm.from.splice(ix, 1)
          tm.fromID.splice(ix, 1)
          deleteVar(ix, tm.to)
        })
      }
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
            else onPiDelete(i)
          }}
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
            validate={(name) => validate(name, term.fromID)}
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
      // Code action: add param
      const onFuncAdd = (name: string) => {
        onChange(draft => {
          const tm = draft as TFunc
          tm.param = [{ term: 'any' }, ...tm.param]
          tm.paramID = [name, ...tm.paramID]
          addVar(0, tm.body)
        })
      }
      // Code action: delete param
      const onFuncDelete = (ix: number) => {
        onChange(draft => {
          const tm = draft as TFunc
          tm.param.splice(ix, 1)
          tm.paramID.splice(ix, 1)
          deleteVar(ix, tm.body)
        })
      }
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
          onDelete={() => onFuncDelete(i)}
        />)
      const paramVals = term.param.map((t) => evaluate(env, t))
      // Construct type for func, which is Pi
      const funcVal: Val = {
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
        val: funcVal,
        element: <div>
          <Header
            depth={depth}
            label={i18n.term.func}
            validate={(name) => validate(name, term.paramID)}
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
}
