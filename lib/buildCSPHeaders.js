// Local imports
const crunchHeaderValue = require('./crunchHeaderValue.js')





module.exports = function buildCSPHeaders(options = {}) {
	const {
		contentSecurityPolicy = {},
		isDev,
	} = options

	function v(value, defaultValue) {
		return [value ?? defaultValue].flat()
	}

	// Content Security Policy
	const directives = {
		'base-uri': v(contentSecurityPolicy['base-uri'], "'none'"),
		'child-src': v(contentSecurityPolicy['child-src'], "'none'"),
		'connect-src': v(contentSecurityPolicy['connect-src'], "'self'"),
		'default-src': v(contentSecurityPolicy['default-src'], "'self'"),
		'font-src': v(contentSecurityPolicy['font-src'], "'self'"),
		'form-action': v(contentSecurityPolicy['form-action'], "'self'"),
		'frame-ancestors': v(contentSecurityPolicy['frame-ancestors'], "'none'"),
		'frame-src': v(contentSecurityPolicy['frame-src'], "'none'"),
		'img-src': v(contentSecurityPolicy['img-src'], "'self'"),
		'manifest-src': v(contentSecurityPolicy['manifest-src'], "'self'"),
		'object-src': v(contentSecurityPolicy['object-src'], "'none'"),
		'prefetch-src': v(contentSecurityPolicy['prefetch-src'], "'self'"),
		'script-src': v(contentSecurityPolicy['script-src'], "'self'"),
		'style-src': v(contentSecurityPolicy['style-src'], "'self'"),
		'worker-src': v(contentSecurityPolicy['worker-src'], "'self'"),
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
			directives[optionalDirective] = v(contentSecurityPolicy[optionalDirective])
		}
	})

	if (contentSecurityPolicy['report-to'] || contentSecurityPolicy['report-uri']) {
		const reportDirectiveValue = v(contentSecurityPolicy['report-to'] || contentSecurityPolicy['report-uri'])
		directives['report-uri'] = reportDirectiveValue
		directives['report-to'] = reportDirectiveValue
	}

	Object.entries(contentSecurityPolicy).forEach(([key, value]) => {
		if (value === false) {
			delete directives[key]
		}
	})

	if (isDev) {
		directives['connect-src'].push(['webpack://*'])
		directives['script-src'].push(["'unsafe-eval'"])
		directives['style-src'].push(["'unsafe-inline'"])
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
