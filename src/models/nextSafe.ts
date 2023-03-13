import type { CSPConfig } from './CSP'

/**
 * Response header key-value pair
 */
export interface Header {
	key: string
	value: string
}

export type HeaderConfig = string | false
export type PermPolicyConfigValue = string[] | string | false
export type PermPolicyConfig = Record<string, PermPolicyConfigValue>

export const PERM_POLICY_DIRECTIVE_NAMES = [
	'experimental',
	'legacy',
	'proposed',
	'standard',
] as const
export type PermPolicyDirectiveNames = (typeof PERM_POLICY_DIRECTIVE_NAMES)[number]

/**
 * nextSafe's primary config object
 */
export interface NextSafeConfig {
	contentTypeOptions?: HeaderConfig
	contentSecurityPolicy?: CSPConfig | false
	frameOptions?: HeaderConfig
	permissionsPolicy?: PermPolicyConfig | false
	permissionsPolicyDirectiveSupport?: PermPolicyDirectiveNames[]
	isDev?: boolean
	referrerPolicy?: HeaderConfig
	xssProtection?: HeaderConfig
}
