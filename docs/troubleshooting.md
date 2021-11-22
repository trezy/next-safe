## Troubleshooting

### Why won't web workers load in Safari?

Safari (as of 09-2021) has not yet implemented the `worker-src` directive. To use workers, you must set `child-src` to match your `worker-src` directives, or explicitly set it to `'self'`.

### Why do some browsers throw header parsing errors?

Not all browsers treat duplicate headers the same way when parsing for protection settings. You are likely encountering this error because a server between your app and the browser is adding the same security headers. If you're serving your app through a reverse proxy (e.g. NGINX), remove the headers from your proxy's config, or disable the erroring header via `next-safe`'s config.

### Why are there so many duplicate headers?

In some cases, `next-safe` sends the same header under different header names to support backwards compatibility. For example, `Content-Security-Policy` is the header that all modern browsers support, but when CSP was still in its infancy various browsers decided to use the `X-Content-Security-Policy` or `X-WebKit-CSP` headers. `next-safe` uses the same content for these headers, but still sends them to support older browsers.

### Why do I see so many `⚠️ Unrecognized Feature` warnings?

Not all browsers are as up-to-date as `next-safe` with the standardized features of the `Permissions-Policy` header. As such, some features will cause warnings to show up in the console. These can also occur if you're using the `experimental` or `legacy` feature lists. These warnings are harmless and can safely be ignored.
