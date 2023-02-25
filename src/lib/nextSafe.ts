// Local imports
import type { Header, HeaderConfig, NextSafeConfig } from '../models/nextSafe'
import buildCSPHeaders from './buildCSPHeaders'
import buildPermissionsPolicyHeaders from './buildPermissionsPolicyHeaders'

function makeHeaderObj(
	key: string,
	value: HeaderConfig,
	defaultValue: string
): Header | undefined {
	if (value === false) {
		return undefined
	}

	return {
		key,
		value: value || defaultValue
	}
}

function nextSafe(options: NextSafeConfig = {}): Header[] {
	const {
		contentTypeOptions = false,
		contentSecurityPolicy = {},
		frameOptions = false,
		permissionsPolicy = {},
		permissionsPolicyDirectiveSupport,
		isDev = false,
		referrerPolicy = false,
		xssProtection = false,
	} = options

	return [
		...buildCSPHeaders({ contentSecurityPolicy, isDev }),
		...buildPermissionsPolicyHeaders({
			permissionsPolicy,
			permissionsPolicyDirectiveSupport,
			isDev,
		}),
		makeHeaderObj('Referrer-Policy', referrerPolicy, 'no-referrer'),
		makeHeaderObj('X-Content-Type-Options', contentTypeOptions, 'nosniff'),
		makeHeaderObj('X-Frame-Options', frameOptions, 'DENY'),
		makeHeaderObj('X-XSS-Protection', xssProtection, '1; mode=block'),
	]
		// Filter out header values that have resolved to falsy
		.filter((header): header is Header => Boolean(header))
}

export default nextSafe
