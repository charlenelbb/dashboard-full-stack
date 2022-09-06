const isDevelopment = () => process.env.NODE_ENV === 'development'

const CURRENT_APP_PORT = 3000

const CURRENT_APP_HOST = `http://localhost:${CURRENT_APP_PORT}/`

module.exports = {
	isDevelopment,
	CURRENT_APP_PORT,
	CURRENT_APP_HOST,
}
