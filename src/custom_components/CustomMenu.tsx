import { Menu, useTheme } from '@mui/material'
import { flexStyles } from '../utils/commonStyles'
import { EmptyFunction } from '../utils/types'
import { ReactElement } from 'react'

interface CustomMenuProps {
	anchorEl: null | HTMLElement | null
	// setAnchorEl: SetterFunction<null | HTMLElement | null>
	handleClose: EmptyFunction
	children: ReactElement
	menuId?: string
	buttonId?: string
	open: boolean
}

const CustomMenu = ({ open, anchorEl, handleClose, menuId, buttonId, children }: CustomMenuProps) => {
	const theme = useTheme()
	return (
		<Menu
			id={menuId ?? 'basic-menu'}
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			MenuListProps={{
				'aria-labelledby': buttonId ?? 'basic-button',
			}}
			sx={{
				'.MuiPaper-root': {
					mt: '5px',
					border: '1px solid rgba(123, 25, 132, 0.15)',
					backgroundColor: '#FFF9F9',
					borderRadius: '12px',
					boxShadow: '0px 4px 12px rgba(123, 25, 132, 0.15)',
					p: '10px',
					...flexStyles.flexColumn,
					gap: '5px',
					zIndex: theme.zIndex.snackbar + 1,
				},
			}}
		>
			{children}
		</Menu>
	)
}

export default CustomMenu
