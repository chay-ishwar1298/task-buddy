/**
 * This file contains various color augmentation for this project
 * here we are overiding material ui default color palette to define our colors
 * this colors can be accesed directly in the project
 *  with the name of palette and the variant name
 *  like colorPaletteName.color
 * example:
 *<Typography sx={{ color: 'background.default' }}>
        Welcome to next js
      </Typography>
 */

import { createTheme, ThemeOptions } from '@mui/material'
import { colors, darkColors } from './colors'

const { palette } = createTheme()

// define customized color options
declare module '@mui/material/styles' {
	interface PaletteColor {
		defaultHeading?: string
		subHeading?: string
		defaultBorder: string
		disable?: string
		primary?: string
		warning?: string
		success?: string
		error?: string
		backgroundMain?: string
		surface?: string
		secondary?: string
		primaryLight?: string
		primaryHover?: string
		topNavigation?: string
		default?: string
		active?: string
		color?: string
		blurBg?: string
		purple1?: string
		purple2?: string
		yellowishBg?: string
		lightBorder?: string
		dropwdownBg?: string
		bgLight?: string
		yellowish1?: string
		yellowish2?: string
		blue?: string
		purple?: string
		emerald?: string
		yellow?: string
	}

	interface SimplePaletteColorOptions {
		defaultHeading?: string
		subHeading?: string
		defaultBorder: string
		disable?: string
		primary?: string
		warning?: string
		success?: string
		error?: string
		backgroundMain?: string
		surface?: string
		secondary?: string
		primaryLight?: string
		primaryHover?: string
		topNavigation?: string
		default?: string
		active?: string
		color?: string
		blurBg?: string
		purple1?: string
		purple2?: string
		yellowishBg?: string
		lightBorder?: string
		dropwdownBg?: string
		bgLight?: string
		yellowish1?: string
		yellowish2?: string
		blue?: string
		purple?: string
		emerald?: string
		yellow?: string
	}

	interface TypeText {
		primary: string
		secondary: string
		subHeading: string
		disable: string
		warning: string
		success: string
		error: string
		default: string
		defaultHeading: string
		special: string
	}

	interface TypeBackground {
		default: string
		background2?: string
		surface?: string
		primary: string
		primaryLight?: string
		primaryHover?: string
		secondary?: string
		warning?: string
		success?: string
		error?: string
		topNavigation?: string
		blurBg?: string
		dropwdownBg?: string
		bgLight?: string
		yellowish1?: string
		yellowish2?: string
		blue?: string
		purple?: string
		emerald?: string
		yellow?: string
	}

	interface Palette {
		icon: PaletteColor
		border: PaletteColor
		gradient: PaletteColor
	}

	interface PaletteOptions {
		icon?: SimplePaletteColorOptions
		border?: SimplePaletteColorOptions
		gradient?: SimplePaletteColorOptions
	}
}

// Update the Button's color options to include a salmon option
declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		salmon: true
	}
}

