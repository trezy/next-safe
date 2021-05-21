// Local imports
const crunchHeaderValue = require('../lib/crunchHeaderValue')





describe('crunchHeaderValue', () => {
	test('with single header', () => {
		const crunchedHeaders = crunchHeaderValue({
			'header-name': 'header-value',
		})

		expect(crunchedHeaders).toEqual('header-name header-value;')
	})

	test('with multiple headers', () => {
		const crunchedHeaders = crunchHeaderValue({
			'header-name1': 'header-value1',
			'header-name2': 'header-value2',
		})

		expect(crunchedHeaders).toEqual('header-name1 header-value1;header-name2 header-value2;')
	})

	test('with values array', () => {
		const crunchedHeaders = crunchHeaderValue({
			'header-name': [
				'header-value1',
				'header-value2',
			],
		})

		expect(crunchedHeaders).toEqual('header-name header-value1 header-value2;')
	})

	test('with mixed value types', () => {
		const crunchedHeaders = crunchHeaderValue({
			'header-name1': 'header-value1',
			'header-name2': [
				'header-value2',
				'header-value3',
			],
		})

		expect(crunchedHeaders).toEqual('header-name1 header-value1;header-name2 header-value2 header-value3;')
	})
})
