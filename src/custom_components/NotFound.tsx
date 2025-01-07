import { Box } from '@mui/material'
import CustomizedButton from './CustomButton'
import { typographyKeys } from '../utils/resourceConstants'
import notFound from '../resources/images/svg/notFound.svg'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<Box
			sx={{
				height: '100dvh',
				width: '100vw',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Background Image */}
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
					width: '100%',
					backgroundImage: `url(${notFound})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover', // Ensures the image fills the entire container
					backgroundRepeat: 'no-repeat',
					zIndex: -1, // Ensures content appears on top of the background
				}}
			></Box>

			{/* Content */}
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)', // Centers the content
					textAlign: 'center',
				}}
			>
				<Box sx={{ mt: '200px' }}>
					<CustomizedButton
						textprops={{
							text: 'Take me Back',
							variant: typographyKeys.button1,
							color: '#fff',
						}}
						sxprops={{
							minWidth: '170px',
							height: '38px',
							borderRadius: '60px',
							backgroundColor: '#7B1984',
						}}
						onClick={() => navigate('/')}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default NotFound
