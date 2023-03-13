// Local imports
import crunchCSPHeaderValue from './crunchCSPHeaderValue'
import {
	CSP_DEVELOPMENT_DIRECTIVE_NAMES,
	CSP_DEVELOPMENT_DIRECTIVES,
	CSP_DIRECTIVE_NAMES,
	CSP_OPTIONAL_DIRECTIVE_NAMES,
	CSP_REPORT_DIRECTIVE_NAMES,
	CSP_REQUIRED_DIRECTIVE_DEFAULTS,
	CSP_REQUIRED_DIRECTIVE_NAMES,
} from '../models/CSP'

import type { CSPDirectiveConfigValue, CSPDirectivesConfig } from '../models/CSP'
import type { NextSafeConfig } from '../models/nextSafe'

function getCSPDirective(
	value?: CSPDirectiveConfigValue,
	defaultValue?: Exclude<CSPDirectiveConfigValue, false>,
	mergeDefaultDirectives = false,
): string[] | false {
	// if user configured value is false, return early
	if (value === false) {
		return false
	}

	// ensure any string values are split to enable removal of duplicates
	const valueArray = [value].flat().reduce<string[]>((accumulator, current) => {
		if (typeof current === 'undefined') {
			return accumulator
		}
		accumulator.push(...current.trim().split(/\s+/u))
		return accumulator
	}, [])

	// flatten default values
	const defaultValueArray = [defaultValue]
		.flat()
		.filter((val): val is string => typeof val === 'string')

	// merge values with default if required
	const mergedValueArray = mergeDefaultDirectives
		? [...defaultValueArray, ...valueArray]
		: valueArray

	// de-duplicate merged values
	const uniqueValueArray = [...new Set(mergedValueArray)]

	// remove value "'none'" if the array contains other values
	const validValueArray =
		uniqueValueArray.length > 1
			? uniqueValueArray.filter((val) => val !== "'none'")
			: uniqueValueArray

	// only return user configured values if present, otherwise return default
	return validValueArray.length > 0 ? validValueArray : defaultValueArray
}

type Options = Pick<NextSafeConfig, 'contentSecurityPolicy' | 'isDev'>

function buildCSPHeaders(options: Options = {}) {
	const { contentSecurityPolicy = {}, isDev } = options

	if (contentSecurityPolicy === false) {
		return []
	}

	// ensure mergeDefaultDirectives option is a boolean, anything other than boolean `true` means `false`
	const mergeDefaultDirectives = contentSecurityPolicy.mergeDefaultDirectives === true

	// Content Security Policy
	const directives: CSPDirectivesConfig = {}

	CSP_REQUIRED_DIRECTIVE_NAMES.forEach((name) => {
		directives[name] = getCSPDirective(
			contentSecurityPolicy[name],
			CSP_REQUIRED_DIRECTIVE_DEFAULTS[name],
			mergeDefaultDirectives,
		)
	})

	CSP_OPTIONAL_DIRECTIVE_NAMES.forEach((name) => {
		const configuredValue = contentSecurityPolicy[name]
		if (typeof configuredValue !== 'undefined') {
			directives[name] = getCSPDirective(configuredValue)
		}
	})

	CSP_REPORT_DIRECTIVE_NAMES.some((directiveName) => {
		const configuredValue = contentSecurityPolicy[directiveName]
		if (typeof configuredValue !== 'undefined') {
			const normalisedValue = getCSPDirective(configuredValue)
			CSP_REPORT_DIRECTIVE_NAMES.forEach((name) => {
				directives[name] = normalisedValue
			})
			return true
		}
		return false
	})

	CSP_DIRECTIVE_NAMES.forEach((name) => {
		const normalisedValue = directives[name]
		if (normalisedValue === false) {
			delete directives[name]
		}
	})

	if (isDev) {
		CSP_DEVELOPMENT_DIRECTIVE_NAMES.forEach((name) => {
			const normalisedValue = getCSPDirective(CSP_DEVELOPMENT_DIRECTIVES[name])
			if (normalisedValue === false) {
				return
			}
			const existingValue = directives[name]
			if (typeof existingValue === 'undefined' || existingValue === false) {
				directives[name] = normalisedValue
			} else {
				directives[name] = [...new Set([...existingValue, ...normalisedValue])]
			}
		})
	}

	const cspString = crunchCSPHeaderValue(directives)
	const reportOnly =
		typeof contentSecurityPolicy.reportOnly === 'boolean' && contentSecurityPolicy.reportOnly
			? '-Report-Only'
			: ''
	const cspHeaderNames = [
		`Content-Security-Policy${reportOnly}`,
		`X-Content-Security-Policy${reportOnly}`,
		'X-WebKit-CSP',
	]

	return cspHeaderNames.map((headerName) => ({
		key: headerName,
		value: cspString,
	}))
}

export default buildCSPHeaders
