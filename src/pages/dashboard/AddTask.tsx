import { Box, IconButton, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import { MouseEvent, ReactElement, useState } from 'react'
import { flexStyles } from '../../utils/commonStyles'
import { iconKeys, typographyKeys } from '../../utils/resourceConstants'
import CustomIcon from '../../custom_components/CustomIcon'
import { localeKeys } from '../../utils/localeConstants'
import CustomizedButton from '../../custom_components/CustomButton'
import { isToday } from 'date-fns'
import CustomDatePicker from '../../custom_components/CustomDatePicker'
import CustomMenu from '../../custom_components/CustomMenu'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useDispatch } from 'react-redux'
import { updateIsLoading } from '../../current_user/currentUserSlice'
import { logger } from '../../logger'

export interface Task {
	status: string
	name: string
	dueDate: Date | null
	category: string
	id: string
}

export const statusList = [
	{ id: 'TO-DO', displayName: 'TO-DO' },
	{ id: 'IN-PROGRESS', displayName: 'IN-PROGRESS' },
	{ id: 'COMPLETED', displayName: 'COMPLETED' },
]

export const categoryList = [
	{ id: 'Work', displayName: 'WORK' },
	{ id: 'Personal', displayName: 'PERSONAL' },
	{ id: 'shopping', displayName: 'SHOPPING' },
	{ id: 'health', displayName: 'HEALTH' },
]

export interface CustomButonWithMenuProps {
	open: boolean
	keyString: string
	handleClick: (event: MouseEvent<HTMLButtonElement>, keySyring: string) => void
	handleClose: (keySyring: string) => void
	anchorEl: null | HTMLElement
	selected: string
	children: ReactElement
}

const CustomButonWithMenu = ({ open, keyString, handleClick, handleClose, anchorEl, selected, children }: CustomButonWithMenuProps) => {
	return (
		<Box sx={{ ...flexStyles.flexcenterJustifyFlexStart, gap: '10px' }}>
			<IconButton
				sx={{ height: '30px', width: '30px', border: '1px solid rgba(0, 0, 0, 0.2)' }}
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={(e) => handleClick(e, keyString)}
			>
				<CustomIcon name={iconKeys.addIcon} />
			</IconButton>

			<CustomMenu open={open} anchorEl={anchorEl} handleClose={() => handleClose('status')}>
				{children}
			</CustomMenu>
			<Typography variant={typographyKeys.body1}> {selected} </Typography>
		</Box>
	)
}

export interface TaskViewProps {
	task: Task
	handleTaskChange: (id: string, keyString: keyof Task, value: Task[keyof Task]) => void
	handleCancel: (id: string) => void
	handleAddTaskToDB: (task: Task) => Promise<void>
}

