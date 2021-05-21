// Local imports
const crunchFeaturePolicyHeader = require('../lib/crunchFeaturePolicyHeader')





describe('crunchFeaturePolicyHeader', () => {
	test('with single header', () => {
		const crunchedHeaders = crunchFeaturePolicyHeader({
			'header-name': 'header-value',
		})

		expect(crunchedHeaders).toEqual('header-name header-value;')
	})

	test('with multiple headers', () => {
		const crunchedHeaders = crunchFeaturePolicyHeader({
			'header-name1': 'header-value1',
			'header-name2': 'header-value2',
		})

		expect(crunchedHeaders).toEqual('header-name1 header-value1;header-name2 header-value2;')
	})

	test('with values array', () => {
		const crunchedHeaders = crunchFeaturePolicyHeader({
			'header-name': [
				'header-value1',
				'header-value2',
			],
		})

		expect(crunchedHeaders).toEqual('header-name header-value1 header-value2;')
	})

	test('with mixed value types', () => {
		const crunchedHeaders = crunchFeaturePolicyHeader({
			'header-name1': 'header-value1',
			'header-name2': [
				'header-value2',
				'header-value3',
			],
		})

		expect(crunchedHeaders).toEqual('header-name1 header-value1;header-name2 header-value2 header-value3;')
	})
})
