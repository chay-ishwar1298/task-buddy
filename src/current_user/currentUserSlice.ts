import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchStatsThunk, getMiscellaneousThunk, loginThunk, logoutThunk, uploadImageToS3BucketThunk } from './currentUserThunk'
import { removeTokenFromLocalStorage, removeUserFromLocalStorage } from '../utils/localStorage'

export interface UserMetrics {
	totalUsers: number
	activeUsers: number
	dormantUsers: number
}

export interface DeviceDistributionDetails {
	deviceType: string
	sessions: number
	percentage: number
}

export interface DeviceMetrics {
	deviceDistributionDetails: DeviceDistributionDetails[]
	totalDevices: number
}

export interface Metrics {
	deviceMetrics: DeviceMetrics
	userMetrics: UserMetrics
}

export interface StatsResponse {
	totalUsers: number
	newLogins: number
	returnedUsers: number
	averageTimeSpent: number
	metrics: Metrics
}

export interface LoginResponse {
	_id: string
	emailId: string
	isPhoneVerified: boolean
	isActive: boolean
	isReauthenticated: boolean
	isPMUser: boolean
	isDeleted: boolean
	isEmailVerified: boolean
	displayName: string
	fullName: string
	phoneNumber: string
	city: string
	country: string
	dob: string
	profession: string
	state: string
	signUpAuthType: string
	adminAccessToken: string
}

export interface s3UploadThunkProps {
	s3Link: string
	file: File
	contentType: string
}
export interface MiscellaneousRes {
	quickPicks: Record<string, string>
}
// slice data structure
export interface CurrentUserProps {
	isLoading: boolean
	hideLoader: boolean
	showToast: boolean
	title: string
	subTitle: string
	isSuccess: boolean
	anchorOrigin: { vertical: 'top' | 'bottom'; horizontal: 'right' | 'left' | 'center' }
	profileData: string
	isFetchingData: boolean
	isRefreshing: boolean
	miscellaneous: MiscellaneousRes | null
	stats: StatsResponse | null
}

//intial state
const initialState: CurrentUserProps = {
	isLoading: false,
	hideLoader: false,
	showToast: false,
	title: '',
	subTitle: '',
	isSuccess: true,
	anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
	profileData: '',
	isFetchingData: false,
	isRefreshing: false,
	miscellaneous: null,
	stats: null,
}

// async thunks for profile api calls
export const logoutApi = createAsyncThunk('currentUser/logout', logoutThunk)
export const getMiscellaneous = createAsyncThunk('currentUser/getMiscellaneous', getMiscellaneousThunk)
export const uploadImageToS3 = createAsyncThunk('currentUser/uploadS3', uploadImageToS3BucketThunk)

export const loginApi = createAsyncThunk('currentUser/login', loginThunk)
export const fetchStats = createAsyncThunk('currentUser/fetchStats', fetchStatsThunk)

//slice for currently logged in user
const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setHideLoader: (state, { payload }) => {
			state.hideLoader = payload
		},

		setIsRefreshing: (state, { payload }) => {
			state.isRefreshing = payload
		},

		updateIsLoading: (state, { payload }) => {
			state.isLoading = payload
		},

		updateShowToast: (state, { payload }) => {
			state.showToast = payload
		},
		updateToastData: (state, { payload }) => {
			state.title = payload.title
			state.subTitle = payload.subTitle
			state.isSuccess = payload.isSuccess
			state.anchorOrigin = payload.anchorOrigin
			state.showToast = payload.showToast
		},
		setIsFetchingData: (state, { payload }) => {
			state.isFetchingData = payload
		},
		clearCurrentUser: () => initialState,
	},

	extraReducers: (builder) => {
		// Handle the fulfilled case of the login API call
		builder
			.addCase(logoutApi.fulfilled, (state) => {
				state.profileData = ''
				removeUserFromLocalStorage()
				removeTokenFromLocalStorage()
			})
			.addCase(logoutApi.rejected, (state) => {
				state.profileData = ''
				removeUserFromLocalStorage()
				removeTokenFromLocalStorage()
			})
			.addCase(getMiscellaneous.fulfilled, (state, action) => {
				state.miscellaneous = action.payload.data.data
			})
			.addCase(fetchStats.fulfilled, (state, action) => {
				state.stats = action.payload.data.data
			})
	},
})

export const { setHideLoader, updateIsLoading, updateShowToast, updateToastData, clearCurrentUser, setIsFetchingData, setIsRefreshing } =
	currentUserSlice.actions
export default currentUserSlice.reducer
