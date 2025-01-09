import { Suspense } from 'react'
import { CssBaseline } from '@mui/material'
import MuiThemeProvider from './custom_components/MuiThemeProvider'

import Routing from './Routing'
import Loader from './custom_components/Loader'
import { useAppSelector } from './custom_components/CustomHooks'
import Toast from './custom_components/Toast'

function App() {
	const { title, subTitle, isSuccess, showToast, isLoading } = useAppSelector((store) => store.currentUser)
	return (
		<Suspense fallback={<Loader />}>
			<MuiThemeProvider>
				<CssBaseline />
				{showToast && <Toast title={title} subTitle={subTitle} isSuccess={isSuccess} />}
				{isLoading && <Loader />}
				<Routing />
			</MuiThemeProvider>
		</Suspense>
	)
}

export default App
