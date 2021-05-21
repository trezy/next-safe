// Local imports
import { crunchFeaturePolicyHeader } from './crunchFeaturePolicyHeader.js'
import { crunchPermissionsPolicyHeader } from './crunchPermissionsPolicyHeader.js'
import { directives } from './PermissionsPolicy/index.js'





export function buildPermissionsPolicyHeaders(options = {}) {
	const {
		permissionsPolicy = {},
		permissionsPolicyDirectiveSupport = ['proposed', 'standard'],
		isDev,
	} = options

	const supportedDirectives = Array.from(new Set(permissionsPolicyDirectiveSupport
		.map(directiveSet => directives[directiveSet])
		.flat()))

	return [
		{
			key: 'Feature-Policy',
			value: crunchFeaturePolicyHeader(supportedDirectives.reduce((accumulator, directive) => {
				accumulator[directive] = permissionsPolicy[directive] || "'none'"
				return accumulator
			}, {})),
		},

		{
			key: 'Permissions-Policy',
			value: crunchPermissionsPolicyHeader(supportedDirectives.reduce((accumulator, directive) => {
				accumulator[directive] = permissionsPolicy[directive] || "'none'"
				return accumulator
			}, {})),
		},
	]
}
