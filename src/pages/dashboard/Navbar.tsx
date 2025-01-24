import { AppBar, Avatar, Box, IconButton, Popover, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import CustomIcon from '../../custom_components/CustomIcon'
import { iconKeys, typographyKeys } from '../../utils/resourceConstants'
import { auth } from '../../config/firebase'
import { Auth, signOut } from 'firebase/auth'
import { getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { updateIsLoading } from '../../current_user/currentUserSlice'
import { useAppDispatch } from '../../custom_components/CustomHooks'
import { flexStyles } from '../../utils/commonStyles'
import { MouseEvent, useState } from 'react'
import { localeKeys } from '../../utils/localeConstants'

const Navbar = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const user: Auth | null = getUserFromLocalStorage()
	const theme = useTheme()
	const upSm = useMediaQuery(theme.breakpoints.up('sm'))

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	const firebaseLogout = async () => {
		try {
			await signOut(auth)
			removeUserFromLocalStorage()
			dispatch(updateIsLoading(false))
		} catch (err) {
			console.error(err)
			removeUserFromLocalStorage()
			dispatch(updateIsLoading(false))
		}
	}

	const logout = async () => {
		dispatch(updateIsLoading(true))
		await firebaseLogout()
		navigate('/login')
	}

	return (
		<>
			<AppBar
				position='fixed'
				elevation={0}
				sx={{
					p: upSm ? '0px 20px' : '9px 20px',
					bgcolor: '#FAEEFC',
					minHeight: 0,
				}}
			>
				<Toolbar sx={{ p: 0, minHeight: 0 }} disableGutters>
					<Box sx={{ ...flexStyles.flexRowSpaceBetween, width: '100%', gap: '5px' }}>
						<Box component='div'>
							<CustomIcon
								name={iconKeys.logoTitle}
								style={{ height: '30px', width: '150px' }}
								svgStyle={'height: 30px; width: 150px'}
							/>
						</Box>

						<Box sx={{ ...flexStyles.flexRowCenter, gap: '10px' }}>
							<IconButton size='small' sx={{ height: '31px', width: '31px' }} aria-describedby={id} onClick={handleClick}>
								<Avatar sx={{ height: '30px', width: '30px' }} src={user?.currentUser?.photoURL ?? ''}></Avatar>
							</IconButton>
							{upSm && (
								<Typography variant={typographyKeys.subtitle1} sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
									{user?.currentUser?.displayName}
								</Typography>
							)}
						</Box>
					</Box>
				</Toolbar>
			</AppBar>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				sx={{
					'.MuiPaper-root': {
						mt: '5px',
						border: '1px solid rgba(123, 25, 132, 0.15)',
						backgroundColor: '#FFF9F9',
						borderRadius: '12px',
						boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
						p: '10px',
						...flexStyles.flexColumn,
						gap: '5px',
					},
				}}
			>
				<Box
					component='button'
					onClick={logout}
					sx={{ ...flexStyles.flexCenter, gap: '7px', border: 0, backgroundColor: 'transparent', cursor: 'pointer' }}
				>
					<CustomIcon name={iconKeys.logout} style={{ height: '20px', width: '20px' }} svgStyle='height: 20px; width: 20px' />
					<Typography variant={typographyKeys.label1} sx={{ color: '#000' }}>
						{localeKeys.logoutText}
					</Typography>
				</Box>

				<Typography variant={typographyKeys.label1}>{user?.currentUser?.displayName}</Typography>
				<Typography variant={typographyKeys.label1}>{user?.currentUser?.email}</Typography>
			</Popover>
		</>
	)
}

export default Navbar
