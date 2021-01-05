// Local imports
import { buildCSPHeaders } from '../lib/buildCSPHeaders'





// Local constants
const DEFAULT_CSP = {
	'base-uri': '\'none\'',
	'child-src': '\'none\'',
	'connect-src': '\'self\'',
	'default-src': '\'self\'',
	'font-src': '\'self\'',
	'form-action': '\'self\'',
	'frame-ancestors': '\'none\'',
	'frame-src': '\'none\'',
	'img-src': '\'self\'',
	'manifest-src': '\'self\'',
	'object-src': '\'none\'',
	'prefetch-src': '\'self\'',
	'script-src': '\'self\'',
	'style-src': '\'self\'',
	'worker-src': '\'self\'',
}





describe('buildCSPHeaders', () => {
	function testCSPWithConfig(testName, config) {
		test('with defaults', () => {
			const builtCSPHeaders = buildCSPHeaders(config)
			const expectedCSP = {
				...DEFAULT_CSP,
				...(config?.contentSecurityPolicy || {}),
			}

			if (config?.isDev) {
				if (!config.contentSecurityPolicy?.['connect-src']) {
					expectedCSP['connect-src'] = '\'self\' webpack://*'
				}

				if (!config.contentSecurityPolicy?.['script-src']) {
					expectedCSP['script-src'] = '\'self\' \'unsafe-eval\''
				}

				if (!config.contentSecurityPolicy?.['style-src']) {
					expectedCSP['style-src'] = '\'self\' \'unsafe-inline\''
				}
			}

			expect(builtCSPHeaders).toBeInstanceOf(Array)
			expect(builtCSPHeaders).toHaveLength(3)

			builtCSPHeaders.forEach(header => {
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
