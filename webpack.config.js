// Module imports
const path = require('path')





module.exports = {
	devtool: 'source-map',
	entry: './lib/index.js',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader' },
			},
		],
	},
	output: {
		filename: 'index.js',
		globalObject: 'this',
		library: 'next-safe',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist'),
	},
}
