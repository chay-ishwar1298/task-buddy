import { Box, Typography } from '@mui/material'
import { flexStyles } from '../../utils/commonStyles'
import CustomCollapse from '../../custom_components/CustomCollapse'
import { localeKeys } from '../../utils/localeConstants'
import { typographyKeys } from '../../utils/resourceConstants'
import AddTask, { Task } from './AddTask'
import AddedTasks from './AddedTask'
import { useEffect, useState } from 'react'
import SelectedTasksHandleUI from './SelectedTasksHandleUI'
import { useAppDispatch } from '../../custom_components/CustomHooks'
import { updateIsLoading } from '../../current_user/currentUserSlice'
import { logger } from '../../logger'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'

export const NoDataUI = ({ title }: { title: string }) => {
	return (
		<Box sx={{ ...flexStyles.flexColumnJustifyAlignCenter, minHeight: '158px', height: '100%', width: '100%' }}>
			<Typography variant={typographyKeys.h5} sx={{ color: '#2F2F2F' }}>
				{localeKeys.noTasksIn + ' ' + title}
			</Typography>
		</Box>
	)
}

interface ListViewProps {
	tasks: Task[] | null
	getTaskList: () => Promise<void>
}

const ListView = ({ tasks, getTaskList }: ListViewProps) => {
	const dispatch = useAppDispatch()
	const [checkedList, setCheckedList] = useState<string[]>([])
	const [snackbarOpen, setSnackbarOpen] = useState(false)

	useEffect(() => {
		if (checkedList.length > 0) {
			setSnackbarOpen(true)
		} else setSnackbarOpen(false)
	}, [checkedList])

	const handleUpdateTaskStatus = async (statusStr: string) => {
		dispatch(updateIsLoading(true)) // Show loading state
		try {
			const updatePromises = checkedList.map((id) => {
				const taskDoc = doc(db, 'tasks', id)
				return updateDoc(taskDoc, {
					status: statusStr,
					userId: auth?.currentUser?.uid,
				})
			})

			// Wait for all updates to complete
			await Promise.all(updatePromises)
			setCheckedList([])
			// Fetch the updated task list after all updates
			getTaskList()
		} catch (err) {
			logger.log(err) // Log any errors
		} finally {
			dispatch(updateIsLoading(false)) // Hide loading state
		}
	}

	const handleDeleteFromDb = async () => {
		dispatch(updateIsLoading(true))
		try {
			// Create an array of delete operations
			const deleteOperations = checkedList.map((id) => {
				const taskDoc = doc(db, 'tasks', id)
				return deleteDoc(taskDoc)
			})

			// Execute all delete operations in parallel
			await Promise.all(deleteOperations)
			setCheckedList([])
			// Refresh task list after deletion
			getTaskList()
		} catch (err) {
			logger.log(err)
		} finally {
			dispatch(updateIsLoading(false))
		}
	}

	return (
		<Box sx={{ ...flexStyles.flexColumn, gap: '20px' }}>
			<CustomCollapse title={localeKeys.todo}>
				<Box sx={{ ...flexStyles.flexColumn }}>
					<AddTask getTaskList={getTaskList} />

					<AddedTasks
						tasks={tasks}
						getTaskList={getTaskList}
						status={'TO-DO'}
						checkedList={checkedList}
						setCheckedList={setCheckedList}
						title={localeKeys.todo}
					/>
				</Box>
			</CustomCollapse>
			<CustomCollapse title={localeKeys.inProgress} color='#85D9F1'>
				<Box sx={{ height: '100%', width: '100%' }}>
					<AddedTasks
						tasks={tasks}
						getTaskList={getTaskList}
						status='IN-PROGRESS'
						checkedList={checkedList}
						setCheckedList={setCheckedList}
						title={localeKeys.progress}
					/>
				</Box>
			</CustomCollapse>
			<CustomCollapse title={localeKeys.completed} color='#CEFFCC'>
				<Box sx={{ height: '100%', width: '100%' }}>
					<AddedTasks
						tasks={tasks}
						getTaskList={getTaskList}
						status='COMPLETED'
						checkedList={checkedList}
						setCheckedList={setCheckedList}
						title={localeKeys.completed}
					/>
				</Box>
			</CustomCollapse>
			{snackbarOpen && (
				<SelectedTasksHandleUI
					open={snackbarOpen}
					count={checkedList.length}
					handleUpdateTaskStatus={handleUpdateTaskStatus}
					handleDeleteAll={handleDeleteFromDb}
					getTaskList={getTaskList}
				/>
			)}
		</Box>
	)
}

export default ListView
