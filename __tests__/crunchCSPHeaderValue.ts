// Local imports
import { crunchCSPHeaderValue } from '../src/lib/crunchCSPHeaderValue'

describe('crunchCSPHeaderValue', () => {
  test('with single header', () => {
    const crunchedHeaders = crunchCSPHeaderValue({
      'base-uri': 'header-value',
    })

    expect(crunchedHeaders).toEqual('base-uri header-value;')
  })

  test('with multiple headers', () => {
    const crunchedHeaders = crunchCSPHeaderValue({
      'base-uri': 'header-value1',
      'child-src': 'header-value2',
    })

    expect(crunchedHeaders).toEqual(
      'base-uri header-value1;child-src header-value2;'
    )
  })

  test('with values array', () => {
    const crunchedHeaders = crunchCSPHeaderValue({
      'base-uri': ['header-value1', 'header-value2'],
    })

    expect(crunchedHeaders).toEqual('base-uri header-value1 header-value2;')
  })

  test('with mixed value types', () => {
    const crunchedHeaders = crunchCSPHeaderValue({
      'base-uri': 'header-value1',
      'child-src': ['header-value2', 'header-value3'],
    })

    expect(crunchedHeaders).toEqual(
      'base-uri header-value1;child-src header-value2 header-value3;'
    )
  })
})
