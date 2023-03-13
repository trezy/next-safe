import type { CSPDirectivesConfig } from '../models/CSP'

function crunchCSPHeaderValue(headerValue: CSPDirectivesConfig): string {
	return Object.entries(headerValue)
		.reduce<string[]>((accumulator, [key, value]) => {
			const serializedValue = [value].flat().filter((val): val is string => typeof val === 'string')
			accumulator.push([key, ...serializedValue].join(' ').concat(';'))
			return accumulator
		}, [])
		.join('')
}

export default crunchCSPHeaderValue
