import cloneDeep from 'lodash.clonedeep'
import { TAny, TApp, TNum } from "../model/term"
import { onAnify } from './onAnify'

describe('onAnify function', () => {
  // Before action
  const beforeNormal: TNum = {
    term: 'num',
    num: 114,
  }

  // After action
  const expectedNormal: TAny = {
    term: 'any',
  }

  // Application before action
  const beforeApp: TApp = {
    term: 'app',
    argID: [],
    arg: [],
    func: beforeNormal,
  }

  // Application after action
  const expectedApp: TAny = expectedNormal

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should change non-application to any and clear other fields', () => {
    const term = cloneDeep(beforeNormal)
    onAnify(term)
    expect(term).toStrictEqual(expectedNormal)
  })

  test('should remove recursively', () => {
    const term = cloneDeep(beforeApp)
    onAnify(term)
    expect(term).toStrictEqual(expectedApp)
  })
})
