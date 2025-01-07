import { useTheme } from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import { logger } from '../logger'
import { ReactSVG } from 'react-svg'

export type CustomIconProps = {
	name: string
	typePng?: boolean
	style?: React.CSSProperties
	className?: string
	svgStyle?: string
	onClick?: React.MouseEventHandler<HTMLDivElement> & React.MouseEventHandler<SVGSVGElement>
}

/**
 * CustomIcon Component:
 * Whitelabeling icons based on theme (different icons for light and dark theme).
 *
 * Props:
 * - name: The name of the icon.
 * - typePng: A boolean indicating whether the icon is in PNG format.
 * - style: Custom styles for the icon.
 * - className: Custom class name for the icon.
 * - svgStyle: Custom styles specifically for SVG icons.
 * - onClick: Event handler for click events on the icon.
 */
const CustomIcon = ({ ...props }: CustomIconProps): ReactElement => {
	const theme = useTheme()

	const [iconModule, setIconModule] = useState<string>('')

	useEffect(() => {
		const importIconModule = async () => {
			try {
				// Determine the icon name based on the theme mode
				const iconName = theme.palette.mode === 'light' ? props.name : `${props.name}-dark`

				// Dynamically import the icon module based on the type (SVG or PNG)
				const module = props.typePng
					? await import(`../resources/images/png/${iconName}.png`)
					: await import(`../resources/images/svg/${iconName}.svg`)

				if (module?.default) {
					setIconModule(module.default) // Assuming your module has a default export
				} else {
					const newMod = await import(`../resources/default/images/svg/${props.name}.svg`)
					setIconModule(newMod.default)
				}
			} catch (error) {
				logger.log('Error loading SVG module')
			}
		}

		importIconModule()
	}, [props.name, theme.palette.mode])

	return props.typePng ? (
		// Render PNG image if typePng is true
		<img src={iconModule} style={props.style} className={props.className} onClick={props.onClick} />
	) : (
		// Render SVG using ReactSVG if typePng is false
		<ReactSVG
			src={iconModule}
			style={props.style}
			className={props.className}
			// Set additional styles for the SVG element if provided
			beforeInjection={
				props?.svgStyle
					? (svg) => {
							svg.setAttribute('style', props?.svgStyle ?? '')
					  }
					: undefined
			}
			onClick={props.onClick}
		/>
	)
}

export default CustomIcon
