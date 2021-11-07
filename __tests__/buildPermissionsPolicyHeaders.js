const buildPermissionsPolicyHeaders = require('../lib/buildPermissionsPolicyHeaders')

describe('buildPermissionsPolicyHeaders', () => {

	test('with defaults', () => {
		const result = buildPermissionsPolicyHeaders()

		expect(result).toEqual(
			[
				{
					key: 'Feature-Policy',
					value: "clipboard-read 'none';clipboard-write 'none';gamepad 'none';speaker-selection 'none';accelerometer 'none';ambient-light-sensor 'none';autoplay 'none';battery 'none';camera 'none';cross-origin-isolated 'none';display-capture 'none';document-domain 'none';encrypted-media 'none';execution-while-not-rendered 'none';execution-while-out-of-viewport 'none';fullscreen 'none';geolocation 'none';gyroscope 'none';magnetometer 'none';microphone 'none';midi 'none';navigation-override 'none';payment 'none';picture-in-picture 'none';publickey-credentials-get 'none';screen-wake-lock 'none';sync-xhr 'none';usb 'none';web-share 'none';xr-spatial-tracking 'none';"
				},
				{
					key: 'Permissions-Policy',
					value: 'clipboard-read=(),clipboard-write=(),gamepad=(),speaker-selection=(),accelerometer=(),ambient-light-sensor=(),autoplay=(),battery=(),camera=(),cross-origin-isolated=(),display-capture=(),document-domain=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),navigation-override=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(),usb=(),web-share=(),xr-spatial-tracking=()'
				}
			]
		)
	})

	test('with custom config', () => {
		const result = buildPermissionsPolicyHeaders({
			permissionsPolicy: {
				battery: 'https://trezy.dev',
				gyroscope: '*'
			},
			permissionsPolicyDirectiveSupport: ["proposed", "standard", "experimental"],
		})

		expect(result).toEqual(
			[
				{
					key: 'Feature-Policy',
					value: "clipboard-read 'none';clipboard-write 'none';gamepad 'none';speaker-selection 'none';accelerometer 'none';ambient-light-sensor 'none';autoplay 'none';battery https://trezy.dev;camera 'none';cross-origin-isolated 'none';display-capture 'none';document-domain 'none';encrypted-media 'none';execution-while-not-rendered 'none';execution-while-out-of-viewport 'none';fullscreen 'none';geolocation 'none';gyroscope *;magnetometer 'none';microphone 'none';midi 'none';navigation-override 'none';payment 'none';picture-in-picture 'none';publickey-credentials-get 'none';screen-wake-lock 'none';sync-xhr 'none';usb 'none';web-share 'none';xr-spatial-tracking 'none';conversion-measurement 'none';focus-without-user-activation 'none';hid 'none';idle-detection 'none';serial 'none';sync-script 'none';trust-token-redemption 'none';vertical-scroll 'none';"
				},
				{
					key: 'Permissions-Policy',
					value: 'clipboard-read=(),clipboard-write=(),gamepad=(),speaker-selection=(),accelerometer=(),ambient-light-sensor=(),autoplay=(),battery=(https://trezy.dev),camera=(),cross-origin-isolated=(),display-capture=(),document-domain=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=(*),magnetometer=(),microphone=(),midi=(),navigation-override=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(),usb=(),web-share=(),xr-spatial-tracking=(),conversion-measurement=(),focus-without-user-activation=(),hid=(),idle-detection=(),serial=(),sync-script=(),trust-token-redemption=(),vertical-scroll=()'
				}
			]
		)
	})

})
