import { Box } from '@mui/material'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Box
				sx={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					transition: '0.6s ease-in-out',
					zIndex: 1000,
				}}
			>
				<Navbar />
			</Box>
			<Box
				sx={{
					flexGrow: 1,
					mt: '70px',
				}}
			>
				<Outlet />
			</Box>
		</Box>
	)
}

export default Dashboard