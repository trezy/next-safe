// Local imports
const buildCSPHeaders = require('./buildCSPHeaders.js')
const buildPermissionsPolicyHeaders = require('./buildPermissionsPolicyHeaders.js')





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
		{
			key: 'Referrer-Policy',
			value: referrerPolicy || 'no-referrer',
		},
		{
			key: 'X-Content-Type-Options',
			value: contentTypeOptions || 'nosniff',
		},
		{
			key: 'X-Frame-Options',
			value: frameOptions || 'DENY',
		},
		{
			key: 'X-XSS-Protection',
			value: xssProtection || '1; mode=block',
		},
	]
}
