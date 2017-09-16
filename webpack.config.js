const webpack = require('webpack'),
	  path = require('path'),
	  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['es2015']
				}
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin()
	]

};
