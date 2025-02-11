import { Box } from '@mui/material'
import ListView from './ListView'
import { useEffect, useState } from 'react'
import { Task } from './AddTask'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { logger } from '../../logger'
import { useAppDispatch } from '../../custom_components/CustomHooks'
import { updateIsLoading } from '../../current_user/currentUserSlice'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Home = () => {
	const [tasks, setTasks] = useState<Task[] | null>(null)
	const dispatch = useAppDispatch()
	const tasksCollectionRef = collection(db, 'tasks')

	const getTaskList = async () => {
		dispatch(updateIsLoading(true))
		try {
			// Reference to the 'tasks' collection

			// Query to fetch only tasks where userId matches the authenticated user
			const q = query(tasksCollectionRef, where('userId', '==', auth?.currentUser?.uid))

			// Execute the query
			const data = await getDocs(q)

			// Transform the Firestore documents into a structured task list
			const tasklist = data.docs.map((doc) => {
				const taskData = { ...doc.data() }
				const dateString = taskData?.dueDate ? taskData?.dueDate.toDate() : null

				return { ...taskData, dueDate: new Date(dateString), id: doc.id }
			})

			setTasks(tasklist as Task[])
		} catch (e) {
			logger.log(e)
		} finally {
			dispatch(updateIsLoading(false))
		}
	}

	useEffect(() => {
		getTaskList()
	}, [])

	return (
		<Box>
			<Box>
				<DndProvider backend={HTML5Backend}>
					<ListView tasks={tasks} getTaskList={getTaskList} />
				</DndProvider>
			</Box>
		</Box>
	)
}

export default Home
