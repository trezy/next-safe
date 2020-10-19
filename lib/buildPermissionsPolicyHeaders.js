// Local imports
import { crunchHeaderValue } from './crunchHeaderValue.js'
import { directives } from './PermissionsPolicy/index.js'





export function buildPermissionsPolicyHeaders(options = {}) {
	const {
		permissionsPolicy,
		permissionsPolicyDirectiveSupport = ['proposed', 'standard'],
		isDev,
	} = options

	const supportedDirectives = Array.from(new Set(permissionsPolicyDirectiveSupport
		.map(directiveSet => directives[directiveSet])
		.flat()))

	const headerValue = crunchHeaderValue(supportedDirectives.reduce((accumulator, directive) => {
		accumulator[directive] = permissionsPolicy[directive] || "'none'"
		return accumulator
	}, {}))

	return [
		{
			key: 'Feature-Policy',
			value: headerValue,
		},

		{
			key: 'Permissions-Policy',
			value: headerValue,
		},
	]
}
