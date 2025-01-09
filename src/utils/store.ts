import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import currentUserSlice from '../current_user/currentUserSlice'
import { AnyData } from './utils'
import { envConfig } from '../config'

const appReducer = combineReducers({
	currentUser: currentUserSlice,
})

const rootReducer = (state: AnyData, action: AnyData) => {
	if (action.type === 'logout') {
		state = undefined // This clears the entire state
	}
	return appReducer(state, action)
}

export const store = configureStore({
	reducer: rootReducer,
	devTools: envConfig.app.environment !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