export const TaskView = ({ task, handleTaskChange, handleCancel, handleAddTaskToDB }: TaskViewProps) => {
	const theme = useTheme()
	const [calendarOpen, setCalendarOpen] = useState<boolean>(false)
	const [anchorEls, setAnchorEls] = useState<Record<string, null | HTMLElement>>({ status: null, category: null })
	const open = { status: Boolean(anchorEls.status), category: Boolean(anchorEls.category) }

	const handleClick = (event: MouseEvent<HTMLButtonElement>, keySyring: string) => {
		setAnchorEls((prev) => ({ ...prev, [keySyring]: event.currentTarget }))
	}

	const handleClose = (keySyring: string) => {
		setAnchorEls((prev) => ({ ...prev, [keySyring]: null }))
	}

	return (
		<Box key={task.id} sx={{ ...flexStyles.flexColumn, gap: '15px', padding: '12px 10px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
			<Box
				sx={{
					...flexStyles.flexRowSpaceBetweenAlignCenter,
					gap: '10px',
					pl: '90px',
				}}
			>
				<TextField
					variant='standard'
					placeholder='Task Title'
					value={task.name}
					onChange={(e) => handleTaskChange(task.id, 'name', e.target.value)}
					InputProps={{
						disableUnderline: true,
						style: {
							...theme.typography.body1,
						},
					}}
					inputProps={{
						style: {
							...theme.typography.body1,
						},
					}}
					sx={{
						flex: 1,
						padding: 0,
						margin: 0,
						'& .MuiInputBase-root': {
							padding: 0, // Ensures no additional padding
						},
						'& ::placeholder': {
							...theme.typography.body1,
							color: 'rgba(0, 0, 0, 0.5)',
							opacity: 1,
						},
					}}
				/>

				<Box sx={{ flex: 1 }}>
					{task.dueDate !== null ? (
						<Typography variant={typographyKeys.body1} onClick={() => setCalendarOpen(true)}>
							{isToday(task.dueDate) ? 'Today' : task.dueDate.toDateString()}
						</Typography>
					) : (
						<CustomizedButton
							textprops={{
								text: localeKeys.addDate,
								variant: typographyKeys.label1,
								color: 'rgba(0, 0, 0, 0.6)',
							}}
							sxprops={{
								minWidth: '98px',
								height: '30px',
								borderRadius: '60px',
								backgroundColor: 'transparent',
								border: '1px solid rgba(0, 0, 0, 0.2)',
								borderColor: 'rgba(0, 0, 0, 0.2)',
							}}
							iconprops={{
								startIcon: iconKeys.calenderIcon,
							}}
							onClick={() => setCalendarOpen(true)}
						/>
					)}

					{calendarOpen && (
						<CustomDatePicker
							value={task.dueDate}
							dialogOpen={calendarOpen}
							setDialogOpen={setCalendarOpen}
							onSingleDateChange={(date) => handleTaskChange(task.id, 'dueDate', date)}
						/>
					)}
				</Box>

				<Box sx={{ flex: 1 }}>
					<CustomButonWithMenu
						open={open.status}
						keyString={'status'}
						handleClick={handleClick}
						handleClose={handleClose}
						anchorEl={anchorEls.status}
						selected={task.status}
					>
						<>
							{statusList.map((item) => {
								return (
									<MenuItem
										key={item.id}
										onClick={() => {
											handleTaskChange(task.id, 'status', item.id)
											handleClose('status')
										}}
										selected={item.id === task.status}
									>
										{item.displayName}
									</MenuItem>
								)
							})}
						</>
					</CustomButonWithMenu>
				</Box>

				<Box sx={{ flex: 1 }}>
					<CustomButonWithMenu
						open={open.category}
						keyString={'category'}
						handleClick={handleClick}
						handleClose={handleClose}
						anchorEl={anchorEls.category}
						selected={task.category}
					>
						<>
							{categoryList.map((item) => {
								return (
									<MenuItem
										key={item.id}
										onClick={() => {
											handleTaskChange(task.id, 'category', item.id)
											handleClose('category')
										}}
										selected={item.id === task.category}
									>
										<Typography variant={typographyKeys.label1}>{item.displayName}</Typography>
									</MenuItem>
								)
							})}
						</>
					</CustomButonWithMenu>
				</Box>

				<Box sx={{ height: '26px', width: '26px' }}></Box>
			</Box>

			<Box sx={{ ...flexStyles.flexRowAlignStart, gap: '10px', pl: '80px' }}>
				<CustomizedButton
					textprops={{
						text: localeKeys.add.toUpperCase(),
						variant: typographyKeys.body2,
						color: '#fff',
					}}
					sxprops={{
						minWidth: '84px',
						height: '30px',
						borderRadius: '60px',
						backgroundColor: '#7B1984',
					}}
					disabled={!task?.name?.trim()}
					onClick={() => handleAddTaskToDB(task)}
				/>

				<CustomizedButton
					textprops={{
						text: localeKeys.cancel.toUpperCase(),
						variant: typographyKeys.body2,
						color: '#000',
					}}
					sxprops={{
						minWidth: '90px',
						height: '30px',
						borderRadius: '60px',
						backgroundColor: '#F4F4F4',
					}}
					onClick={() => handleCancel(task.id)}
				/>
			</Box>
		</Box>
	)
}

interface AddTaskProps {
	getTaskList: () => Promise<void>
}

const AddTask = ({ getTaskList }: AddTaskProps) => {
	const [taskList, setTaskList] = useState<Task[]>([])
	const dispatch = useDispatch()

	const tasksCollectionRef = collection(db, 'tasks')

	const handleAddTaskToDB = async (task: Task) => {
		dispatch(updateIsLoading(true))
		try {
			await addDoc(tasksCollectionRef, {
				status: task.status,
				name: task.name,
				dueDate: task.dueDate,
				category: task.category,
				userId: auth?.currentUser?.uid,
			})
			getTaskList()
			setTaskList((prev) => prev.filter((t) => t.id !== task.id))
		} catch (err) {
			dispatch(updateIsLoading(false))
			logger.log(err)
		}
	}

	const handleTaskChange = (id: string, keyString: keyof Task, value: Task[keyof Task]) => {
		const newData = taskList.map((item) => {
			if (item.id === id) {
				return { ...item, [keyString]: value }
			} else return item
		})

		setTaskList(newData)
	}

	const handleAddtask = () => {
		setTaskList((prev) => [
			...prev,
			{
				status: 'TO-DO',
				name: '',
				dueDate: null,
				category: '',
				id: crypto.randomUUID(),
			},
		])
	}

	const handleCancelAdd = (id: string) => {
		const newList = taskList.filter((task) => task.id !== id)
		setTaskList(newList)
	}

	return (
		<Box>
			<Box sx={{ ...flexStyles.flexRowAlignStart, p: '5px 55px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
				<Box
					component='button'
					sx={{
						...flexStyles.flexRowAlignStart,
						gap: '7px',
						cursor: 'pointer',
						border: 0,
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.05)',
						},
					}}
					onClick={handleAddtask}
				>
					<CustomIcon name={iconKeys.plus} />
					<Typography variant={typographyKeys.body2}>{localeKeys.addTask}</Typography>
				</Box>
			</Box>

			{taskList.map((task) => {
				return (
					<TaskView
						key={task.id}
						task={task}
						handleTaskChange={handleTaskChange}
						handleCancel={handleCancelAdd}
						handleAddTaskToDB={handleAddTaskToDB}
					/>
				)
			})}
		</Box>
	)
}

export default AddTask
