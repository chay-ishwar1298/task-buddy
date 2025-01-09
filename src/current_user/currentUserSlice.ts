import { createSlice } from '@reduxjs/toolkit'

export interface s3UploadThunkProps {
	s3Link: string
	file: File
	contentType: string
}

// slice data structure
export interface CurrentUserProps {
	isLoading: boolean
	showToast: boolean
	title: string
	subTitle: string
	isSuccess: boolean
	anchorOrigin: { vertical: 'top' | 'bottom'; horizontal: 'right' | 'left' | 'center' }
	profileData: string
}

//intial state
const initialState: CurrentUserProps = {
	isLoading: false,
	showToast: false,
	title: '',
	subTitle: '',
	isSuccess: true,
	anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
	profileData: '',
}

// export const uploadImageToS3 = createAsyncThunk('currentUser/uploadS3', uploadImageToS3BucketThunk)

//slice for currently logged in user
const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
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

		clearCurrentUser: () => initialState,
	},

	extraReducers: () => {
		// Handle the fulfilled case of the login API call
	},
})

export const { updateIsLoading, updateShowToast, updateToastData, clearCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer
