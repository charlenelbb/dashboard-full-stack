const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

module.exports = (envVars) => {
	const { env, extra } = envVars

	const envConfig = require(`./webpack.dev.js`)

	let extraConfig = {}

	// 测试环境基本配置和生产配置保持一致，webpack.test.js可以覆盖基本配置
	if (extra) {
		extraConfig = require(`./webpack.${extra}.js`)
	}

	const config = merge(commonConfig(env), envConfig, extraConfig)

	return config
}
