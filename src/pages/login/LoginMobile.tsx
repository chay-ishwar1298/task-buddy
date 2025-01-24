// import { collection, getDocs } from 'firebase/firestore'
// import { db } from '../config/firebase'

import { Box } from '@mui/material'
import mobileBg from '../../resources/images/svg/mobile_bg_onboard.svg'
import LoginForm from './LoginForm'

const LoginMobile = () => {
	// const [tasks, setTasks] = useState<Tasks[] | null>(null)
	// const tasksCollectionRef = collection(db, 'tasks')

	// const getTestData = async () => {
	// 	try {
	// 		const data = await getDocs(tasksCollectionRef)
	// 		const tasklist = data.docs.map((doc) => {
	// 			const data = { ...doc.data() }
	// 			const dateString = data.dueDate.toDate()

	// 			return { ...data, dueDate: new Date(dateString), id: doc.id }
	// 		})

	// 		setTasks(tasklist as Tasks[])
	// 	} catch (e) {
	// 		logger.log(e)
	// 	}
	// }

	// useEffect(() => {
	// 	getTestData()
	// }, [])
	return (
		<Box sx={{ height: '100dvh', width: '100dvw', position: 'relative' }}>
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
					width: '100%',
					backgroundImage: `url(${mobileBg})`,
					backgroundSize: '100% calc(100% - 20px)',
					backgroundPosition: 'top',
					backgroundRepeat: 'no-repeat',
					zIndex: 0,
				}}
			></Box>
			<LoginForm />
		</Box>
	)
}

export default LoginMobile
