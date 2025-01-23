import React, { useState } from 'react'
import { Box, Collapse, IconButton, IconButtonProps, styled, Typography } from '@mui/material'
import CustomIcon from './CustomIcon'
import { flexStyles } from '../utils/commonStyles'
import { iconKeys, typographyKeys } from '../utils/resourceConstants'
import { logger } from '../logger'

interface CustomCollapseProps {
	title: string
	value?: string
	children: React.ReactNode
	color?: string
}

const styles = {
	container: {
		border: '1px solid',
		borderColor: '#EAECF0',
		borderRadius: '10px',
		backgroundColor: '#F1F1F1',
	},
	header1: {
		...flexStyles.flexRowSpaceBetweenAlignCenter,
		gap: '10px',
		borderBottom: '1px solid',
		borderColor: '#EAECF0',
		p: '9px 12px',
	},
	header2: {
		...flexStyles.flexRowSpaceBetweenAlignCenter,
		gap: '10px',
		backgroundColor: 'common.white',
		minHeight: '50px',
		borderColor: 'greyNew.lightmain',
		p: '0px 24px 0px 10px',
	},
	content: {
		width: '100%',
	},
}

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props
	logger.log(expand)
	return <IconButton size='small' {...other} />
})(({ theme }) => ({
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
	variants: [
		{
			props: ({ expand }) => !expand,
			style: {
				transform: 'rotate(0deg)',
			},
		},
		{
			props: ({ expand }) => !!expand,
			style: {
				transform: 'rotate(180deg)',
			},
		},
	],
}))

const CustomCollapse = ({ ...props }: CustomCollapseProps) => {
	const { title, children } = props
	const [open, setOpen] = useState(true)

	const handleToggle = () => {
		setOpen(!open)
	}

	return (
		<Box
			sx={{
				...styles.container,
			}}
		>
			<Box
				sx={{
					...styles.header1,
					borderRadius: open ? '10px 10px 0px 0px' : '10px',
					backgroundColor: props.color ?? '#FAC3FF',
					'&:hover': {
						boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.10)',
					},
				}}
				onClick={handleToggle}
			>
				<Box sx={{ ...flexStyles.flexRowSpaceBetweenAlignCenter, width: '100%', gap: '4px' }}>
					<Typography variant={typographyKeys.subtitle1} sx={{ fontWeight: 500 }}>
						{' '}
						{title}{' '}
					</Typography>

					<ExpandMore expand={open} aria-expanded={open} aria-label='show more'>
						<CustomIcon name={iconKeys.caretDown} style={{ height: '15px', width: '15px' }} svgStyle='height: 15px; width:15px' />
					</ExpandMore>
				</Box>
			</Box>
			<Collapse in={open} timeout='auto' unmountOnExit>
				<Box sx={{ ...styles.content }}>{children}</Box>
			</Collapse>
		</Box>
	)
}

export default CustomCollapse
