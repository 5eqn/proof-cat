import { evaluate, pretty, quote, Term } from '.'

describe('Evaluation framework', () => {
  test('(x => x)(x = 114)', () => {
    const inputState: Term = {
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
      arg: [
        {
          term: 'num',
          num: 114,
        },
      ],
      argID: [
        'x',
      ]
    }
    const output = pretty(quote(0, evaluate([], inputState)))
    const expected = "114"
    expect(output).toBe(expected)
  })

  test('(x => (f => f(x)))(x = any)', () => {
    const inputState: Term = {
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
              from: [
                {
                  term: 'type',
                  type: 'number',
                }
              ],
              fromID: [
                'u',
              ],
              to: {
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
            arg: [
              {
                term: 'var',
                id: 'x',
                ix: 1,
              }
            ],
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
      arg: [
        {
          term: 'any',
        }
      ],
      argID: [
        'x',
      ]
    }
    const output = pretty(quote(0, evaluate([], inputState)))
    const expected = "(f: (u: number) -> number) => (Var(f))(u = *)"
    expect(output).toBe(expected)
  })
})
