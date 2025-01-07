import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/LoginPage'
import NotFound from './custom_components/NotFound'
import Home from './pages/Home'
import { getUserFromLocalStorage } from './utils/localStorage'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const user = getUserFromLocalStorage()

	// Redirect to login if user is not authenticated
	return user ? children : <Navigate to='/login' replace />
}

const AuthRoute = ({ children }: { children: JSX.Element }) => {
	const user = getUserFromLocalStorage()

	// Redirect to dashboard if already logged in
	return user ? <Navigate to='/dashboard' replace /> : children
}

const Routing = () => {
	return (
		<Routes>
			{/* Redirect root path to dashboard */}
			<Route path='/' element={<Navigate to='/dashboard' replace />} />

			{/* Protected dashboard route */}
			<Route
				path='/dashboard'
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			>
				<Route index element={<Home />} />
			</Route>

			{/* Auth route for login */}
			<Route
				path='/login'
				element={
					<AuthRoute>
						<Login />
					</AuthRoute>
				}
			/>

			{/* Catch-all route for 404 */}
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default Routing
