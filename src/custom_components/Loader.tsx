import { Backdrop, Box } from '@mui/material'
import { ReactElement } from 'react'
import CustomIcon from './CustomIcon'
import { iconKeys } from '../utils/resourceConstants'

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
				<CustomIcon name={iconKeys.accept} style={{ height: '200px', width: '200px' }} />
			</Backdrop>
		</Box>
	)
}

export default Loader
