module.exports = function crunchFeaturePolicyHeader(headerValue) {
	return Object.entries(headerValue)
		.reduce((accumulator, [key, value]) => {
			let serializedValue = value

			if (!Array.isArray(value)) {
				serializedValue = [value]
			}

			return `${accumulator}${key} ${serializedValue.join(' ')};`
		}, '')
}
