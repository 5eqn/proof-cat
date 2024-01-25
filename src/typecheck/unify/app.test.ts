import { Val } from "../model/value"
import { unify } from "."

describe('unifyApp function', () => {
  const f: Val = {
    val: 'app',
    arg: [
      {
        val: 'type',
        type: 'A',
      }
    ],
    argID: ['a'],
    func: {
      val: 'var',
      lvl: 0,
    }
  }

  const g: Val = {
    val: 'app',
    arg: [
      {
        val: 'type',
        type: 'B',
      }
    ],
    argID: ['a'],
    func: {
      val: 'var',
      lvl: 0,
    }
  }

  const h: Val = {
    val: 'app',
    arg: [
      {
        val: 'type',
        type: 'A',
      }
    ],
    argID: ['b'],
    func: {
      val: 'var',
      lvl: 0,
    }
  }

  const k: Val = {
    val: 'app',
    arg: [
      {
        val: 'type',
        type: 'A',
      }
    ],
    argID: ['a'],
    func: {
      val: 'var',
      lvl: 1,
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should unify same applications', () => {
    expect(() => unify(1, f, f)).not.toThrow()
  })

  test('should not unify if arg differs', () => {
    expect(() => unify(1, f, g)).toThrow()
  })

  test('should not unify if arg ID differs', () => {
    expect(() => unify(1, f, h)).toThrow()
  })

  test('should not unify if func differs', () => {
    expect(() => unify(2, f, k)).toThrow()
  })
})

