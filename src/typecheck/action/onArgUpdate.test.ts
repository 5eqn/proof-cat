import cloneDeep from 'lodash.clonedeep'
import { TApp } from "../model/term"
import { onArgUpdate } from './onArgUpdate'

describe('argUpdateTo function', () => {
  // Before action
  const before: TApp = {
    term: 'app',
    argID: ['xiabeize', 'dingzhen'],
    argIX: [114, 514],
    func: {
      term: 'any',
    }
  }

  // After action
  const expected: TApp = {
    term: 'app',
    argID: ['yuanmengzhixing', 'dingzhen'],
    argIX: [1919810, 514],
    func: {
      term: 'any',
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should update arg properly', () => {
    const term = cloneDeep(before)
    onArgUpdate(['yuanmengzhixing', 1919810], 0)(term)
    expect(term).toStrictEqual(expected)
  })
})

