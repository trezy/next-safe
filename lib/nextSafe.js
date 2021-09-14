// Local imports
const buildCSPHeaders = require('./buildCSPHeaders.js')
const buildPermissionsPolicyHeaders = require('./buildPermissionsPolicyHeaders.js')


function hObj(key, value, defaultValue) {
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
		hObj('Referrer-Policy', referrerPolicy, 'no-referrer'),
		hObj('X-Content-Type-Options', contentTypeOptions, 'nosniff'),
		hObj('X-Frame-Options', frameOptions, 'DENY'),
		hObj('X-XSS-Protection', xssProtection, '1; mode=block;'),
	].filter((header) => Boolean(header)) // Filter out header values that have resolved to falsy
}
