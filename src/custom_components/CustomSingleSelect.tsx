import React, { useState, useEffect, useRef } from 'react'
import { TextField, MenuItem, InputAdornment, Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { iconKeys, typographyKeys } from '../utils/resourceConstants'
import CustomIcon from './CustomIcon'

export interface Option {
	id: string
	label: string
}

interface CustomSingleSelectProps {
	label?: string
	placeholder: string
	options: Option[]
	startIcon?: React.ReactNode
	onSelect: (selectedOption: Option | null) => void
	name: string
	value: Option | null
	disableTyping?: boolean
	freesolo?: boolean
	innerHeight?: number
}

const useStyles = makeStyles({
	dropdownMenu: {
		maxHeight: '200px',
		overflowY: 'auto',
	},
})

export default function CustomSingleSelect({
	label,
	placeholder,
	options,
	startIcon,
	onSelect,
	name,
	value,
	disableTyping,
	freesolo,
	innerHeight,
}: CustomSingleSelectProps) {
	const [searchText, setSearchText] = useState(value?.label || '')
	const [open, setOpen] = useState(false)
	const [hasTyped, setHasTyped] = useState(false)

	const classes = useStyles()
	const dropdownRef = useRef<HTMLDivElement>(null)

	const handleSelect = (option: Option) => {
		setSearchText(option.label)
		onSelect(option) // Call onSelect with the chosen option
		setOpen(false)
		setHasTyped(false) // Reset typing tracker
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value
		setSearchText(inputValue)
		setOpen(true)
		setHasTyped(true) // Mark that the user has started typing

		if (freesolo) {
			// For freesolo, create a new option with the input value
			onSelect({ id: inputValue, label: inputValue })
			// Only clear the selected value when the input is empty
		} else if (inputValue === '') {
			onSelect(null) // Clear the selected value only if the input is empty
		}
	}
	// Filter options only if the user has typed something
	const filteredOptions = hasTyped ? options.filter((option) => option.label.toLowerCase().includes(searchText.toLowerCase())) : options
	// Hook to handle clicks outside the dropdown
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [dropdownRef])

	// Update searchText when the value prop changes from the parent
	useEffect(() => {
		if (value?.label !== searchText) {
			setSearchText(value?.label || '')
		}
	}, [value])

	return (
		<Box ref={dropdownRef} sx={{ position: 'relative', width: '100%' }}>
			<Typography variant={typographyKeys.body2} sx={{ mb: '3px', color: 'text.defaultHeading' }}>
				{label}
			</Typography>
			<TextField
				autoComplete='new-password'
				id={`textfield-${name}`}
				name={name}
				placeholder={placeholder}
				value={searchText}
				onChange={disableTyping ? undefined : handleInputChange} // Disable input change if disableTyping is true
				onClick={() => {
					setOpen(true)
					setHasTyped(false) // Reset typing tracker when clicking to show all options
				}}
				variant='outlined'
				fullWidth
				InputProps={{
					readOnly: disableTyping, // Prevent typing inside the input
					startAdornment: <InputAdornment position='start'>{startIcon}</InputAdornment>,
					endAdornment: (
						<InputAdornment position='end'>
							<CustomIcon name={iconKeys.caretDown} />
						</InputAdornment>
					),
					sx: {
						cursor: disableTyping ? 'pointer' : 'text', // Change cursor style to pointer when disableTyping is true
						color: 'text.primary',
						'& .MuiInputBase-input': {
							cursor: disableTyping ? 'pointer' : 'text', // Apply the pointer cursor to the input field itself
						},
						'& .MuiInputBase-input::placeholder': {
							color: 'text.primary',
							fontWeight: 500,
							opacity: 1,
						},
					},
				}}
				InputLabelProps={{ shrink: true }}
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: '12px',
						backgroundColor: 'background.secondary',
						height: innerHeight || '44px',
						cursor: disableTyping ? 'pointer' : 'text', // Change cursor style for the entire field
						'&.Mui-focused fieldset': {
							borderColor: 'border.primary',
						},
						'& fieldset': {
							borderColor: 'border.main',
						},
						'&:hover fieldset': {
							borderColor: 'border.primary',
						},
						color: 'text.defaultHeading',
						fontWeight: 700,
					},
				}}
			/>
			{open && (
				<Box
					className={classes.dropdownMenu}
					sx={{
						position: 'absolute',
						width: '100%',
						zIndex: 1000,
						bgcolor: 'background.surface',
						boxShadow: 1,
						borderRadius: '8px',
						mt: '4px',
					}}
				>
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option) => (
							<MenuItem
								key={option.id}
								value={option.id}
								onClick={() => handleSelect(option)}
								sx={{
									'&:hover': {
										backgroundColor: 'background.background2',
									},
								}}
							>
								<Typography variant={typographyKeys.subtitle1} sx={{ color: 'text.defaultHeading' }}>
									{option.label}
								</Typography>
							</MenuItem>
						))
					) : (
						<MenuItem>
							<Typography variant={typographyKeys.subtitle1} sx={{ color: 'text.secondary' }}>
								{freesolo ? searchText : 'No Option Found.'}
							</Typography>
						</MenuItem>
					)}
				</Box>
			)}
		</Box>
	)
}
