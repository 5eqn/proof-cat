import cloneDeep from 'lodash.clonedeep'
import { Term } from "../model/term"
import { onWrapPi } from './onWrapPi'

describe('onWrapPi pition', () => {
  // Before action
  const before: Term = {
    term: 'num',
    num: 1145,
  }

  // After action
  const expected: Term = {
    term: 'pi',
    param: [
      {
        term: 'any',
      }
    ],
    paramID: ['1145'],
    body: before,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should make term wrapped with pi with default param', () => {
    const term = cloneDeep(before)
    onWrapPi('1145', term)
    expect(term).toStrictEqual(expected)
  })
})

