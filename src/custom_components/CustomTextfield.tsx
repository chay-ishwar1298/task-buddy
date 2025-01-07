'use client'
import React, { ReactElement } from 'react'
import {
	Box,
	FormControl,
	FormControlProps,
	FormHelperText,
	InputAdornment,
	InputBaseComponentProps,
	InputLabel,
	OutlinedInput,
	OutlinedInputProps,
	SxProps,
	Typography,
	TypographyProps,
	useTheme,
} from '@mui/material'
import { typographyKeys } from '../utils/resourceConstants'
import { flexStyles } from '../utils/commonStyles'
import { AnyData } from '../utils/utils'

// Additional styling props for the field component
type FieldSXProps = {
	backgroundColor?: string
	borderRadius?: string
	placeholderStyle?: React.CSSProperties
	borderRight?: string
	paddingLeft?: string
	paddingRight?: string
	textStyle?: React.CSSProperties
	borderFocusColor?: string
	borderColor?: string
}

//CustomTextFieldProps: Props for configuring a custom text field component
interface CustomTextFieldProps {
	// Add any additional custom props if needed
	required?: boolean
	error?: boolean
	helperText?: string
	helperTextStyle?: SxProps
	formControlProps?: FormControlProps
	typoProps?: TypographyProps
	textFieldProps: {
		id: string
		name: string
	} & OutlinedInputProps
	fieldSx?: FieldSXProps & SxProps
	propSx?: InputBaseComponentProps & {
		height?: string
		maxLength?: string
		minLength?: string
	}
	charCount?: number
	icon?: ReactElement
	iconEnd?: ReactElement
	charCountNeeded?: boolean
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
	inputLabel?: string
	inputRef?: React.Ref<AnyData> | null
	centerAligned?: boolean
}

/**
 * CustomTextFieldProps: Props for configuring a custom text field component.
 * @param props - Props for configuring the custom text field component.
 * @param required - Flag indicating whether the field is required.
 * @param error - Flag indicating whether the field has an error.
 * @param helperText - Helper text to display below the field.
 * @param helperTextStyle - Additional styling props for the helper text.
 * @param formControlProps - Props for configuring the form control.
 * @param typoProps - Typography props for customizing text styles.
 * @param textFieldProps - Props for configuring the text field input.
 * @param fieldSx - Additional styling props for the field using Theme UI's SxProps.
 * @param propSx - Additional styling props for the input base component.
 * @param charCount - Character count for the text field.
 * @param charCountNeeded - Flag indicating whether character count is needed.
 * @param onChange - Callback function invoked when the field value changes.
 * @param inputLabel - Label for the text field input.
 * @returns ReactElement representing the custom text field.
 */