//define palette for light theme
export const light: ThemeOptions = {
	palette: {
		mode: 'light',

		//overriding default color of background palette
		background: {
			default: colors.background.backgroundMain,
			background2: colors.background.primary,
			surface: colors.background.surface,
			primaryLight: colors.background.primaryLight,
			primaryHover: colors.background.primaryHover,
			secondary: colors.background.secondary,
			warning: colors.background.warning,
			success: colors.background.success,
			error: colors.background.error,
			topNavigation: colors.background.topNavigation,
			blurBg: colors.background.blurBg,
			dropwdownBg: colors.background.dropwdownBg,
			bgLight: colors.background.bgLight,
			blue: colors.background.blue,
			purple: colors.background.purple,
			emerald: colors.background.emerald,
			yellow: colors.background.yellow,
		},

		common: {
			black: colors.black,
			white: colors.white,
		},

		//overridden default text palette (added extra color option --- tertiary)
		text: {
			primary: colors.text.primary,
			secondary: colors.text.defaultHeading,
			subHeading: colors.text.subHeading,
			disable: colors.text.disable,
			warning: colors.text.warning,
			success: colors.text.success,
			error: colors.text.error,
			defaultHeading: colors.text.defaultHeading,
			special: colors.text.special,
		},

		// creating custom palette (any augmentColor palette must have "main" color, any other added colors must be declared first )

		//palette augmentation for icon color variants
		icon: palette.augmentColor({
			color: {
				main: colors.icon.main,
				active: colors.icon.active,
				primary: colors.icon.primary,
				disable: colors.icon.disable,
				warning: colors.icon.warning,
				success: colors.icon.success,
				error: colors.icon.error,
				defaultBorder: colors.icon.main,
			},
		}),

		//palette augmentation for border variants
		border: palette.augmentColor({
			color: {
				main: colors.border.main,
				active: colors.border.active,
				primary: colors.border.primary,
				disable: colors.border.disable,
				warning: colors.border.warning,
				success: colors.border.success,
				error: colors.border.error,
				defaultBorder: colors.border.main,
				lightBorder: colors.border.lightBorder,
			},
		}),

		//palette augmentation for gradient variants
		gradient: palette.augmentColor({
			color: {
				main: colors.gradient.purple1,
				defaultBorder: colors.border.main,
				purple1: colors.gradient.purple1,
				purple2: colors.gradient.purple2,
				yellowish1: colors.gradient.yellowish1,
				yellowish2: colors.gradient.yellowish2,
				yellowishBg: colors.gradient.yellowishGradient,
			},
		}),
	},
}

//define palette for dark theme
export const dark: ThemeOptions = {
	palette: {
		mode: 'dark',
		background: {
			default: darkColors.background.backgroundMain,
			background2: darkColors.background.primary,
			surface: darkColors.background.surface,
			primaryLight: darkColors.background.primaryLight,
			primaryHover: darkColors.background.primaryHover,
			secondary: darkColors.background.secondary,
			warning: darkColors.background.warning,
			success: darkColors.background.success,
			error: darkColors.background.error,
			topNavigation: darkColors.background.topNavigation,
			blurBg: darkColors.background.blurBg,
			dropwdownBg: darkColors.background.dropwdownBg,
			bgLight: darkColors.background.bgLight,
			blue: colors.background.blue,
			purple: colors.background.purple,
			emerald: colors.background.emerald,
			yellow: colors.background.yellow,
		},

		common: {
			black: darkColors.black,
			white: darkColors.white,
		},

		//overridden default text palette (added extra color option --- tertiary)
		text: {
			primary: darkColors.text.primary,
			default: darkColors.text.default,
			secondary: darkColors.text.defaultHeading,
			subHeading: darkColors.text.subHeading,
			disable: darkColors.text.disable,
			warning: darkColors.text.warning,
			success: darkColors.text.success,
			error: darkColors.text.error,
			defaultHeading: darkColors.text.defaultHeading,
			special: darkColors.text.special,
		},

		// creating custom palette (any augmentColor palette must have "main" color, any other added darkColors must be declared first )

		//palette augmentation for icon color variants
		icon: palette.augmentColor({
			color: {
				main: darkColors.icon.main,
				active: darkColors.icon.active,
				primary: darkColors.icon.primary,
				disable: darkColors.icon.disable,
				warning: darkColors.icon.warning,
				success: darkColors.icon.success,
				error: darkColors.icon.error,
				defaultBorder: darkColors.icon.main,
			},
		}),

		//palette augmentation for border variants
		border: palette.augmentColor({
			color: {
				main: darkColors.border.main,
				active: darkColors.border.active,
				primary: darkColors.border.primary,
				disable: darkColors.border.disable,
				warning: darkColors.border.warning,
				success: darkColors.border.success,
				error: darkColors.border.error,
				defaultBorder: darkColors.border.main,
				lightBorder: darkColors.border.lightBorder,
			},
		}),

		//palette augmentation for gradient variants
		gradient: palette.augmentColor({
			color: {
				main: colors.gradient.purple1,
				defaultBorder: colors.border.main,
				purple1: colors.gradient.purple1,
				purple2: colors.gradient.purple2,
				yellowish1: darkColors.gradient.yellowish1,
				yellowish2: darkColors.gradient.yellowish2,
				yellowishBg: darkColors.gradient.yellowishGradient,
			},
		}),
	},
}
