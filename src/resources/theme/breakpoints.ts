import { BreakpointsOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: true // removes the `xs` breakpoint
		sm: true
		md: true
		ml: true
		lg: true
		xl: true
		xxl: true
	}

	interface BreakpointsOptions {
		values: {
			xs: number
			sm: number
			md: number
			ml: number // Custom breakpoint
			lg: number
			xl: number
			xxl: number // Custom breakpoint
		}
	}
}

const breakpoints: BreakpointsOptions = {
	values: {
		xs: 320,
		sm: 481,
		md: 601,
		ml: 769,
		lg: 1025,
		xl: 1281,
		xxl: 1441,
	},
}

export default breakpoints
