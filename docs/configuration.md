## Configuration

`next-safe` allows you to configure every header that it generates. Most config options may be set to `false` to disable the feature. Here are the default values for all config options.

```js
nextSafe({
	contentTypeOptions: "nosniff",
	contentSecurityPolicy: {
		"base-uri": "'none'",
		"child-src": "'none'",
		"connect-src": "'self'",
		"default-src": "'self'",
		"font-src": "'self'",
		"form-action": "'self'",
		"frame-ancestors": "'none'",
		"frame-src": "'none'",
		"img-src": "'self'",
		"manifest-src": "'self'",
		"media-src": "'self'",
		"object-src": "'none'",
		"prefetch-src": "'self'",
		"script-src": "'self'",
		"style-src": "'self'",
		"worker-src": "'self'",
		reportOnly: false,
	},
	frameOptions: "DENY",
	permissionsPolicy: {},
	permissionsPolicyDirectiveSupport: ["proposed", "standard"],
	isDev: false,
	referrerPolicy: "no-referrer",
	xssProtection: "1; mode=block",
})
```

For more information on each of these options, check out their documentation:

* [`contentSecurityPolicy`](./api/contentSecurityPolicy.md)
* [`contentTypeOptions`](./api/contentTypeOptions.md)
* [`frameOptions`](./api/frameOptions.md)
* [`isDev`](./api/isDev.md)
* [`permissionsPolicy`](./api/permissionsPolicy.md)
* [`permissionsPolicyDirectiveSupport`](./api/permissionsPolicyDirectiveSupport.md)
* [`xssProtection`](./api/xssProtection.md)
