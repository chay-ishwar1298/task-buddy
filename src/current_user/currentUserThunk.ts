import { apiEndPoints, apiHeaders } from '../utils/apiConstants'
import customFetch from '../utils/customAxios'
import { addTokenToLocalStorage, addUserToLocalStorage, removeTokenFromLocalStorage, removeUserFromLocalStorage } from '../utils/localStorage'
import { AnyData } from '../utils/utils'
import { s3UploadThunkProps } from './currentUserSlice'

/**
 * Asynchronous thunk for logging out the current user.
 *
 * @function
 * @async
 * @returns {Promise<{ data: any } | Error>} A Promise that resolves to the response data or an Error if the request fails.
 * @throws {Error} If the logout request encounters an error.
 */
export const logoutThunk = async (_: AnyData, thunkApi: AnyData) => {
	try {
		const response = await customFetch.put(apiEndPoints.logout, {})
		thunkApi.dispatch({ type: 'logout' })
		removeUserFromLocalStorage()
		removeTokenFromLocalStorage()
		return { data: response.data }
	} catch (error) {
		return error
	}
}

export const getMiscellaneousThunk = async () => {
	const response = await customFetch.get(apiEndPoints.logout, {
		headers: {
			[apiHeaders.preventDefaultLoader]: true,
		},
	})

	// Return the response data with the specified type
	return { data: response.data }
}

export const uploadImageToS3BucketThunk = async ({ s3Link, file, contentType }: s3UploadThunkProps, { rejectWithValue }: AnyData) => {
	try {
		const response = await customFetch.put('', file, {
			baseURL: s3Link,
			headers: {
				[apiHeaders.contentType]: contentType,
				[apiHeaders.uploadToS3]: true,
			},
		})

		return { data: response.data }
	} catch (error) {
		return rejectWithValue({
			status: 'rejected',
			message: 'error uploading file',
		})
	}
}

export interface LoginRequest {
	emailId: string
	password: string
}

export const loginThunk = async (body: LoginRequest, { rejectWithValue }: AnyData) => {
	try {
		const response = await customFetch.post(apiEndPoints.login, body, {})

		addUserToLocalStorage(response.data.data)
		addTokenToLocalStorage(response.data.data.adminAccessToken)
		return { data: response.data }
	} catch (error: AnyData) {
		return rejectWithValue(error.errorMessage)
	}
}

export interface StatsRequest {
	filter?: {
		dates: number
	}
}

export const fetchStatsThunk = async (body: StatsRequest, { rejectWithValue }: AnyData) => {
	try {
		const response = await customFetch.post(apiEndPoints.dashboard, body, {
			headers: {
				[apiHeaders.preventDefaultLoader]: true,
			},
		})

		return { data: response.data }
	} catch (error: AnyData) {
		return rejectWithValue(error.errorMessage)
	}
}
