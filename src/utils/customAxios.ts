import axios from 'axios'
import i18next from 'i18next'
import { logoutApi } from '../current_user/currentUserSlice'
import { localeKeys } from './localeConstants'
import { envConfig } from '../config'
import { apiHeaders } from './apiConstants'
import { getTokenFromLocalStorage, removeTokenFromLocalStorage, removeUserFromLocalStorage } from './localStorage'
import { AnyData } from './utils'

export const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

// Create an instance of Axios with custom configurations
const customFetch = axios.create({
	baseURL: envConfig.app.baseurl,
	headers: {
		Accept: apiHeaders.acceptType,
	},
	timeout: 30000,
})

// Function to initialize interceptors
export const initializeInterceptors = (store: AnyData) => {
	// Add request interceptors
	customFetch.interceptors.request.use(
		(config) => {
			const token: string | null = getTokenFromLocalStorage()

			if (token) {
				config.headers[apiHeaders.accessToken] = token
			}

			config.headers[apiHeaders.today] = new Date().toISOString()
			config.headers[apiHeaders.deviceType] = 'Web'
			config.headers[apiHeaders.timezone] = timezone
			config.headers[apiHeaders.language] = i18next.language

			if (!config.headers[apiHeaders.preventDefaultLoader]) {
				store.dispatch({ type: 'currentUser/updateIsLoading', payload: true })
				store.dispatch({ type: 'currentUser/setIsFetchingData', payload: true })
			}

			return config // Ensure the request interceptor returns the config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	// Add response interceptors
	customFetch.interceptors.response.use(
		(response) => {
			if (!response.config.headers[apiHeaders.preventDefaultToastSuccess]) {
				if (response?.data?.message) {
					store.dispatch({
						type: 'currentUser/updateToastData',
						payload: {
							showToast: true,
							title: '',
							subTitle: response?.data?.message,
							isSuccess: true,
						},
					})
				}
			}

			if (!response.config.headers[apiHeaders.preventDefaultLoader]) {
				store.dispatch({ type: 'currentUser/updateIsLoading', payload: false })
				store.dispatch({ type: 'currentUser/setIsFetchingData', payload: false })
			}

			if (response.config.headers[apiHeaders.preventDefaultLoader]) {
				store.dispatch({ type: 'currentUser/setIsFetchingData', payload: false })
			}

			delete response?.config?.headers[apiHeaders.preventDefaultLoader]
			delete response?.config?.headers[apiHeaders.preventDefaultToastSuccess]

			return response
		},
		(error) => {
			if (error?.response?.status === 401) {
				store.dispatch(logoutApi(''))
				removeTokenFromLocalStorage()
				removeUserFromLocalStorage()
				// window.location.href = routePaths.home
				store.dispatch({ type: 'logout' })
			}

			const errorMessage =
				error.code === 'ECONNABORTED'
					? localeKeys.timeoutError
					: error?.response?.data?.message ??
					  error?.response?.data?.error ??
					  error?.response?.data?.errors ??
					  error?.message ??
					  localeKeys.crashError

			error.errorMessage = errorMessage

			if (!error.config.headers[apiHeaders.preventDefaultToastFailure]) {
				if (errorMessage) {
					store.dispatch({
						type: 'currentUser/updateToastData',
						payload: {
							showToast: true,
							title: '',
							subTitle: errorMessage,
							isSuccess: false,
						},
					})
				}
			}

			if (!error.config.headers[apiHeaders.preventDefaultLoader]) {
				store.dispatch({ type: 'currentUser/updateIsLoading', payload: false })
				store.dispatch({ type: 'currentUser/setIsFetchingData', payload: false })
			}

			delete error?.config?.headers[apiHeaders.preventDefaultLoader]
			delete error?.config?.headers[apiHeaders.preventDefaultToastFailure]

			return Promise.reject(error)
		}
	)
}

export default customFetch
