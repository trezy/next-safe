// Module imports
import buildCSPString from 'content-security-policy-builder'





export function buildCSPHeaders(options = {}) {
  const {
    csp,
    isDev,
  } = options

  // Content Security Policy
  const directives = {
    baseUri: csp.baseUri || "'none'",
    connectSrc: csp.connectSrc || "'none'",
    defaultSrc: csp.defaultSrc || "'none'",
    fontSrc: csp.fontSrc || "'none'",
    frameSrc: csp.frameSrc || "'none'",
    imgSrc: csp.imgSrc || "'none'",
    scriptSrc: csp.scriptSrc || "'self'",
    styleSrc: csp.styleSrc || "'self'",
  }

  if (isDev) {
    directives.connectSrc.push(['webpack://*'])
    directives.scriptSrc.push(["'unsafe-eval'"])
  }

  const cspString = buildCSPString({ directives })
  const cspHeaderNames = ['Content-Security-Policy', 'X-Content-Security-Policy', 'X-WebKit-CSP']

  return cspHeaderNames.map(headerName => ({
    key: headerName,
    value: cspString,
  }))
}
