import cloneDeep from 'lodash.clonedeep'
import { Term } from '../model/term'
import { actionIdentity } from './identity'

describe('actionIdentity function', () => {
  const term: Term = {
    term: 'any',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should do nothing', () => {
    const copy = cloneDeep(term)
    actionIdentity(copy)
    expect(copy).toStrictEqual(term)
  })
})

