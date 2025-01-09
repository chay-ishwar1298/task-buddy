import { Box } from '@mui/material'
import deskBg from '../../resources/images/svg/desk_bg_onboard.svg'
import desktemp from '../../resources/images/svg/desk_template.svg'
import LoginForm from './LoginForm'

const LoginDesk = () => {
	return (
		<Box sx={{ height: '100vh', width: '100vw', position: 'relative' }}>
			<Box
				sx={{
					position: 'relative',
					zIndex: 1,
				}}
			>
				<LoginForm />
			</Box>

			{/* Background image container */}
			<Box
				sx={{
					position: 'absolute',
					top: '30px',
					left: 0,
					right: 0,
					bottom: 0,
					height: 'calc(100% - 30px)',
					width: '100%',
					backgroundImage: `url(${deskBg})`,
					backgroundPosition: 'right top',
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
					zIndex: 0,
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: '40px',
						left: 0,
						right: 0,
						bottom: '40px',
						height: 'calc(100% - 80px)',
						width: '100%',
						backgroundImage: `url(${desktemp})`,
						backgroundPosition: 'right top',
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						zIndex: 0,
					}}
				></Box>
			</Box>
		</Box>
	)
}

export default LoginDesk
