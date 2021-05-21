const experimentalDirectives = require('./experimentalDirectives.js')
const legacyDirectives = require('./legacyDirectives.js')
const proposedDirectives = require('./proposedDirectives.js')
const standardDirectives = require('./standardDirectives.js')

module.exports = {
	experimental: experimentalDirectives,
	legacy: legacyDirectives,
	proposed: proposedDirectives,
	standard: standardDirectives,
}
