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
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin()
	],
	
	devtool: 'source-map'

};
