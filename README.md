# next-safe
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

`next-safe` helps secure your Next.js apps by providing sensible defaults for the most common security headers, including:

* [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
* [`Permissions-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy) (formerly known as `Feature-Policy`)
* [`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
* [`X-Content-Type-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
* [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
* [`X-XSS-Protection`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection)

## Quick Start

### Requirements

* `npm` or Yarn
* Node.js
* Next.js 9.5+

### Installation

```sh
npm install next-safe

# OR

yarn add next-safe
```

### Usage

`next-safe` exports a single function that generates all of your headers. In your `next.config.js` file, you can pass these directly into the `headers` key for any route you want to set the headers on.

```js
const nextSafe = require('next-safe')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
	async headers () {
		return [
			{
				source: '/:path*',
				headers: nextSafe({ isDev }),
			},
		]
	},
}
```

By default, this sets all of the headers you need and provides substantial protections for your Next.js application. However, the defaults are also *super strict*. See the [Configuration](#configuration) section for details on how to make `next-safe` a bit more flexible.

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

---

### `contentTypeOptions`

#### Default

`nosniff`

#### Description

`contentTypeOptions` controls the value of the `X-Content-Type-Options` header, which tells the browser not to change the MIME types for any downloaded content.

Set to `false` to disable the `X-Content-Type-Options` header.

---

### `contentSecurityPolicy`

#### Default

```js
{
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
		"object-src": "'none'",
		"prefetch-src": "'self'",
		"script-src": "'self'",
		"style-src": "'self'",
		"worker-src": "'self'",
	},
}
```

Additionally, if `isDev` is set to `true`:

```js
{
	contentSecurityPolicy: {
		"connect-src": "webpack://*",
		"script-src": "'unsafe-eval'",
		"style-src": "'unsafe-inline'",
	},
}
```

#### Description

`contentSecurityPolicy` controls the `Content-Security-Policy` header. It takes an object, in which each key is a CSP directive and the value of that key is an array of sources. For example:

```js
{
	contentSecurityPolicy: {
		"img-src": ["'self'", "unsplash.com"],
	},
}
```

Note that `'self'` is in quotes. This is a CSP thing and `next-safe` does not handle it for you. The special sources (such as `'self'`, `'none'`, etc) must be wrapped in single quotes.

#### Examples

##### Allow all sources from this website by default

```js
{
	contentSecurityPolicy: {
		"default-src": ["'self'"],
	},
}
```

##### Restrict the URIs that can be used in the `<base>` element

```js
{
	contentSecurityPolicy: {
		"base-uri": ["example.com", "foo.example.com", "bar.example.com"],
	},
}
```

##### Force the browser to use `https://` for all `http://` links

```js
{
	contentSecurityPolicy: {
		"upgrade-insecure-requests": [],
	},
}
```

##### Disable the `prefetch-src` directive

```js
{
	contentSecurityPolicy: {
		"prefetch-src": false,
	},
}
```

##### Disable CSP entirely (NOT recommended)

```js
{
	contentSecurityPolicy: false,
}
```

#### `contentSecurityPolicy.reportOnly`

Setting `contentSecurityPolicy.reportOnly` to `true` will rename the `Content-Security-Policy` header to `Content-Security-Policy-Report-Only`. This is useful if you want to test your CSP without breaking your site. Make sure to also set up an endpoint to receive the reports, then set up your [`contentSecurityPolicy.report-to`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-to) field to point to the endpoint.

---

### `frameOptions`

#### Default

`DENY`

#### Description

`frameOptions` controls the value of the `X-Frame-Options` header.

Set to `false` to disable the `X-Frame-Options` header.

---

### `permissionsPolicy`

#### Description

`permissionsPolicy` controls the value of the `Permissions-Policy` header, as well as the legacy `Feature-Policy` header. This header is used to enable/disable certain features for a website.

By default, all features are set to `'none'` unless you tell `next-safe` otherwise.

Set to `false` to disable `Permissions-Policy` and `Feature-Policy` entirely.

---

### `permissionsPolicyDirectiveSupport`

#### Default

```js
{
	permissionsPolicyDirectiveSupport: ["proposed", "standard"],
}
```

#### Description

The `Permissions-Policy` header has had a bit of a rocky history, and as such the list of features/permissions has changed *a lot*. To help manage this, `next-safe` provides 4 different sets of directive support.

To include a list of directives, just add it to the `permissionsPolicyDirectiveSupport` array. For example, to add support for experimental directives:

```js
{
	permissionsPolicyDirectiveSupport: ["proposed", "standard", "experimental"],
}
```

The below table lists all of the features included in each of the 4 directive sets.

| Directive Set | Included Directives |
| - | - |
| `standard` | `accelerometer`<br>`ambient-light-sensor`<br>`autoplay`<br>`battery`<br>`camera`<br>`cross-origin-isolated`<br>`display-capture`<br>`document-domain`<br>`encrypted-media`<br>`execution-while-not-rendered`<br>`execution-while-out-of-viewport`<br>`fullscreen`<br>`geolocation`<br>`gyroscope`<br>`magnetometer`<br>`microphone`<br>`midi`<br>`navigation-override`<br>`payment`<br>`picture-in-picture`<br>`publickey-credentials-get`<br>`screen-wake-lock`<br>`sync-xhr`<br>`usb`<br>`web-share`<br>`xr-spatial-tracking` |
| `proposed` | `clipboard-read`<br>`clipboard-write`<br>`gamepad`<br>`speaker-selection` |
| `experimental` | `conversion-measurement`<br>`focus-without-user-activation`<br>`hid`<br>`idle-detection`<br>`serial`<br>`sync-script`<br>`trust-token-redemption`<br>`vertical-scroll` |
| `legacy` | `animations`<br>`document-write`<br>`image-compression`<br>`layout-animations`<br>`legacy-image-formats`<br>`max-downscaling-image`<br>`notifications`<br>`oversized-images`<br>`push`<br>`speaker`<br>`unsized-media`<br>`vibrate`<br>`vr`<br>`wake-lock`<br>`webauthn`<br>`web-share` |

---

### `isDev`

#### Default

`false`

#### Description

This tells `next-safe` if it should be operating in development mode. Specifically, it adds some values to the CSP header to allow the site to continue operating when running `next dev`.

---

### `referrerPolicy`

#### Default

`no-referrer`

#### Description

`referrerPolicy` controls the `Referrer-Policy` header, which tells the browser whether or not to send the `Referrer` header when the site makes a request, or the user clicks on a link.

Set to `false` to disable the `Referrer-Policy` header.

---

### `xssProtection`

#### Default

`1; mode=block`

#### Description

`xssProtection` controls the value of the `X-XSS-Protection` header. This header is mostly for backwards compatibility. It enables some security features in older browsers that dobn't support CSP.

Set to `false` to disable the `X-XSS-Protection` header.

---

## Troubleshooting

### Why won't web workers load in Safari?

Safari (as of 09-2021) has not yet implemented the `worker-src` directive. To use workers, you must set `child-src` to match your `worker-src` directives, or explicitly set it to `'self'`.

### Why do some browsers throw header parsing errors?

Not all browsers treat duplicate headers the same way when parsing for protection settings. You are likely encountering this error because a server between your app and the browser is adding the same security headers. If you're serving your app through a reverse proxy (e.g. NGINX), remove the headers from your proxy's config, or disable the erroring header via `next-safe`'s config.

### Why are there so many duplicate headers?

In some cases, `next-safe` sends the same header under different header names to support backwards compatibility. For example, `Content-Security-Policy` is the header that all modern browsers support, but when CSP was still in its infancy various browsers decided to use the `X-Content-Security-Policy` or `X-WebKit-CSP` headers. `next-safe` uses the same content for these headers, but still sends them to support older browsers.

### Why do I see so many `⚠️ Unrecognized Feature` warnings?

Not all browsers are as up-to-date as `next-safe` with the standardized features of the `Permissions-Policy` header. As such, some features will cause warnings to show up in the console. These can also occur if you're using the `experimental` or `legacy` feature lists. These warnings are harmless and can safely be ignored.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://trezy.com"><img src="https://avatars.githubusercontent.com/u/442980?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Trezy</b></sub></a><br /><a href="https://github.com/trezy/next-safe/issues?q=author%3Atrezy" title="Bug reports">🐛</a> <a href="https://github.com/trezy/next-safe/commits?author=trezy" title="Code">💻</a> <a href="#example-trezy" title="Examples">💡</a> <a href="#ideas-trezy" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-trezy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-trezy" title="Maintenance">🚧</a> <a href="https://github.com/trezy/next-safe/pulls?q=is%3Apr+reviewed-by%3Atrezy" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/trezy/next-safe/commits?author=trezy" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/UncleClapton"><img src="https://avatars.githubusercontent.com/u/2686824?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cameron Welter</b></sub></a><br /><a href="https://github.com/trezy/next-safe/issues?q=author%3AUncleClapton" title="Bug reports">🐛</a> <a href="https://github.com/trezy/next-safe/commits?author=UncleClapton" title="Code">💻</a> <a href="#ideas-UncleClapton" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-UncleClapton" title="Maintenance">🚧</a> <a href="https://github.com/trezy/next-safe/commits?author=UncleClapton" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/zomars/"><img src="https://avatars.githubusercontent.com/u/3504472?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Omar López</b></sub></a><br /><a href="https://github.com/trezy/next-safe/commits?author=zomars" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!