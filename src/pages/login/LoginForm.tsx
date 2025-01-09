import { Box, Card, CardActionArea, Typography, useMediaQuery, useTheme } from '@mui/material'
import { flexStyles, globalStyles } from '../../utils/commonStyles'
import CustomIcon from '../../custom_components/CustomIcon'
import { iconKeys, typographyKeys } from '../../utils/resourceConstants'
import { localeKeys } from '../../utils/localeConstants'
import { auth, googleProvider } from '../../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { addUserToLocalStorage } from '../../utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../custom_components/CustomHooks'
import { updateIsLoading } from '../../current_user/currentUserSlice'

const LoginForm = () => {
	const theme = useTheme()
	const belowSm = useMediaQuery(theme.breakpoints.down('sm'))
	const belowMd = useMediaQuery(theme.breakpoints.down('md'))
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider)
			addUserToLocalStorage(auth)
			dispatch(updateIsLoading(false))
		} catch (err) {
			console.error(err)
			dispatch(updateIsLoading(false))
		}
	}

	const signIn = async () => {
		dispatch(updateIsLoading(true))
		await signInWithGoogle()
		navigate('/dashboard')
	}

	return (
		<Box
			sx={{
				...flexStyles.flexColumnJustifyCenter,
				height: `calc(100dvh - 10px)`,
				maxHeight: '100dvh',
				overflowX: 'auto',
				...globalStyles.hideScroll,
				alignItems: belowSm ? 'center' : 'flex-start',
				textAlign: belowSm ? 'center' : 'flex-start',
				p: belowSm ? '20px 20px' : belowMd ? '20px 50px' : '20px 60px',
				gap: '10px',
			}}
		>
			<CustomIcon
				name={iconKeys.logoTitle}
				style={{ height: '30px', width: '150px', marginLeft: '-10px' }}
				svgStyle='height: 30px; width: 150px'
			/>
			<Typography variant={typographyKeys.callout} sx={{ color: '#000', maxWidth: '295px', mb: '20px' }}>
				{' '}
				{localeKeys.appDescription}
			</Typography>

			<Card
				sx={{
					backgroundColor: '#292929',
					borderRadius: '20px',
					minHeight: '40px',
					maxHeight: '59px',
					minWidth: '210px',
					MaxWidth: '365px',
				}}
			>
				<CardActionArea sx={{ ...flexStyles.flexCenter, m: 0, p: '14px 12px', borderRadius: '20px', gap: '10px' }} onClick={signIn}>
					<CustomIcon name={iconKeys.googleIcon} style={{ height: '20px', width: '20px' }} />
					<Typography variant={belowMd ? typographyKeys.h4 : typographyKeys.h3} sx={{ color: '#fff' }}>
						{localeKeys.loginText}
					</Typography>
				</CardActionArea>
			</Card>
		</Box>
	)
}

export default LoginForm
