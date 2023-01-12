// Local imports
const crunchHeaderValue = require('./crunchHeaderValue.js')


const devDirectives = {
	'connect-src': ['webpack://*'],
	'script-src': ["'unsafe-eval'"],
	'style-src': ["'unsafe-inline'"],
}

function getCSPDirective(value, defaultValue, mergeDefaultDirectives = false) {
	// if user configured value is false, return early
	if (value === false) {
		return [false]
	}

	// ensure any string values are split to enable removal of duplicates
	const valueArray = [value].flat().reduce((accumulator, current) => {
		if (typeof current !== 'string') {
			return accumulator
		}
		accumulator.push(...current.trim().split(/\s+/))
		return accumulator
	}, [])

	// flatten default values
	const defaultValueArray = [defaultValue].flat()

	// merge values with default if required
	const mergedValueArray = mergeDefaultDirectives
		? [...defaultValueArray, ...valueArray]
		: valueArray

	// de-duplicate merged values
	const uniqueValueArray = [...new Set(mergedValueArray)]

	// remove value "'none'" if the array contains other values
	const validValueArray = uniqueValueArray.length > 1
		? uniqueValueArray.filter((v) => v !== "'none'")
		: uniqueValueArray

	// only return user configured values if present, otherwise return default
	return validValueArray.length > 0 ? validValueArray : defaultValueArray
}

module.exports = function buildCSPHeaders(options = {}) {
	const {
		contentSecurityPolicy = {},
		isDev,
	} = options

	if (contentSecurityPolicy === false) {
		return []
	}

	// ensure mergeDefaultDirectives option is a boolean, anything other than boolean `true` means `false`
	const mergeDefaultDirectives = contentSecurityPolicy.mergeDefaultDirectives === true

	// Content Security Policy
	const directives = {
		'base-uri': getCSPDirective(contentSecurityPolicy['base-uri'], "'none'", mergeDefaultDirectives),
		'child-src': getCSPDirective(contentSecurityPolicy['child-src'], "'none'", mergeDefaultDirectives),
		'connect-src': getCSPDirective(contentSecurityPolicy['connect-src'], "'self'", mergeDefaultDirectives),
		'default-src': getCSPDirective(contentSecurityPolicy['default-src'], "'self'", mergeDefaultDirectives),
		'font-src': getCSPDirective(contentSecurityPolicy['font-src'], "'self'", mergeDefaultDirectives),
		'form-action': getCSPDirective(contentSecurityPolicy['form-action'], "'self'", mergeDefaultDirectives),
		'frame-ancestors': getCSPDirective(contentSecurityPolicy['frame-ancestors'], "'none'", mergeDefaultDirectives),
		'frame-src': getCSPDirective(contentSecurityPolicy['frame-src'], "'none'", mergeDefaultDirectives),
		'img-src': getCSPDirective(contentSecurityPolicy['img-src'], "'self'", mergeDefaultDirectives),
		'manifest-src': getCSPDirective(contentSecurityPolicy['manifest-src'], "'self'", mergeDefaultDirectives),
		'media-src': getCSPDirective(contentSecurityPolicy['media-src'], "'self'", mergeDefaultDirectives),
		'object-src': getCSPDirective(contentSecurityPolicy['object-src'], "'none'", mergeDefaultDirectives),
		'prefetch-src': getCSPDirective(contentSecurityPolicy['prefetch-src'], "'self'", mergeDefaultDirectives),
		'script-src': getCSPDirective(contentSecurityPolicy['script-src'], "'self'", mergeDefaultDirectives),
		'style-src': getCSPDirective(contentSecurityPolicy['style-src'], "'self'", mergeDefaultDirectives),
		'worker-src': getCSPDirective(contentSecurityPolicy['worker-src'], "'self'", mergeDefaultDirectives),
	}

	const optionalDirectives = [
		'block-all-mixed-content',
		'plugin-types',
		'navigate-to',
		'require-sri-for',
		'require-trusted-types-for',
		'sandbox',
		'script-src-attr',
		'script-src-elem',
		'style-src-attr',
		'style-src-elem',
		'trusted-types',
		'upgrade-insecure-requests',
	]

	optionalDirectives.forEach(optionalDirective => {
		if (contentSecurityPolicy[optionalDirective]) {
			directives[optionalDirective] = getCSPDirective(contentSecurityPolicy[optionalDirective])
		}
	})

	if (contentSecurityPolicy['report-to'] || contentSecurityPolicy['report-uri']) {
		const reportDirectiveValue = getCSPDirective(contentSecurityPolicy['report-to'] || contentSecurityPolicy['report-uri'])
		directives['report-uri'] = reportDirectiveValue
		directives['report-to'] = reportDirectiveValue
	}

	Object.entries(contentSecurityPolicy).forEach(([key, value]) => {
		if (value === false) {
			delete directives[key]
		}
	})

	if (isDev) {
		Object.entries(devDirectives).forEach(([key, value]) => {
			if (directives[key]) {
				directives[key] = [...new Set(directives[key].concat(value))]
			} else {
				directives[key] = [...value]
			}
		})
	}

	const cspString = crunchHeaderValue(directives)
	const cspHeaderNames = [
		`Content-Security-Policy${contentSecurityPolicy.reportOnly ? '-Report-Only' : ''}`,
		`X-Content-Security-Policy${contentSecurityPolicy.reportOnly ? '-Report-Only' : ''}`,
		'X-WebKit-CSP',
	]

	return cspHeaderNames.map(headerName => ({
		key: headerName,
		value: cspString,
	}))
}
