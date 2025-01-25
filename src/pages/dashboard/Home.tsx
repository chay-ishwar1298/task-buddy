import { Box } from '@mui/material'
import ListView from './ListView'
import { useEffect, useState } from 'react'
import { Task } from './AddTask'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
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
			const data = await getDocs(tasksCollectionRef)
			const tasklist = data.docs.map((doc) => {
				const data = { ...doc.data() }
				const dateString = data?.dueDate ? data?.dueDate?.toDate() : null

				return { ...data, dueDate: new Date(dateString), id: doc.id }
			})

			setTasks(tasklist as Task[])
			dispatch(updateIsLoading(false))
		} catch (e) {
			logger.log(e)
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
