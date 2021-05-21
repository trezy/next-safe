module.exports = function crunchPermissionsPolicyHeader(headerValue) {
	return Object.entries(headerValue)
		.reduce((accumulator, [key, value]) => {
			let serializedValue = value

			if (!Array.isArray(value)) {
				serializedValue = value.split(' ')
			}

			serializedValue = serializedValue.map(item => {
				// Remove unnecessary quotes from tokens
				if (item.includes('*')) {
					return '*'
				}

				if (item === "'self'") {
					return 'self'
				}

				// Add quotes to all items that aren't tokens
				if (!['*', 'self'].includes(item) && !/^['"].*['"]$/) {
					return item
						.replace(/^['"]/, '"')
						.replace(/['"]$/, '"')
				}

				return item
			})

			accumulator.push(`${key}=(${serializedValue.join(' ')})`)

			return accumulator
		}, [])
		.join(',')
}
