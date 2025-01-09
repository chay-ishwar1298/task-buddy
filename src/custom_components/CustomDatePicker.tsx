import { Dialog } from '@mui/material'

import ReusableDatePicker from './ReusableDatePicker'
import { isValid } from 'date-fns'
import { SetterFunction } from '../utils/types'

export interface InlineDatePickerProps {
	dialogOpen: boolean
	setDialogOpen: SetterFunction<boolean>
	value?: Date | null
	onSingleDateChange?: (date: Date | null) => void
	minDate?: Date | null
	maxDate?: Date | null
	disabled?: boolean
	dateFormat?: string
}

const CustomDatePicker = ({ value = null, disabled = false, ...props }: InlineDatePickerProps) => {
	const handleClose = () => {
		props.setDialogOpen(false)
	}
	return (
		<Dialog onClose={handleClose} open={props?.dialogOpen} PaperProps={{ sx: { borderRadius: '20px' } }}>
			{/* <Paper> */}
			<ReusableDatePicker
				dateRange={false}
				value={isValid(value) ? value : null}
				onSingleDateChange={props.onSingleDateChange}
				handleClose={handleClose}
				minDate={props.minDate}
				disabled={disabled}
				maxDate={props.maxDate}
				dateFormat={props.dateFormat ?? 'DD/MM/YYYY'}
			/>
			{/* </Paper> */}
		</Dialog>
	)
}

export default CustomDatePicker
