export type CSPDirectiveConfigValue = false | string | string[]

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
type CSPRequiredDirectiveNamesTuple = typeof CSP_REQUIRED_DIRECTIVE_NAMES
type CSPRequiredDirectiveNames = CSPRequiredDirectiveNamesTuple[number]
type CSPRequiredDirectivesConfig = {
  [Name in CSPRequiredDirectiveNames]?: CSPDirectiveConfigValue
}
type CSPRequiredDirectivesDefaults = {
  [Name in CSPRequiredDirectiveNames]: string
}
export const CSP_REQUIRED_DIRECTIVE_DEFAULTS: Required<
  CSPRequiredDirectivesDefaults
> = {
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

export const CSP_DEVELOPMENT_DIRECTIVE_NAMES = [
  'connect-src',
  'script-src',
  'style-src',
] as const
type CSPDevelopmentDirectiveNamesTuple = typeof CSP_DEVELOPMENT_DIRECTIVE_NAMES
type CSPDevelopmentDirectiveNames = CSPDevelopmentDirectiveNamesTuple[number]
type CSPDevelopmentDirectivesDefaults = {
  [Name in CSPDevelopmentDirectiveNames]: string
}
export const CSP_DEVELOPMENT_DIRECTIVES: CSPDevelopmentDirectivesDefaults = {
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
type CSPOptionalDirectiveNamesTuple = typeof CSP_OPTIONAL_DIRECTIVE_NAMES
export type CSPOptionalDirectiveNames = CSPOptionalDirectiveNamesTuple[number]
type CSPOptionalDirectivesConfig = {
  [Name in CSPOptionalDirectiveNames]?: CSPDirectiveConfigValue
}

export const CSP_REPORT_DIRECTIVE_NAMES = ['report-to', 'report-uri'] as const
type CSPReportDirectiveNamesTuple = typeof CSP_REPORT_DIRECTIVE_NAMES
export type CSPReportDirectiveNames = CSPReportDirectiveNamesTuple[number]
type CSPReportDirectivesConfig = {
  [Name in CSPReportDirectiveNames]?: CSPDirectiveConfigValue
}

export const CSP_DIRECTIVE_NAMES = [
  ...CSP_REQUIRED_DIRECTIVE_NAMES,
  ...CSP_OPTIONAL_DIRECTIVE_NAMES,
  ...CSP_REPORT_DIRECTIVE_NAMES,
]

export type CSPDirectivesConfig = CSPRequiredDirectivesConfig &
  CSPOptionalDirectivesConfig &
  CSPReportDirectivesConfig

const CSP_OPTION_NAMES = ['mergeDefaultDirectives', 'reportOnly'] as const
type CSPOptionNamesTuple = typeof CSP_OPTION_NAMES
type CSPOptionNames = CSPOptionNamesTuple[number]
type CSPOptionsConfig = {
  [Name in CSPOptionNames]?: Boolean
}

export type CSPConfig = CSPDirectivesConfig & CSPOptionsConfig