const CustomTextfield = ({ ...props }: CustomTextFieldProps): ReactElement => {
	const theme = useTheme()

	return (
		<FormControl sx={{ width: '100%', gap: '5px' }} variant='outlined' {...props.formControlProps}>
			{props?.inputLabel && (
				<Box sx={{ ...flexStyles.flexRowAlignStart, gap: '5px' }}>
					<Typography
						sx={{ display: 'inline', color: !props?.textFieldProps?.readOnly && props?.error ? 'text.error' : 'text.secondary' }}
						variant={typographyKeys.body2}
					>
						{props?.inputLabel}
					</Typography>
					{props?.textFieldProps?.required && (
						<Typography sx={{ display: 'inline', color: 'text.error' }} variant={typographyKeys.body2}>
							{'*'}
						</Typography>
					)}
				</Box>
			)}

			{props?.textFieldProps?.label && (
				<>
					<InputLabel
						htmlFor={props?.textFieldProps?.id}
						sx={{
							...theme.typography.body2,
							p: 0,
							opacity: 1,
							color:
								!props?.textFieldProps?.readOnly && props?.error
									? 'text.disable'
									: props?.textFieldProps?.value &&
									  typeof props.textFieldProps.value === 'string' &&
									  props.textFieldProps.value.length > 0
									? 'text.subHeading'
									: 'text.secondary',

							'&.Mui-focused': {
								color: !props?.textFieldProps?.readOnly && props?.error ? 'text.error' : 'text.subHeading',
								marginTop: '-3px',
							},
							marginTop: '-3px',
						}}
					>
						{props?.textFieldProps?.label}
						{props?.textFieldProps?.required && (
							<Typography sx={{ display: 'inline', color: 'text.error' }} variant={typographyKeys.body2}>
								{' '}
								*
							</Typography>
						)}
					</InputLabel>
				</>
			)}

			<OutlinedInput
				fullWidth
				type='text'
				multiline={false}
				autoFocus={false}
				disabled={false}
				inputRef={props.inputRef ?? null}
				autoComplete={'one-time-code'}
				startAdornment={props.icon && <InputAdornment position='start'>{props.icon}</InputAdornment>}
				endAdornment={props.iconEnd && <InputAdornment position='end'>{props.iconEnd}</InputAdornment>}
				inputProps={{
					sx: {
						...props.propSx,
						minHeight: props?.propSx?.height ?? '46px',
						maxHeight: props?.propSx?.height ?? '46px',
						p: props.textFieldProps?.multiline ? 0 : '0px 10px',
						overflow: props.textFieldProps?.multiline && 'auto !important',
						'::-webkit-scrollbar': {
							display: 'none',
						},
						'::-moz-scrollbar': {
							display: 'none',
						},
						'::-ms-scrollbar': {
							display: 'none',
						},
					},
					maxLength: props?.propSx?.maxLength,
					minLength: props?.propSx?.minLength,
				}}
				sx={{
					...props.fieldSx,
					'& input::placeholder': props?.fieldSx?.placeholderStyle ?? {
						...theme?.typography?.subtitle1,
						color: 'text.primary',
						opacity: 1,
					},
					backgroundColor:
						(props?.textFieldProps?.readOnly ? 'background.secondary' : props.fieldSx?.backgroundColor) ?? 'background.secondary',
					borderRadius: props.fieldSx?.borderRadius ?? '12px',
					'& fieldset': {
						borderRight: props.fieldSx?.borderRight,
					},
					'&.MuiOutlinedInput-root': {
						'& input': props.fieldSx?.textStyle ?? {
							...theme?.typography?.h5,
							textAlign: props.centerAligned ? 'center' : 'left', // Add center alignment
						},
						'& textarea': props.fieldSx?.textStyle ?? {
							...theme?.typography?.h5,
						},
						'&:hover fieldset': {
							borderWidth: '1px',
							borderColor:
								(props?.textFieldProps?.readOnly
									? 'border.disable'
									: !props?.textFieldProps?.readOnly && props?.error
									? 'border.error'
									: props.textFieldProps.disabled
									? 'border.disable'
									: props.fieldSx?.borderFocusColor) ?? 'border.primary',
						},
						'&.Mui-focused fieldset': {
							borderWidth: '1px',
							borderColor:
								(props?.textFieldProps?.readOnly
									? 'border.disable'
									: !props?.textFieldProps?.readOnly && props?.error
									? 'border.error'
									: props.textFieldProps.disabled
									? 'border.disable'
									: props.fieldSx?.borderFocusColor) ?? 'border.primary',
						},
						'&>fieldset': {
							borderWidth: '1px',
							borderColor: props?.textFieldProps?.readOnly
								? 'border.disable'
								: !props?.textFieldProps?.readOnly && props?.error
								? 'border.error'
								: props.fieldSx?.borderColor ?? 'border.disable',
						},
					},
				}}
				onBlur={props?.textFieldProps?.readOnly ? undefined : props.textFieldProps.onBlur}
				onFocus={props?.textFieldProps?.readOnly ? undefined : props.textFieldProps.onFocus}
				{...props.textFieldProps}
			/>
			{props.helperText && (
				<FormHelperText
					sx={{
						m: 0,
						p: '4px 8px 0px 8px',

						...props.helperTextStyle,
					}}
				>
					<Typography variant={typographyKeys.subtitle1} sx={{ color: 'text.error' }}>
						{props.helperText}
					</Typography>
				</FormHelperText>
			)}

			{props.charCountNeeded ? (
				<Typography sx={{ position: 'absolute', p: '5px', right: 0, bottom: 0 }} variant={typographyKeys.subtitle1}>
					{`${props.charCount}/${props.propSx?.maxLength}`}
				</Typography>
			) : null}
		</FormControl>
	)
}

export default CustomTextfield
