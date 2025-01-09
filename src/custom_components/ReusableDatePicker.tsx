import { Dispatch, ReactElement, SetStateAction } from 'react'
import ReactDatePicker from 'react-datepicker'
import { EmptyFunction } from '../utils/types'

interface ReusableDatePickerProps {
	value?: Date | null
	dateRange: boolean
	onSingleDateChange?: (date: Date | null) => void
	startDate?: Date | null
	endDate?: Date | null
	onDateRangeChange?: (startDate: Date | null, endDate: Date | null) => void
	setAnchorEl?: Dispatch<SetStateAction<HTMLButtonElement | null>>
	handleClose?: EmptyFunction
	multiDates?: boolean
	highlightedDates?: Date[]
	handleMultiDateChange?: (date: Date) => void
	minDate?: Date | null
	maxDate?: Date | null
	disabled?: boolean
	isWeekSelection?: boolean
	isMonthSelection?: boolean
	showMonthYearPicker?: boolean
	dateFormat?: string
}

/**
 * ReusableDatePickerProps: Defines the props for the ReusableDatePicker component.
 * @param value - The selected date or range of dates.
 * @param dateRange - A boolean indicating whether the date picker allows a range of dates.
 * @param onSingleDateChange - Function triggered on selection of a single date.
 * @param startDate - The start date in the range.
 * @param endDate - The end date in the range.
 * @param onDateRangeChange - Function triggered when a date range is selected.
 * @returns ReactElement
 */
const ReusableDatePicker = ({
	value,
	dateRange = false,
	onSingleDateChange,
	startDate = null,
	endDate = null,
	onDateRangeChange,
	handleClose,
	multiDates = false,
	highlightedDates = [],
	handleMultiDateChange,
	minDate = null,
	maxDate = null,
	isWeekSelection = false,
	isMonthSelection = false,
	showMonthYearPicker = false,
	...props
}: ReusableDatePickerProps): ReactElement => {
	// Function to get the start and end dates of the month
	const getMonthStartAndEndDates = (
		day: Date | null,
		startDate: Date | null,
		endDate: Date | null
	): { startOfMonth: Date | null; endOfMonth: Date | null } => {
		// Get today's date or use the provided day
		const today = day ? new Date(day) : new Date()
		// Calculate the first day of the month
		const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)
		// Calculate the last day of the month
		const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)

		// Check if the provided startDate and endDate match the start and end of the month
		if (
			startDate &&
			endDate &&
			startDate.toDateString() === startOfMonth.toDateString() &&
			endDate.toDateString() === endOfMonth.toDateString()
		) {
			// Return null if the dates match
			return { startOfMonth: null, endOfMonth: null }
		}
		// Return the start and end dates of the month
		return { startOfMonth, endOfMonth }
	}

	// Function to get the start and end dates of the week
	const getWeekDates = (
		day: Date | null,
		startDate: Date | null,
		endDate: Date | null
	): {
		start: Date | null
		end: Date | null
	} => {
		// Get today's date or use the provided day
		const today = day ? new Date(day) : new Date()
		// Get the day of the week (0 for Sunday, 6 for Saturday)
		const dayOfWeek = today.getDay()

		// Calculate the start date (Sunday)
		const start = new Date(today)
		start.setDate(start.getDate() - dayOfWeek)

		// Calculate the end date (Saturday)
		const end = new Date(start)
		end.setDate(end.getDate() + 6)

		// Check if the provided startDate and endDate match the start and end of the week
		if (startDate && endDate && startDate.toDateString() === start.toDateString() && endDate.toDateString() === end.toDateString()) {
			// Return null if the dates match
			return { start: null, end: null }
		}
		// Return the start and end dates of the week
		return { start, end }
	}

	// Function to handle the date change based on the selection mode
	const handleDateChange = (selectedDate: Date | [Date | null, Date | null] | null) => {
		const singleDate = selectedDate as Date

		if (isWeekSelection) {
			// Get the start and end dates of the week
			const { start, end } = getWeekDates(singleDate, startDate, endDate)
			// Call the date range change handler with the start and end dates of the week
			onDateRangeChange?.(start, end)
			if (start && end) {
				// Close the date picker if both start and end dates are set
				handleClose?.()
			}
		} else if (isMonthSelection) {
			// Get the start and end dates of the month
			const { startOfMonth, endOfMonth } = getMonthStartAndEndDates(singleDate, startDate, endDate)
			// Call the date range change handler with the start and end dates of the month
			onDateRangeChange?.(startOfMonth, endOfMonth)
			if (startOfMonth && endOfMonth) {
				// Close the date picker if both start and end dates are set
				handleClose?.()
			}
		} else if (dateRange) {
			const [startDate, endDate] = selectedDate as [Date | null, Date | null]
			// Call the date range change handler with the selected start and end dates
			onDateRangeChange?.(startDate, endDate)
			if (startDate && endDate && startDate.toDateString() !== endDate.toDateString()) {
				// Close the date picker if both start and end dates are set and not equal
				handleClose?.()
			} else {
				// Call the date range change handler with the start date and null end date
				onDateRangeChange?.(startDate, null)
			}
		} else {
			// Close the date picker and call the single date change handler
			handleClose?.()
			onSingleDateChange?.(singleDate)
		}
	}

	return dateRange || isMonthSelection || isWeekSelection ? (
		<ReactDatePicker
			showYearDropdown
			showMonthDropdown
			dropdownMode='select'
			scrollableMonthYearDropdown
			onChange={(selectedDate: Date | [Date | null, Date | null] | null) => handleDateChange(selectedDate)}
			selectsRange={dateRange || isMonthSelection || isWeekSelection}
			showPopperArrow={false}
			key={value && value.toISOString()}
			inline
			startDate={startDate}
			endDate={endDate}
			minDate={minDate}
			maxDate={maxDate}
		/>
	) : multiDates ? (
		<ReactDatePicker
			showYearDropdown
			showMonthDropdown
			dropdownMode='select'
			dateFormat='DD/MM/YYYY'
			onChange={(date: Date) => handleMultiDateChange?.(date)}
			highlightDates={highlightedDates}
			inline
			openToDate={new Date()}
			minDate={minDate}
			maxDate={maxDate}
		/>
	) : showMonthYearPicker ? (
		<ReactDatePicker
			selected={value ? new Date(value.valueOf()) : null}
			onChange={(date: Date) => handleDateChange(date)}
			maxDate={maxDate ? maxDate : null}
			minDate={minDate ?? null}
			inline
			disabled={props.disabled}
			showMonthYearPicker={showMonthYearPicker}
			dateFormat={'MM/yyyy'}
		/>
	) : (
		<ReactDatePicker
			showYearDropdown
			showMonthDropdown
			dropdownMode='select'
			selected={value ? new Date(value.valueOf()) : null}
			onChange={(date: Date) => handleDateChange(date)}
			scrollableMonthYearDropdown
			maxDate={maxDate ? maxDate : null}
			minDate={minDate ?? null}
			inline
			disabled={props.disabled}
			dateFormat='DD/MM/YYYY'
		/>
	)
}

export default ReusableDatePicker
