import { type PermPolicyDirectiveNames } from '../../models/nextSafe'
import { experimentalDirectives } from './experimentalDirectives'
import { legacyDirectives } from './legacyDirectives'
import { proposedDirectives } from './proposedDirectives'
import { standardDirectives } from './standardDirectives'

export const directives: Record<PermPolicyDirectiveNames, string[]> = {
  experimental: experimentalDirectives,
  legacy: legacyDirectives,
  proposed: proposedDirectives,
  standard: standardDirectives,
}
