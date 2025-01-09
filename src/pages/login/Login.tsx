import { useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import LoginMobile from './LoginMobile'
import LoginDesk from './LoginDesk'

const Login = () => {
	const theme = useTheme()

	const belowMd = useMediaQuery(theme.breakpoints.down('ml'))
	return belowMd ? <LoginMobile /> : <LoginDesk />
}

export default Login
