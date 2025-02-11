import { Box, Checkbox, Divider, IconButton, MenuItem, Typography } from '@mui/material'
import { Task, TaskView } from './AddTask'
import { flexStyles } from '../../utils/commonStyles'
import CustomIcon from '../../custom_components/CustomIcon'
import { iconKeys, typographyKeys } from '../../utils/resourceConstants'
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import CustomMenu from '../../custom_components/CustomMenu'
import { localeKeys } from '../../utils/localeConstants'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useAppDispatch } from '../../custom_components/CustomHooks'
import { auth, db } from '../../config/firebase'
import { logger } from '../../logger'
import { updateIsLoading } from '../../current_user/currentUserSlice'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../utils/commonConstants'
import shadows from '@mui/material/styles/shadows'
import { SetterFunction } from '../../utils/types'
import { NoDataUI } from './ListView'

export interface AddedTaskProps {
	tasks: Task[] | null
	getTaskList: () => Promise<void>
	status: string
	checkedList: string[]
	setCheckedList: SetterFunction<string[]>
	title: string
}

export interface TaskUIProps {
	task: Task
	checkedList: string[]
	removeFromChecklist: (id: string) => void
	addToChecklist: (id: string) => void
	getTaskList: () => Promise<void>
	handleEnableEdit: (id: string) => void
}

const TaskUI = ({ task, checkedList, removeFromChecklist, addToChecklist, getTaskList, handleEnableEdit }: TaskUIProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const dispatch = useAppDispatch()

	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.TASK,
		item: task,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}))

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			addToChecklist(task.id)
		} else removeFromChecklist(task.id)
	}

	const handleDeleteFromDb = async (id: string) => {
		dispatch(updateIsLoading(true))
		try {
			const taskDoc = doc(db, 'tasks', id)
			await deleteDoc(taskDoc)
			getTaskList()
		} catch (err) {
			logger.log(err)
			dispatch(updateIsLoading(false))
		}
	}

	return (
		<Box
			key={task.id}
			ref={drag}
			sx={{ ...flexStyles.flexRowAlignCenter, p: '12px 10px', width: '100%', gap: '10px', opacity: isDragging ? 0.9 : 1 }}
		>
			<Checkbox
				size='small'
				checked={checkedList.includes(task.id)}
				icon={<CustomIcon name={iconKeys.uncheck} style={{ height: '20px', width: '20px' }} />}
				checkedIcon={<CustomIcon name={iconKeys.check} style={{ height: '20px', width: '20px' }} />}
				onChange={handleCheckChange}
				sx={{ height: '22px', width: '22px' }}
			/>

			<CustomIcon name={iconKeys.dragIcon} style={{ height: '16px', width: '22px' }} />
			<CustomIcon name={task.status === 'COMPLETED' ? iconKeys.successGreen : iconKeys.successGrey} style={{ height: '20px', width: '20px' }} />

			<Box
				sx={{
					...flexStyles.flexRowSpaceBetweenAlignCenter,
					gap: '10px',
					width: '100%',
				}}
			>
				<Typography variant={typographyKeys.body1} sx={{ flex: 1 }}>
					{task.name}
				</Typography>
				<Typography variant={typographyKeys.body1} sx={{ flex: 1 }}>
					{task.dueDate?.toDateString()}
				</Typography>
				<Typography variant={typographyKeys.body1} sx={{ flex: 1 }}>
					{task.status}
				</Typography>
				<Typography variant={typographyKeys.body1} sx={{ flex: 1 }}>
					{task.category}
				</Typography>

				<IconButton
					sx={{ height: '26px', width: '26px' }}
					id='basic-button'
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={(e) => handleClick(e)}
				>
					<CustomIcon name={iconKeys.moreIcon} style={{ height: '26px', width: '26px' }} />
				</IconButton>

				<CustomMenu open={open} anchorEl={anchorEl} handleClose={() => handleClose()}>
					<>
						<MenuItem>
							<Box sx={{ ...flexStyles.flexCenter, gap: '10px' }} onClick={() => handleEnableEdit(task.id)}>
								<CustomIcon name={iconKeys.editIcon} style={{ height: '16px', width: '16px' }} />
								<Typography variant={typographyKeys.label1}>{localeKeys.edit}</Typography>
							</Box>
						</MenuItem>
						<MenuItem onClick={() => handleDeleteFromDb(task.id)}>
							<Box sx={{ ...flexStyles.flexCenter, gap: '10px' }}>
								<CustomIcon name={iconKeys.deleteIcon} style={{ height: '16px', width: '16px' }} />
								<Typography variant={typographyKeys.label1} sx={{ color: 'rgba(218, 47, 47, 1)' }}>
									{localeKeys.delete}
								</Typography>
							</Box>
						</MenuItem>
					</>
				</CustomMenu>
			</Box>
		</Box>
	)
}

