import { EnvConfigProps } from './types'

export const envConfig: EnvConfigProps = {
	app: {
		environment: String(process.env.REACT_APP_ENV),
		title: String(process.env.REACT_APP_TITLE),
		baseurl: String(process.env.REACT_APP_BASE_URL),
		theme: String(process.env.REACT_APP_CURRENT_THEME),
	},
	keys: {
		localStorageKey: String(process.env.REACT_APP_LOCAL_STORAGE_KEY),
	},
	firebase: {
		apiKey: String(process.env.REACT_APP_API_KEY),
		authDomain: String(process.env.REACT_APP_AUTH_DOMAIN),
		projectId: String(process.env.REACT_APP_PROJECT_ID),
		storageBucket: String(process.env.REACT_APP_STORAGE_BUCKET),
		messagingSenderId: String(process.env.REACT_APP_MESSAGING_SENDER_ID),
		appId: String(process.env.REACT_APP_APP_ID),
		measurementId: String(process.env.REACT_APP_MEASUREMENT_ID),
	},
}
