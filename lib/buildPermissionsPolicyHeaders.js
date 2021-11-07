// Local imports
const crunchFeaturePolicyHeader = require('./crunchFeaturePolicyHeader.js')
const crunchPermissionsPolicyHeader = require('./crunchPermissionsPolicyHeader.js')
const directives = require('./PermissionsPolicy/index.js')


function reduceDirectives (supportedDirectives, permissionsPolicy, defaultValue) {
	return supportedDirectives.reduce(
		(accumulator, directive) => {
			if (permissionsPolicy[directive] !== false) {
				accumulator[directive] = permissionsPolicy[directive] || defaultValue
			}

			return accumulator
		},
		{}
	)
}


module.exports = function buildPermissionsPolicyHeaders(options = {}) {
	const {
		permissionsPolicy = {},
		permissionsPolicyDirectiveSupport = ['proposed', 'standard'],
	} = options

	if (permissionsPolicy === false) {
		return []
	}

	const supportedDirectives = Array.from(
		new Set(
			permissionsPolicyDirectiveSupport.map(
				directiveSet => directives[directiveSet]
			).flat()
		)
	)

	return [
		{
			key: 'Feature-Policy',
			value: crunchFeaturePolicyHeader(reduceDirectives(supportedDirectives, permissionsPolicy, "'none'"))
		},
		{
			key: 'Permissions-Policy',
			value: crunchPermissionsPolicyHeader(reduceDirectives(supportedDirectives, permissionsPolicy, '')),
		},
	]
}
