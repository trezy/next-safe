// Local imports
const crunchFeaturePolicyHeader = require('./crunchFeaturePolicyHeader.js')
const crunchPermissionsPolicyHeader = require('./crunchPermissionsPolicyHeader.js')
const directives = require('./PermissionsPolicy/index.js')


function reduceDirectives (policy, defaultValue) {
	return (accumulator, directive) => {
		if (policy[directive] !== false) {
			accumulator[directive] = policy[directive] || defaultValue
		}

		return accumulator
	}
}


module.exports = function buildPermissionsPolicyHeaders(options = {}) {
	const {
		permissionsPolicy = {},
		permissionsPolicyDirectiveSupport = ['proposed', 'standard'],
	} = options

	if (permissionsPolicy === false) {
		return []
	}

	const supportedDirectives = Array.from(new Set(permissionsPolicyDirectiveSupport
		.map(directiveSet => directives[directiveSet])
		.flat()))
		
	return [
		{
			key: 'Feature-Policy',
			value: crunchFeaturePolicyHeader(supportedDirectives.reduce(reduceDirectives(permissionsPolicy, "'none'"))),
		},

		{
			key: 'Permissions-Policy',
			value: crunchPermissionsPolicyHeader(supportedDirectives.reduce(reduceDirectives(permissionsPolicy, ''))),
		},
	]
}
