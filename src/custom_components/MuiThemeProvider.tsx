import { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material'
import { initialTheme } from './MuiTheme'
import Loader from './Loader'


const MuiThemeProvider = ({ children }: { children: ReactNode }) => {
	if (initialTheme) {
		return <ThemeProvider theme={initialTheme}>{children}</ThemeProvider>
	} else return <Loader />
}

export default MuiThemeProvider
