// Local imports
const buildCSPHeaders = require('./buildCSPHeaders.js')
const buildPermissionsPolicyHeaders = require('./buildPermissionsPolicyHeaders.js')


function makeHeaderObj(key, value, defaultValue) {
	if (key === false) {
		return undefined
	}

	return {
		key,
		value: value || defaultValue
	}
}


module.exports = function nextSafe(options = {}) {
	const {
		contentTypeOptions,
		contentSecurityPolicy = {},
		frameOptions,
		permissionsPolicy = {},
		permissionsPolicyDirectiveSupport,
		isDev = false,
		referrerPolicy,
		xssProtection,
	} = options

	return [
		...buildCSPHeaders({ contentSecurityPolicy, isDev }),
		...buildPermissionsPolicyHeaders({ permissionsPolicy, permissionsPolicyDirectiveSupport, isDev }),
		makeHeaderObj('Referrer-Policy', referrerPolicy, 'no-referrer'),
		makeHeaderObj('X-Content-Type-Options', contentTypeOptions, 'nosniff'),
		makeHeaderObj('X-Frame-Options', frameOptions, 'DENY'),
		makeHeaderObj('X-XSS-Protection', xssProtection, '1; mode=block'),
	].filter((header) => Boolean(header)) // Filter out header values that have resolved to falsy
}
