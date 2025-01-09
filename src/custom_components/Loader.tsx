import { Backdrop, Box, CircularProgress } from '@mui/material'
import { ReactElement } from 'react'

/**
 * This Component is for Loading indication.
 * @param {Object} this.props.
 */
const Loader = (): ReactElement => {
	return (
		<Box>
			<Backdrop
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', zIndex: 99999 }}
				classes={{
					root: 'MuiBackdrop-root-loader',
				}}
				open={true}
			>
				<CircularProgress color='secondary' />
			</Backdrop>
		</Box>
	)
}

export default Loader
