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

By default, this sets all of the headers you need and provides substantial protections for your Next.js application. However, the defaults are also *super strict*. See the [Configuration](./configuration.md) section for details on how to make `next-safe` a bit more flexible.
