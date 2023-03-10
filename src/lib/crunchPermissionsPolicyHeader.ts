import { type PermPolicyConfig } from '../models/nextSafe'

export const crunchPermissionsPolicyHeader = (
  headerValue: PermPolicyConfig
): string => {
  return Object.entries(headerValue)
    .reduce<string[]>((accumulator, [key, value]) => {
      const serializedValues = Array.isArray(value)
        ? value
        : typeof value === 'string'
        ? value.split(' ')
        : []

      const serializedValue = serializedValues.map((item) => {
        // Remove unnecessary quotes from tokens
        if (item.includes('*')) {
          return '*'
        }

        if (item === "'self'") {
          return 'self'
        }

        // Add quotes to all items that aren't tokens
        if (!['*', 'self'].includes(item) && !/^['"].*['"]$/) {
          return item.replace(/^['"]/, '"').replace(/['"]$/, '"')
        }

        return item
      })

      accumulator.push(`${key}=(${serializedValue.join(' ')})`)
      return accumulator
    }, [])
    .join(',')
}
