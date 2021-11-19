// Local imports
const crunchHeaderValue = require('./crunchHeaderValue.js')


const devDirectives = {
	'connect-src': ['webpack://*'],
	'script-src': ["'unsafe-eval'"],
	'style-src': ["'unsafe-inline'"],
}

function getCSPDirective(value, defaultValue) {
	return [value || defaultValue].flat()
}

module.exports = function buildCSPHeaders(options = {}) {
	const {
		contentSecurityPolicy = {},
		isDev,
	} = options

	if (contentSecurityPolicy === false) {
		return []
	}

	// Content Security Policy
	const directives = {
		'base-uri': getCSPDirective(contentSecurityPolicy['base-uri'], "'none'"),
		'child-src': getCSPDirective(contentSecurityPolicy['child-src'], "'none'"),
		'connect-src': getCSPDirective(contentSecurityPolicy['connect-src'], "'self'"),
		'default-src': getCSPDirective(contentSecurityPolicy['default-src'], "'self'"),
		'font-src': getCSPDirective(contentSecurityPolicy['font-src'], "'self'"),
		'form-action': getCSPDirective(contentSecurityPolicy['form-action'], "'self'"),
		'frame-ancestors': getCSPDirective(contentSecurityPolicy['frame-ancestors'], "'none'"),
		'frame-src': getCSPDirective(contentSecurityPolicy['frame-src'], "'none'"),
		'img-src': getCSPDirective(contentSecurityPolicy['img-src'], "'self'"),
		'manifest-src': getCSPDirective(contentSecurityPolicy['manifest-src'], "'self'"),
		'object-src': getCSPDirective(contentSecurityPolicy['object-src'], "'none'"),
		'prefetch-src': getCSPDirective(contentSecurityPolicy['prefetch-src'], "'self'"),
		'script-src': getCSPDirective(contentSecurityPolicy['script-src'], "'self'"),
		'style-src': getCSPDirective(contentSecurityPolicy['style-src'], "'self'"),
		'worker-src': getCSPDirective(contentSecurityPolicy['worker-src'], "'self'"),
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
				directives[key] = directives[key].concat(value)
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
