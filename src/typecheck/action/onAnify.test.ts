import cloneDeep from 'lodash.clonedeep'
import { TAny, TNum } from "../model/term"
import { onAnify } from './onAnify'

describe('onAnify function', () => {
  // Before action
  const before: TNum = {
    term: 'num',
    num: 114,
  }

  // After action
  const expected: TAny = {
    term: 'any',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('action should work alone', () => {
    const term = cloneDeep(before)
    onAnify(term)
    expect(term).toStrictEqual(expected)
  })
})

