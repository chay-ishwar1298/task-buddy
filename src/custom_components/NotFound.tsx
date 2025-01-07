import { Box, Typography } from '@mui/material'
import CustomizedButton from './CustomButton'
import { typographyKeys } from '../utils/resourceConstants'
import notFoundDark from '../resources/images/svg/notFound-dark.svg'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<>
			<Box
				sx={{
					backgroundImage: `url(${notFoundDark})`, // Default desktop image based on theme
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					width: '100vw',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					textAlign: 'center',
					position: 'relative',
				}}
			>
				{/* Center the additional text content below the 404 */}
				<Box sx={{ mt: '200px' }}>
					<Typography variant={typographyKeys.h2}>{`Oops! Looks like you missed the target!`}</Typography>

					<Box sx={{ mt: '15px' }}>
						<CustomizedButton
							textprops={{
								text: 'Take me Back',
								variant: typographyKeys.button1,
								color: 'text.subHeading',
							}}
							sxprops={{
								minWidth: '170px',
								height: '38px',
								borderRadius: '60px',
								backgroundColor: 'background.surface',
								border: '1px solid',
							}}
							onClick={() => navigate('/')}
						/>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default NotFound
