import { Box, Card, IconButton, MenuItem, Snackbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { flexStyles } from '../../utils/commonStyles'
import { iconKeys, typographyKeys } from '../../utils/resourceConstants'
import { localeKeys } from '../../utils/localeConstants'
import CustomIcon from '../../custom_components/CustomIcon'
import CustomizedButton from '../../custom_components/CustomButton'
import { statusList } from './AddTask'
import { MouseEvent, useState } from 'react'
import CustomMenu from '../../custom_components/CustomMenu'

interface SelectedTasksHandleUIProps {
	open: boolean
	count: number
	getTaskList: () => Promise<void>
	handleUpdateTaskStatus: (str: string) => void
}

const SelectedTasksHandleUI = ({ open, count, handleUpdateTaskStatus }: SelectedTasksHandleUIProps) => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const openAnc = Boolean(anchorEl)

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Snackbar
			open={open}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			// autoHideDuration={6000}
			// onClose={(event, reason) => handleClose(reason)}
			// sx={{ zIndex: 99999 }}
		>
			<Card
				sx={{
					...flexStyles.flexRowSpaceBetweenAlignCenter,
					maxWidth: '450px',
					minWidth: isMobile ? '250px' : '450px',
					borderRadius: '20px',
					padding: '12px 12px',
					backgroundColor: 'rgba(26, 28, 32, 1)',
					gap: '10px',
				}}
			>
				<Box sx={{ ...flexStyles.flexAlignCenter, gap: '8px' }}>
					<Box sx={{ ...flexStyles.flexCenter, border: '1px solid #fff', borderRadius: '12px', gap: '8px', p: '8px 13px' }}>
						<Typography variant={typographyKeys.label1} sx={{ color: '#fff' }}>
							{count + ' ' + localeKeys.tasksSelected}
						</Typography>
						<IconButton sx={{ height: '16px', width: '16px' }}>
							<CustomIcon name={iconKeys.remove} />
						</IconButton>
					</Box>
					<CustomIcon name={iconKeys.multiSelectIcon} style={{ height: '16px', width: '16px' }} />
				</Box>
				<Box sx={{ ...flexStyles.flexAlignCenter, gap: '8px' }}>
					<CustomizedButton
						textprops={{
							text: localeKeys.status,
							variant: typographyKeys.label1,
							color: '#fff',
						}}
						sxprops={{
							minWidth: '63px',
							height: '27px',
							borderRadius: '12px',
							border: '1px solid',
							borderColor: '#fff',
							backgroundColor: 'rgba(141, 138, 138, 0.14)',
                           
						}}
						id='basic-button'
						aria-controls={openAnc ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={openAnc ? 'true' : undefined}
						onClick={handleClick}
					/>
					<CustomMenu open={openAnc} anchorEl={anchorEl} handleClose={() => handleClose()}>
						<>
							{statusList.map((item) => {
								return (
									<MenuItem key={item.id} onClick={() => handleUpdateTaskStatus(item.id)}>
										{item.displayName}
									</MenuItem>
								)
							})}
						</>
					</CustomMenu>

					<CustomizedButton
						textprops={{
							text: localeKeys.delete,
							variant: typographyKeys.label1,
							color: 'rgba(225, 56, 56, 1)',
						}}
						sxprops={{
							minWidth: '63px',
							height: '27px',
							borderRadius: '12px',
							border: '1px solid',
							borderColor: '#e13838',
							backgroundColor: 'rgba(255, 53, 53, 0.14)',
						}}
						// onClick={() => handleCancel(task.id)}
					/>
				</Box>
			</Card>
		</Snackbar>
	)
}

export default SelectedTasksHandleUI
