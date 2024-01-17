import cloneDeep from 'lodash.clonedeep'
import { Term } from "../model/term"
import { onNumUpdate } from './onNumUpdate'

describe('onNumUpdate function', () => {
  // Before action
  const before: Term = {
    term: 'num',
    num: 114,
  }

  // After action
  const expected: Term = {
    term: 'num',
    num: 514,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should change num correctly', () => {
    const term = cloneDeep(before)
    onNumUpdate(514)(term)
    expect(term).toStrictEqual(expected)
  })
})

