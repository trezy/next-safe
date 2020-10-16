import { experimentalDirectives } from './experimentalDirectives.js'
import { legacyDirectives } from './legacyDirectives.js'
import { proposedDirectives } from './proposedDirectives.js'
import { standardDirectives } from './standardDirectives.js'

export const directives = {
  experimental: experimentalDirectives,
  legacy: legacyDirectives,
  proposed: proposedDirectives,
  standard: standardDirectives,
}
