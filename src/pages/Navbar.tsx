import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import CustomIcon from '../custom_components/CustomIcon'
import { iconKeys } from '../utils/resourceConstants'
import { useAppDispatch } from '../custom_components/CustomHooks'
import { logoutApi } from '../current_user/currentUserSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	return (
		<>
			<AppBar
				position='fixed'
				color='transparent'
				elevation={0}
				sx={{
					p: '5px 40px',
					transition: 'transform 0.3s ease-in-out',
					height: '70px',
					bgcolor: 'transparent',
					backdropFilter: 'blur(15px)',
				}}
			>
				<Toolbar>
					<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
						<Box component='div'>
							<CustomIcon
								name={iconKeys.getFitNowIcon}
								style={{ width: '215px', height: '55px' }}
								svgStyle={'width:215px;height:55px'}
							/>
						</Box>

						<IconButton
							size='small'
							onClick={() => {
								dispatch(logoutApi('')).then((res) => {
									if (res && res.meta.requestStatus === 'fulfilled') {
										navigate('/login')
									}
								})
							}}
						>
							<CustomIcon name={iconKeys.logout} style={{ height: '20px', width: '20px' }} svgStyle='height: 20px; width: 20px' />
							<Typography sx={{ ml: '5px' }}> Logout </Typography>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Navbar