const AddedTasks = ({ tasks, getTaskList, status, setCheckedList, checkedList, title }: AddedTaskProps) => {
	const dispatch = useAppDispatch()

	const [editMode, setEditMode] = useState<string[]>([])
	const [taskList, setTaskList] = useState<Task[] | null>([])

	const handleUpdateTaskStatus = async (task: Task, statusStr: string) => {
		dispatch(updateIsLoading(true))
		try {
			const taskDoc = doc(db, 'tasks', task.id)
			await updateDoc(taskDoc, {
				status: statusStr,
				name: task.name,
				dueDate: task.dueDate,
				category: task.category,
				userId: auth?.currentUser?.uid,
			})

			getTaskList()
		} catch (err) {
			dispatch(updateIsLoading(false))
			logger.log(err)
		}
	}

	const [{ canDrop }, drop] = useDrop(
		() => ({
			accept: ItemTypes.TASK,
			drop: (task: Task) => handleUpdateTaskStatus(task, status),
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
		}),
		[]
	)

	useEffect(() => {
		if (tasks) {
			setTaskList(tasks?.filter((task) => task.status === status))
		}
	}, [tasks])

	const addToChecklist = (id: string) => {
		setCheckedList((prev) => [...prev, id])
	}

	const removeFromChecklist = (id: string) => {
		const newData = checkedList.filter((item) => item !== id)
		setCheckedList(newData)
	}

	const handleEnableEdit = (id: string) => {
		setEditMode((prev) => [...prev, id])
	}

	const handleEditTask = async (task: Task) => {
		dispatch(updateIsLoading(true))
		try {
			const taskDoc = doc(db, 'tasks', task.id)
			await updateDoc(taskDoc, {
				status: task.status,
				name: task.name,
				dueDate: task.dueDate,
				category: task.category,
				userId: auth?.currentUser?.uid,
			})
			setEditMode((prev) => prev.filter((item) => item !== task.id))
			getTaskList()
		} catch (err) {
			dispatch(updateIsLoading(false))
			logger.log(err)
		}

		console.log(task)
	}

	const handleTaskChange = (id: string, keyString: keyof Task, value: Task[keyof Task]) => {
		const newData =
			taskList?.map((item) => {
				if (item.id === id) {
					return { ...item, [keyString]: value }
				} else return item
			}) ?? []

		setTaskList(newData)
	}

	const handleCancelAdd = (id: string) => {
		setEditMode((prev) => prev.filter((item) => item !== id))
		const newData =
			taskList?.map((item) => {
				if (item.id === id) {
					return tasks?.filter((task) => task.id === item.id)?.[0] ?? item
				} else return item
			}) ?? []
		setTaskList(newData)
	}

	return (
		<Box ref={drop} sx={{ ...flexStyles.flexColumn, boxShadow: canDrop ? shadows[1] : 0 }}>
			{taskList && taskList.length > 0 ? (
				taskList.map((task, i) => {
					return (
						<React.Fragment key={task.id}>
							{editMode.includes(task.id) ? (
								<TaskView
									task={task}
									handleTaskChange={handleTaskChange}
									handleCancel={handleCancelAdd}
									handleAddTaskToDB={handleEditTask}
								/>
							) : (
								<>
									<TaskUI
										task={task}
										checkedList={checkedList}
										addToChecklist={addToChecklist}
										removeFromChecklist={removeFromChecklist}
										getTaskList={getTaskList}
										handleEnableEdit={handleEnableEdit}
									/>
									{i !== taskList?.length - 1 && (
										<Divider
											sx={{
												backgroundColor: '1px solid rgba(0, 0, 0, 0.1)',
												borderColor: '1px solid rgba(0, 0, 0, 0.1)',
												color: '1px solid rgba(0, 0, 0, 0.1)',
												height: '1px',
											}}
										/>
									)}{' '}
								</>
							)}
						</React.Fragment>
					)
				})
			) : (
				<NoDataUI title={title} />
			)}
		</Box>
	)
}

export default AddedTasks
