import experimentalDirectives from './experimentalDirectives'
import legacyDirectives from './legacyDirectives'
import proposedDirectives from './proposedDirectives'
import standardDirectives from './standardDirectives'

const directives = {
	experimental: experimentalDirectives,
	legacy: legacyDirectives,
	proposed: proposedDirectives,
	standard: standardDirectives,
} as const

export default directives
