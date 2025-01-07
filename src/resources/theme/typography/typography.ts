/**
 * This file contains various Typography definition for this project
 * here we are overiding material ui default typography to define our custom typography
 */

import { ThemeOptions } from '@mui/material'
import React from 'react'

//font family constants
const ptSansReg = '"PTSansReg", "sans-serif"'
const ptSansBold = '"PTSansBold", "sans-serif"'
// const pragatiNarrowReg = '"PragatiNarrowReg"'
const pragatiNarrowBold = '"PragatiNarrowBold"'
const nulshokBold = '"NulshokBold"'

//declare custom variants here before using
declare module '@mui/material/styles' {
	interface TypographyVariants {
		button1: React.CSSProperties
		label1: React.CSSProperties
		label2: React.CSSProperties
		label3: React.CSSProperties
		callout: React.CSSProperties
		callout1: React.CSSProperties
		callout2: React.CSSProperties
		callout3: React.CSSProperties
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		button1?: React.CSSProperties

		label1?: React.CSSProperties
		label2?: React.CSSProperties
		label3?: React.CSSProperties
		callout?: React.CSSProperties
		callout1?: React.CSSProperties
		callout2?: React.CSSProperties
		callout3?: React.CSSProperties
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		button1: true
		label1: true
		label2: true
		label3: true
		callout: true
		callout1: true
		callout2: true
		callout3: true
	}
}

//add this typograhy in themeOptions
export const deskTopTypography: ThemeOptions = {
	typography: {
		fontFamily: ptSansReg,
		fontWeightRegular: 400,
		fontWeightBold: 700,

		//display/desktop (this typlography is named as display/desktop in figma design)
		h1: {
			fontFamily: nulshokBold,
			fontSize: '32px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Headline/Large (in figma)
		h2: {
			fontFamily: ptSansBold,
			fontSize: '25px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Headline/Medium L (in figma)
		h3: {
			fontFamily: ptSansBold,
			fontSize: '20px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Headline/Medium  (in figma)
		h4: {
			fontFamily: ptSansReg,
			fontSize: '17px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Headline/small (in figma)

		h5: {
			fontFamily: ptSansBold,
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//button/small (in figma)
		h6: {
			fontFamily: pragatiNarrowBold,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//button/Large (in figma)

		button: {
			fontFamily: pragatiNarrowBold,
			fontSize: '20px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},
		//button/Medium (in figma)

		button1: {
			fontFamily: pragatiNarrowBold,
			fontSize: '15px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Label/Regular/Large (in figma)

		subtitle1: {
			fontFamily: ptSansReg,
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Label/Regular/Medium (in figma)

		subtitle2: {
			fontFamily: ptSansReg,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Label/Bold/Medum (in figma)

		label1: {
			fontFamily: pragatiNarrowBold,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Label/Regular/Small in figma

		label2: {
			fontFamily: ptSansReg,
			fontSize: '10px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Label/Bold/Small in figma
		label3: {
			fontFamily: ptSansReg,
			fontSize: '10px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Callout/Regular/Large in figma
		body1: {
			fontFamily: ptSansReg,
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Callout/Bold/Large in figma

		body2: {
			fontFamily: ptSansReg,
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Callout/Regular/Medium in figma
		callout: {
			fontFamily: ptSansBold,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Callout/Bold/Medium in figma
		callout1: {
			fontFamily: ptSansBold,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},
		//Callout/Regular/Small in figma
		callout2: {
			fontFamily: ptSansReg,
			fontSize: '10px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Callout/Bold/Small in figma

		callout3: {
			fontFamily: ptSansBold,
			fontSize: '10px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},
	},
}

export const mobileTypography: ThemeOptions = {
	typography: {
		fontFamily: ptSansReg,
		fontWeightRegular: 400,
		fontWeightBold: 700,

		//display/desktop (this typlography is named as display/desktop in figma design)
		h1: {
			fontFamily: nulshokBold,
			fontSize: '20px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Headline/Large (in figma)
		h2: {
			fontFamily: ptSansBold,
			fontSize: '20px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Headline/Medium L (in figma)
		h3: {
			fontFamily: ptSansBold,
			fontSize: '17px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Headline/Medium  (in figma)

		h4: {
			fontFamily: ptSansReg,
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Headline/small (in figma)

		h5: {
			fontFamily: ptSansBold,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//button/small (in figma)
		h6: {
			fontFamily: pragatiNarrowBold,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//button/Large (in figma)

		button: {
			fontFamily: pragatiNarrowBold,
			fontSize: '17px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},
		//button/Medium (in figma)

		button1: {
			fontFamily: pragatiNarrowBold,
			fontSize: '15px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Label/Regular/Large (in figma)

		subtitle1: {
			fontFamily: ptSansReg,
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Label/Regular/Medium (in figma)

		subtitle2: {
			fontFamily: ptSansReg,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Label/Bold/Medum (in figma)

		label1: {
			fontFamily: pragatiNarrowBold,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Label/Regular/Small in figma

		label2: {
			fontFamily: ptSansReg,
			fontSize: '10px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Label/Bold/Small in figma
		label3: {
			fontFamily: ptSansReg,
			fontSize: '10px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},

		//Callout/Regular/Large in figma
		body1: {
			fontFamily: ptSansReg,
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Callout/Bold/Large in figma

		body2: {
			fontFamily: ptSansReg,
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},
		//Callout/Regular/Medium in figma

		callout: {
			fontFamily: ptSansBold,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Callout/Bold/Medium in figma
		callout1: {
			fontFamily: ptSansBold,
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},
		//Callout/Regular/Small in figma
		callout2: {
			fontFamily: ptSansReg,
			fontSize: '10px',
			fontStyle: 'normal',
			fontWeight: 400,
			wordBreak: 'break-word',
		},

		//Callout/Bold/Small in figma

		callout3: {
			fontFamily: ptSansBold,
			fontSize: '10px',
			fontStyle: 'normal',
			fontWeight: 700,
			wordBreak: 'break-word',
		},
	},
}
