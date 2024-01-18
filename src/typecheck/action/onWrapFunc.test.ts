import cloneDeep from 'lodash.clonedeep'
import { Term } from "../model/term"
import { onWrapFunc } from './onWrapFunc'

describe('onWrapFunc function', () => {
  // Before action
  const before: Term = {
    term: 'num',
    num: 1145,
  }

  // After action
  const expected: Term = {
    term: 'func',
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

  test('should make term wrapped with function with default param', () => {
    const term = cloneDeep(before)
    onWrapFunc('1145', term)
    expect(term).toStrictEqual(expected)
  })
})

