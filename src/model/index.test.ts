import { Term } from "./term";
import { evaluate, quote } from "./evaluate";

describe('Evaluation framework', () => {
  test('(x => x)(x = 114)', () => {
    const inputState: Term = {
      term: 'let',
      id: 'yys',
      body: {
        term: 'num',
        num: 114,
      },
      next: {
        term: 'app',
        func: {
          term: 'func',
          param: [
            {
              term: 'type',
              type: 'number',
            },
          ],
          paramID: [
            'x',
          ],
          body: {
            term: 'var',
            id: 'x',
            ix: 0,
          }
        },
        argIX: [0],
        argID: [
          'x',
        ]
      }
    }
    const output = quote(0, evaluate([], inputState))
    const expected = {
      term: 'num',
      num: 114
    }
    expect(output).toStrictEqual(expected)
  })

  test('(x => (f => f(x)))(x = any)', () => {
    const inputState: Term = {
      term: 'let',
      id: 'any',
      body: {
        term: 'any',
      },
      next: {
        term: 'app',
        func: {
          term: 'func',
          param: [
            {
              term: 'type',
              type: 'number',
            }
          ],
          paramID: [
            'x',
          ],
          body: {
            term: 'func',
            param: [
              {
                term: 'pi',
                param: [
                  {
                    term: 'type',
                    type: 'number',
                  }
                ],
                paramID: [
                  'u',
                ],
                body: {
                  term: 'type',
                  type: 'number',
                }
              },
            ],
            paramID: [
              'f',
            ],
            body: {
              term: 'app',
              argIX: [1],
              argID: [
                'u',
              ],
              func: {
                term: 'var',
                id: 'f',
                ix: 0,
              }
            }
          },
        },
        argIX: [0],
        argID: [
          'x',
        ]
      }
    }
    const output = quote(0, evaluate([], inputState))
    const expected = "(f: (u: number) -> number) => (Var(f))(u = *)"
    // expect(output).toBe(expected)
  })
})
