import cloneDeep from 'lodash.clonedeep'
import { Term } from "../model/term"
import { onVarUpdate } from './onVarUpdate'

describe('onVarUpdate function', () => {
  // Before action
  const before: Term = {
    term: 'var',
    id: 'before',
    ix: 0,
  }

  // After action
  const expected: Term = {
    term: 'var',
    id: 'after',
    ix: 1,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should change var correctly', () => {
    const term = cloneDeep(before)
    onVarUpdate('after', 1, term)
    expect(term).toStrictEqual(expected)
  })
})

