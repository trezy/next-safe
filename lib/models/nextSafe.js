require('./CSP');


/**
 * Response header key-value pair
 * @typedef {Object} Header
 * @property {string} key
 * @property {string} value
 */

/**
 * @typedef {(string|false)} HeaderConfig
 */

/**
 * @typedef {('experimental'|'legacy'|'proposed'|'standard')} PermPolicyDirectiveList
 */

/**
 * nextSafe's primary config object
 * @typedef {Object} NextSafeConfig
 * @property {HeaderConfig} [contentTypeOptions]
 * @property {(CSPConfig|false)} [contentSecurityPolicy]
 * @property {HeaderConfig} [frameOptions]
 * @property {(Object<string, string|false>|false)} [permissionsPolicy]
 * @property {PermPolicyDirectiveList[]} [permissionsPolicyDirectiveSupport]
 * @property {boolean} [isDev]
 * @property {HeaderConfig} [referrerPolicy]
 * @property {HeaderConfig} [xssProtection]
 *
 */
