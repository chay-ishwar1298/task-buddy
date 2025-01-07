import React, { CSSProperties, ReactElement } from 'react'
import { Box, Button, ButtonProps, Typography, TypographyProps, useTheme } from '@mui/material'
import { typographyKeys } from '../utils/resourceConstants'
import CustomIcon from './CustomIcon'
import { flexStyles } from '../utils/commonStyles'
import { AnyData } from '../utils/utils'

interface ButtonContentWithIconProps {
	startIcon?: string
	endIcon?: string
	iconSx?: CSSProperties
	iconSvgSx?: string
	parentSx?: CSSProperties
}

interface CustomTypoProps extends TypographyProps {
	text: string
	fontSize?: string
	fontWeight?: string
	buttonDisabled?: boolean | undefined
	typoWithoutTranslation?: string | undefined
}

export interface CustomButtonProps extends ButtonProps {
	iconprops?: ButtonContentWithIconProps
	textprops?: CustomTypoProps
	newColors?: boolean // Add a flag to determine if new colors should be used
	sxprops?: {
		height?: string
		minWidth?: string
		maxWidth?: string
		border?: string
		borderColor?: string
		borderRadius?: string
		p?: string
		backgroundColor?: string
		disabledButtonColor?: string
		gradientBorder?: boolean
		boxShadow?: string
		background?: string
		gradient?: string
		marginTop?: string
		variant?: string
	}
}

const CustomizedButton = ({ ...props }: CustomButtonProps): ReactElement => {
	const theme = useTheme()

	const ButtonLabel = (): ReactElement => {
		let typo: AnyData = props?.sxprops?.variant
		if (props?.sxprops?.variant) {
			typo = props?.sxprops?.variant
		} else {
			typo = typographyKeys.button
		}
		return (
			<Typography
				variant={typo}
				sx={{
					color: props?.disabled ? 'text.disable' : props?.textprops?.color ?? 'common.white',
					textTransform: 'none',
					marginTop: props?.sxprops?.marginTop ?? '0px',
					variant: props?.sxprops?.variant ?? typographyKeys.button,
				}}
				{...props.textprops}
			>
				{props?.textprops?.text}
			</Typography>
		)
	}

	const ButtonLabelWithIcon = (): ReactElement => {
		const StyledIcon = ({ name }: { name: string }): ReactElement => {
			return (
				<CustomIcon
					name={name}
					style={props?.iconprops?.iconSx ?? { height: '24px', width: '24px' }}
					svgStyle={props?.iconprops?.iconSvgSx ?? 'height: 24px; width: 24px'}
				/>
			)
		}

		return (
			<Box sx={{ ...flexStyles.flexRowAlignCenter, gap: '4px', ...props?.iconprops?.parentSx }}>
				<>{props?.iconprops?.startIcon && <StyledIcon name={props.iconprops.startIcon} />}</>
				{ButtonLabel()}
				<>{props?.iconprops?.endIcon && <StyledIcon name={props.iconprops.endIcon} />}</>
			</Box>
		)
	}

	return (
		<Button
			variant='contained'
			type='submit'
			fullWidth={false}
			sx={{
				...props.sxprops,
				height: props?.sxprops?.height ?? '50px',
				boxShadow: 'none',
				minWidth: props?.sxprops?.minWidth ?? '100%',
				maxWidth: props?.sxprops?.maxWidth ?? '100%',
				borderRadius: props?.sxprops?.borderRadius ? props?.sxprops?.borderRadius : props.sxprops?.gradientBorder ? '4px' : '60px',
				p: props?.sxprops?.p ?? '14px 20px',
				backgroundColor: () => {
					if (props?.disabled) {
						return 'text.disable'
					} else if (props?.sxprops?.backgroundColor !== '' && props?.sxprops?.backgroundColor !== undefined) {
						return props.sxprops.backgroundColor
					} else {
						return 'background.primaryHover'
					}
				},
				borderColor: props?.sxprops?.borderColor ? props?.sxprops?.borderColor : 'border.primary',
				'&.Mui-disabled': {
					// backgroundColor: '#f3f4f6',
					border: 'none',
				},
				'&:hover': {
					backgroundColor: props?.sxprops?.backgroundColor ?? 'background.primaryHover',
					borderColor: props?.sxprops?.borderColor ? (props?.disabled ? 'background.primaryHover' : props?.sxprops?.borderColor) : null,
				},
				position: 'relative',
				zIndex: 1,
				...(props.sxprops?.gradientBorder && {
					'&::before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: 'background.surface',
						zIndex: -1,
						borderRadius: '4px',
						padding: '0.9px',
						'-webkit-mask': `linear-gradient(${theme.palette.common.white} 0 0) content-box, linear-gradient(${theme.palette.common.white} 0 0)`,
						'-webkit-mask-composite': 'xor',
						'mask-composite': 'exclude',
					},
				}),
			}}
			{...props}
		>
			{props.iconprops ? ButtonLabelWithIcon() : ButtonLabel()}
		</Button>
	)
}

export default CustomizedButton
