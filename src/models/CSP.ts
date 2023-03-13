export type CSPDirectiveConfigValue = string[] | string | false

export const CSP_REQUIRED_DIRECTIVE_NAMES = [
	'base-uri',
	'child-src',
	'connect-src',
	'default-src',
	'font-src',
	'form-action',
	'frame-ancestors',
	'frame-src',
	'img-src',
	'manifest-src',
	'media-src',
	'object-src',
	'prefetch-src',
	'script-src',
	'style-src',
	'worker-src',
] as const
type CSPRequiredDirectiveNames = (typeof CSP_REQUIRED_DIRECTIVE_NAMES)[number]

export const CSP_REQUIRED_DIRECTIVE_DEFAULTS: Record<CSPRequiredDirectiveNames, string> = {
	'base-uri': "'none'",
	'child-src': "'none'",
	'connect-src': "'self'",
	'default-src': "'self'",
	'font-src': "'self'",
	'form-action': "'self'",
	'frame-ancestors': "'none'",
	'frame-src': "'none'",
	'img-src': "'self'",
	'manifest-src': "'self'",
	'media-src': "'self'",
	'object-src': "'none'",
	'prefetch-src': "'self'",
	'script-src': "'self'",
	'style-src': "'self'",
	'worker-src': "'self'",
}

export const CSP_DEVELOPMENT_DIRECTIVE_NAMES = ['connect-src', 'script-src', 'style-src'] as const
type CSPDevelopmentDirectiveNames = (typeof CSP_DEVELOPMENT_DIRECTIVE_NAMES)[number]

export const CSP_DEVELOPMENT_DIRECTIVES: Record<CSPDevelopmentDirectiveNames, string> = {
	'connect-src': 'webpack://*',
	'script-src': "'unsafe-eval'",
	'style-src': "'unsafe-inline'",
}

export const CSP_OPTIONAL_DIRECTIVE_NAMES = [
	'block-all-mixed-content',
	'plugin-types',
	'navigate-to',
	'require-sri-for',
	'require-trusted-types-for',
	'sandbox',
	'script-src-attr',
	'script-src-elem',
	'style-src-attr',
	'style-src-elem',
	'trusted-types',
	'upgrade-insecure-requests',
] as const

export const CSP_REPORT_DIRECTIVE_NAMES = ['report-to', 'report-uri'] as const

export const CSP_DIRECTIVE_NAMES = [
	...CSP_REQUIRED_DIRECTIVE_NAMES,
	...CSP_OPTIONAL_DIRECTIVE_NAMES,
	...CSP_REPORT_DIRECTIVE_NAMES,
] as const

type CSPDirectiveNames = (typeof CSP_DIRECTIVE_NAMES)[number]
export type CSPDirectivesConfig = {
	[Name in CSPDirectiveNames]?: CSPDirectiveConfigValue
}

const CSP_OPTION_NAMES = ['mergeDefaultDirectives', 'reportOnly'] as const
type CSPOptionNames = (typeof CSP_OPTION_NAMES)[number]
type CSPOptionsConfig = {
	[Name in CSPOptionNames]?: boolean
}

export type CSPConfig = CSPDirectivesConfig & CSPOptionsConfig
