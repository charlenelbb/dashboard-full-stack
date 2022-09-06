const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const packageName = require(path.resolve(__dirname, '..', './package.json')).name

module.exports = (env) => {
	const isProd = env === 'prod'
	return {
		entry: path.resolve(__dirname, '..', './src/index.js'),
		resolve: {
			alias: {
				'@src': path.resolve(__dirname, '..', './src/'),
			},
			extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
		},
		module: {
			rules: [
				{
					oneOf: [
						{
							test: /\.(ts|js)x?$/,
							exclude: /node_modules/,
							use: [
								{
									loader: 'babel-loader',
									options: {
										cacheDirectory: true,
										cacheCompression: false,
									},
								},
							],
						},
						{
							test: /\.css$/,
							exclude: /node_modules/,
							use: [
								isProd ? MiniCssExtractPlugin.loader : 'style-loader',
								{
									loader: 'css-loader',
									options: {
										modules: {
											localIdentName: '[local]--[hash:base64:5]',
										},
									},
								},
								'postcss-loader',
							],
						},
						{
							test: /\.svg$/,
							use: ['@svgr/webpack'],
							include: path.resolve(__dirname, '../src/components/svgComponent'),
						},
						{
							test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/,
							type: 'asset',
							parser: {
								dataUrlCondition: {
									maxSize: 10 * 1024,
								},
							},
						},
						{
							test: /\.(woff2?|ttf)$/,
							type: 'asset/resource',
						},
					],
				},
			],
		},
		output: {
			path: isProd ? path.resolve(__dirname, '..', './static') : void 0,
			library: `${packageName}`,
			libraryTarget: 'umd',
			chunkLoadingGlobal: `webpackJsonp_${packageName}`,
			clean: true,
			filename: isProd ? 'scripts/[name].[chunkhash].js' : 'scripts/[name].js',
			chunkFilename: isProd ? 'scripts/[name].chunk.[chunkhash].js' : 'scripts/[name].chunk.js',
			assetModuleFilename: 'assets/[name][hash:8][ext][query]',
		},
		plugins: [
			isProd
				? new MiniCssExtractPlugin({
						filename: 'css/[name].[contenthash:10].css',
						chunkFilename: 'css/[name].[contenthash:10].chunk.css',
				  })
				: void 0,
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '..', './public/index.html'),
			}),
		].filter(Boolean),
		optimization: {
			// 代码分割配置
			splitChunks: {
				chunks: 'all',
				cacheGroups: {
					react: {
						test: /[\\/]node_modules[\\/](react|react-dom|react-query|react-router|react-router-dom)[\\/]/,
						name: 'chunk-react',
						priority: 40,
					},
					'xt-design': {
						test: /[\\/]node_modules[\\/](xt-design)[\\/]/,
						name: 'chunk-xt-design',
						priority: 30,
					},
					libs: {
						test: /[\\/]node_modules[\\/]/,
						name: 'chunk-libs',
						priority: 20,
					},
				},
			},

			runtimeChunk: {
				name: (entrypoint) => `runtime-${entrypoint.name}`,
			},
			minimize: isProd,
			minimizer: [`...`, new CssMinimizerPlugin()],
		},
	}
}
