import { i18n } from '../../i18n'
import { validate } from './validate'

describe('validate function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should report error for empty', () => {
    expect(validate('', [])).toBe(i18n.err.empty)
  })

  test('should report error for duplicate', () => {
    expect(validate('kest', ['kes', 'kest', 'kfc'])).toBe(i18n.err.nameDup)
  })

  test('should report null otherwise', () => {
    expect(validate('cxk', ['kes', 'kest', 'kfc'])).toBeNull()
  })
})

