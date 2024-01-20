import { Val } from "../model/value"
import { unify } from "."

describe('unifyPi function', () => {
  const f: Val = {
    val: 'pi',
    param: [
      {
        val: 'type',
        type: 'A',
      }
    ],
    paramID: ['a'],
    func: {
      env: [],
      body: {
        term: 'var',
        id: 'a',
        ix: 0,
      },
    }
  }

  const g: Val = {
    val: 'pi',
    param: [
      {
        val: 'type',
        type: 'B',
      }
    ],
    paramID: ['a'],
    func: {
      env: [],
      body: {
        term: 'var',
        id: 'a',
        ix: 0,
      },
    }
  }

  const h: Val = {
    val: 'pi',
    param: [
      {
        val: 'type',
        type: 'A',
      }
    ],
    paramID: ['b'],
    func: {
      env: [],
      body: {
        term: 'var',
        id: 'b',
        ix: 0,
      },
    }
  }

  const k: Val = {
    val: 'pi',
    param: [
      {
        val: 'type',
        type: 'A',
      }
    ],
    paramID: ['a'],
    func: {
      env: [],
      body: {
        term: 'var',
        id: 'b',
        ix: 1,
      },
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should unify same pis', () => {
    expect(() => unify(1, f, f)).not.toThrow()
  })

  test('should not unify if param differs', () => {
    expect(() => unify(1, f, g)).toThrow()
  })

  test('should not unify if param ID differs', () => {
    expect(() => unify(1, f, h)).toThrow()
  })

  test('should not unify if body differs', () => {
    expect(() => unify(1, f, k)).toThrow()
  })
})

