// Local imports
import { buildCSPHeaders } from './buildCSPHeaders.js'
import { buildPermissionsPolicyHeaders } from './buildPermissionsPolicyHeaders.js'
import { crunchHeaderValue } from './crunchHeaderValue.js'





export default function nextSafe(options = {}) {
  const {
		contentTypeOptions,
		csp = {},
		frameOptions,
    permissionsPolicy = {},
    permissionsPolicyDirectiveSupport,
		isDev = false,
		referrerPolicy,
		xssProtection,
  } = options

  return [
    ...buildCSPHeaders({ csp, isDev }),
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
