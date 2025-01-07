import { ReactElement, useEffect, useState } from 'react'
import { Box, Card, Typography, IconButton, Snackbar, useTheme, useMediaQuery } from '@mui/material'
import CustomIcon from './CustomIcon'
import Slide from '@mui/material/Slide'
import { updateShowToast } from '../current_user/currentUserSlice'
import { iconKeys, typographyKeys } from '../utils/resourceConstants'
import { useDispatch } from 'react-redux'
import { flexStyles } from '../utils/commonStyles'

interface ToastProps {
	title?: string
	subTitle?: string
	isSuccess?: boolean
}

/**
 * Toast component for displaying notifications.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {string} [props.title] - The title of the toast.
 * @param {string} [props.subTitle] - The subtitle of the toast.
 * @param {boolean} [props.isSuccess=true] - Indicates if the toast represents a success.
 * @returns {ReactElement} The rendered Toast component.
 */
const Toast = ({ isSuccess = true, ...props }: ToastProps): ReactElement => {
	const theme = useTheme()

	const dispatch = useDispatch()
	const [open, setOpen] = useState(true)

	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const handleClose = (reason: string) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	useEffect(() => {
		const timer = setInterval(() => {
			dispatch(updateShowToast(false))
		}, 3000)

		return () => clearInterval(timer)
	}, [dispatch])

	interface CommonIconProps {
		name: string
	}

	const CommonIcon = ({ name }: CommonIconProps): ReactElement => {
		return <CustomIcon name={name} style={{ height: '32px', width: '32px' }} svgStyle={'height: 32px; width: 32px'} />
	}

	return (
		<Snackbar
			open={open}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			autoHideDuration={6000}
			onClose={(event, reason) => handleClose(reason)}
			TransitionComponent={Slide}
			sx={{ zIndex: 99999 }}
		>
			<Card
				sx={{
					...flexStyles.flexCenterSpaceBetween,
					maxWidth: '450px',
					minWidth: isMobile ? '250px' : '450px',
					borderRadius: '10px',
					padding: '10px 10px',
					backgroundColor: 'background.surface',
					gap: '10px',
				}}
			>
				<Box
				// sx={{ ...flexStyles.flexColumnCenter }}
				>
					<CommonIcon name={isSuccess ? iconKeys.success : iconKeys.failure} />
				</Box>

				<Box
					sx={{
						width: '100%',
						ml: '13px',
					}}
				>
					{props.title && (
						<Typography
							variant={typographyKeys.subtitle1}
							sx={{
								display: '-webkit-box',
								overflow: 'hidden',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 1,
								mt: '6px',
								wordBreak: 'break-word',
								color: 'text.secondary',
							}}
						>
							{props.title}
						</Typography>
					)}
					{props.subTitle && (
						<Typography
							variant={typographyKeys.subtitle1}
							sx={{
								display: '-webkit-box',
								overflow: 'hidden',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 4,
								mt: props.title ? '6px' : 0,
								wordBreak: 'break-word',
								color: 'text.secondary',
							}}
						>
							{props.subTitle}
						</Typography>
					)}
				</Box>

				<Box>
					{/* <Box sx={{ ...flexStyles.flexColumnCenter }}> */}
					<IconButton size='small' onClick={() => handleClose('')}>
						<CommonIcon name={iconKeys.closeCircle} />
					</IconButton>
					{/* </Box> */}
				</Box>
			</Card>
		</Snackbar>
	)
}

export default Toast
