import cloneDeep from 'lodash.clonedeep'
import { Term } from "../model/term"
import { onTypeUpdate } from './onTypeUpdate'

describe('onTypeUpdate function', () => {
  // Before action
  const before: Term = {
    term: 'type',
    type: '114',
  }

  // After action
  const expected: Term = {
    term: 'type',
    type: '514',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should change type correctly', () => {
    const term = cloneDeep(before)
    onTypeUpdate('514', term)
    expect(term).toStrictEqual(expected)
  })
})

