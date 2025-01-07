import { createTheme } from '@mui/material'
import breakpoints from '../resources/theme/breakpoints'
import { light } from '../resources/theme/palette/mode'
import { deskTopTypography } from '../resources/theme/typography/typography'

const themeOptions = { ...light, ...deskTopTypography, breakpoints }

export const initialTheme = createTheme(themeOptions)
