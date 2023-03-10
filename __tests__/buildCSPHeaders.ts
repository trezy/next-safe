// Local imports
import { buildCSPHeaders } from '../src/lib/buildCSPHeaders'
import { CSP_REQUIRED_DIRECTIVE_DEFAULTS } from '../src/models/CSP'
import { type NextSafeConfig } from '../src/models/nextSafe'

describe('buildCSPHeaders', () => {
  function testCSPWithConfig(testName: string, config?: NextSafeConfig) {
    test(testName, () => {
      const builtCSPHeaders = buildCSPHeaders(config)
      const expectedCSP = {
        ...CSP_REQUIRED_DIRECTIVE_DEFAULTS,
        ...(config?.contentSecurityPolicy || {}),
      }

      if (config?.isDev && config.contentSecurityPolicy !== false) {
        if (!config.contentSecurityPolicy?.['connect-src']) {
          expectedCSP['connect-src'] = "'self' webpack://*"
        }

        if (!config.contentSecurityPolicy?.['script-src']) {
          expectedCSP['script-src'] = "'self' 'unsafe-eval'"
        }

        if (!config.contentSecurityPolicy?.['style-src']) {
          expectedCSP['style-src'] = "'self' 'unsafe-inline'"
        }
      }

      expect(builtCSPHeaders).toBeInstanceOf(Array)
      expect(builtCSPHeaders).toHaveLength(3)

      builtCSPHeaders.forEach((header) => {
        Object.entries(expectedCSP).forEach(([key, value]) => {
          expect(header.value).toContain(`${key} ${value};`)
        })
      })
    })
  }

  describe('production mode', () => {
    testCSPWithConfig('with defaults')

    testCSPWithConfig('with customized config', {
      contentSecurityPolicy: {
        'base-uri': 'https://trezy.com',
      },
    })
  })

  describe('development mode', () => {
    testCSPWithConfig('with defaults', {
      isDev: true,
    })

    testCSPWithConfig('with customized config', {
      contentSecurityPolicy: {
        'base-uri': 'https://trezy.com',
      },
      isDev: true,
    })
  })
})
