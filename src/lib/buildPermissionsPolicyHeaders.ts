// Local imports
import { type NextSafeConfig, type PermPolicyConfig } from '../models/nextSafe'
import { crunchFeaturePolicyHeader } from './crunchFeaturePolicyHeader'
import { crunchPermissionsPolicyHeader } from './crunchPermissionsPolicyHeader'
import { directives } from './PermissionsPolicy'

const reduceDirectives = (
  supportedDirectives: string[],
  permissionsPolicy: PermPolicyConfig | false,
  defaultValue: string
): PermPolicyConfig => {
  if (permissionsPolicy === false) {
    return {}
  }

  return supportedDirectives.reduce<PermPolicyConfig>(
    (accumulator, directive) => {
      if (permissionsPolicy[directive] !== false) {
        accumulator[directive] = permissionsPolicy[directive] || defaultValue
      }

      return accumulator
    },
    {}
  )
}

type Options = Pick<
  NextSafeConfig,
  'permissionsPolicy' | 'permissionsPolicyDirectiveSupport' | 'isDev'
>

export const buildPermissionsPolicyHeaders = (options: Options = {}) => {
  const {
    permissionsPolicy = {},
    permissionsPolicyDirectiveSupport = ['proposed', 'standard'],
  } = options

  if (permissionsPolicy === false) {
    return []
  }

  const supportedDirectives = Array.from(
    new Set(
      permissionsPolicyDirectiveSupport
        .map((directiveSet) => directives[directiveSet])
        .flat()
    )
  )

  return [
    {
      key: 'Feature-Policy',
      value: crunchFeaturePolicyHeader(
        reduceDirectives(supportedDirectives, permissionsPolicy, "'none'")
      ),
    },
    {
      key: 'Permissions-Policy',
      value: crunchPermissionsPolicyHeader(
        reduceDirectives(supportedDirectives, permissionsPolicy, '')
      ),
    },
  ]
}
