import { Box, Typography } from '@mui/material'
import { flexStyles } from '../utils/commonStyles'
import { typographyKeys } from '../utils/resourceConstants'

const CustomCard = ({
	title,
	count,
	description,
	filter,
	hasFilter = true,
}: {
	title: string
	count: number | string
	description: string
	filter?: string
	hasFilter?: boolean
}) => {
	const filterString = hasFilter ? filter : ''
	return (
		<Box
			sx={{
				bgcolor: 'background.surface',
				border: '1px solid',
				backgroundImage: 'none',
				borderRadius: '16px',
				borderColor: 'border.lightBorder',
				padding: '20px',
				minWidth: '220px',
			}}
		>
			<Box sx={{ ...flexStyles.flexColumnCenter, gap: '8px' }}>
				<Typography variant={typographyKeys.h4} component='div'>
					{title}
				</Typography>

				<Typography variant={typographyKeys.h2} sx={{ color: 'text.success' }}>
					{count}
				</Typography>

				<Typography variant={typographyKeys.label1}>{description + ' ' + filterString}</Typography>
			</Box>
		</Box>
	)
}

export default CustomCard
