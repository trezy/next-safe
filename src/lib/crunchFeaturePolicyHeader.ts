import type { PermPolicyConfig } from '../models/nextSafe'

function crunchFeaturePolicyHeader(headerValue: PermPolicyConfig): string {
	return Object.entries(headerValue)
		.reduce<string[]>((accumulator, [key, value]) => {
			const serializedValue = [value].flat().filter((val): val is string => typeof val === 'string')
			accumulator.push([key, ...serializedValue].join(' ').concat(';'))
			return accumulator
		}, [])
		.join('')
}

export default crunchFeaturePolicyHeader
