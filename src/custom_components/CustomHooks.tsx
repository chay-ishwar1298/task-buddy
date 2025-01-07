import { AppDispatch, RootState } from '../utils/store'
import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Generic hook for debouncing any type of value
export function useDebounce<T>(value: T, delay: number): T {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		// Set debouncedValue to value (passed in) after the specified delay
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}
