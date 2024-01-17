import { VVar } from '../model/value'
import { makeSpineIn } from './makeSpineIn'

describe('makeSpineIn function', () => {
  const ns = ['a', 'b', 'c']
  const vars: VVar[] = [
    {
      val: 'var',
      id: 'a',
      lvl: 4,
    },
    {
      val: 'var',
      id: 'b',
      lvl: 3,
    },
    {
      val: 'var',
      id: 'c',
      lvl: 2,
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should make spine correctly', () => {
    expect(ns.map(makeSpineIn(5))).toStrictEqual(vars)
  })
})

