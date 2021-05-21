// Local imports
const crunchFeaturePolicyHeader = require('./crunchFeaturePolicyHeader.js')
const crunchPermissionsPolicyHeader = require('./crunchPermissionsPolicyHeader.js')
const directives = require('./PermissionsPolicy/index.js')





module.exports = function buildPermissionsPolicyHeaders(options = {}) {
	const {
		permissionsPolicy = {},
		permissionsPolicyDirectiveSupport = ['proposed', 'standard'],
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
				accumulator[directive] = permissionsPolicy[directive] || "()"
				return accumulator
			}, {})),
		},
	]
}
