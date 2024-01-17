import cloneDeep from 'lodash.clonedeep'
import { TNum, TVar } from "../model/term"
import { onBecomeVar } from './onBecomeVar'

describe('onBecomeVar function', () => {
  // Before action
  const before: TNum = {
    term: 'num',
    num: 1145,
  }

  // After action
  const expected: TVar = {
    term: 'var',
    id: 'first',
    ix: 0,
  }

  // Namespace
  const ns: string[] = ['first', 'second', 'third']

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should make term the first variable in context', () => {
    const term = cloneDeep(before)
    onBecomeVar(ns)(term)
    expect(term).toStrictEqual(expected)
  })
})

