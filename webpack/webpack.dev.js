const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { CURRENT_APP_PORT, CURRENT_APP_HOST } = require('./utils')

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	output: {
		publicPath: CURRENT_APP_HOST,
	},
	cache: {
		type: 'filesystem',
		allowCollectingMemory: true,
	},
	devServer: {
		hot: true,
		port: CURRENT_APP_PORT,
		historyApiFallback: true,
		client: {
			overlay: {
				errors: false,
				warnings: false,
			},
		},
		allowedHosts: 'all',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new ReactRefreshWebpackPlugin(),
	],
}
