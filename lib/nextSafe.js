// Local imports
require('./models/CSP.js')
require('./models/nextSafe.js')

const buildCSPHeaders = require('./buildCSPHeaders.js')
const buildPermissionsPolicyHeaders = require('./buildPermissionsPolicyHeaders.js')


/**
 *
 * @param {string} key
 * @param {(string|false)} value
 * @param {string} defaultValue
 * @returns {Header}
 */
function makeHeaderObj(key, value, defaultValue) {
	if (value === false) {
		return undefined
	}

	return {
		key,
		value: value || defaultValue
	}
}



/**
 *
 * @memberof module:next-safe
 *
 * @param {NextSafeConfig | undefined} options
 * @returns {Header[]}
 */
function nextSafe(options = {}) {
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

module.exports = nextSafe
