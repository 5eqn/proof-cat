import { DraftFunction } from "use-immer";
import Adder from "../component/Adder";
import Labeled from "../component/Labeled";
import Named from "../component/Named";
import { i18n } from "../i18n";
import { Ctx, deleteVar, Env, evaluate, hasOccurrence, Term, TPi, Val } from "../model";

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
  env, ctx, depth, term, onChange
}: InferRequest): InferResult {
  switch (term.term) {
    case 'pi':
      // Get new env length
      const pl = term.fromID.length + env.length
      // Construct element for to type
      const vars = term.fromID.map<Val>((id) => ({
        val: 'var',
        id,
        lvl: env.length,
      }))
      const types = term.from.map((t) => evaluate(env, t))
      const { element: toElement } = infer({
        env: [...vars, ...env],
        ctx: [...types, ...ctx],
        depth: depth + 1,
        term: term.to,
        onChange: (updater) => {
          onChange(draft => { updater((draft as TPi).to) })
        },
      })
      // Code action: add param
      const onAdd = (name: string) => {
        onChange(draft => {
          const tm = draft as TPi
          tm.from.push({ term: 'any' })
          tm.fromID.push(name)
        })
      }
      // Code action: delete param
      const onDelete = (ix: number) => {
        onChange(draft => {
          const tm = draft as TPi
          tm.from.splice(ix, 1)
          tm.fromID.splice(ix, 1)
          deleteVar(pl, ix, tm.to)
        })
      }
      // Code action: Anify
      const onAnify = () => {
        onChange(draft => {
          draft.term = 'any'
        })
      }
      // Construct element for from types
      const fromInfers = term.from.map((t, i) => infer({
        env,
        ctx,
        depth: depth + 2,
        term: t,
        onChange: (updater) => {
          if (hasOccurrence(pl, i, term.to)) alert(i18n.err.referred)
          else onChange(draft => { updater((draft as TPi).from[i]) })
        },
      }))
      const fromElements = fromInfers.map(({ element }, i) =>
        <Named
          name={term.fromID[i]}
          depth={depth + 1}
          children={element}
          onDelete={() => onDelete(i)}
        />)
      // Concatenate
      return {
        val: {
          'val': 'uni',
        },
        element: <div>
          <Adder
            depth={depth}
            label={i18n.term.pi}
            onAdd={onAdd}
            onDelete={onAnify}
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
}
