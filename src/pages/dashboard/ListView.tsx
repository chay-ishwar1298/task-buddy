import { Box, Typography } from '@mui/material'
import { flexStyles } from '../../utils/commonStyles'
import CustomCollapse from '../../custom_components/CustomCollapse'
import { localeKeys } from '../../utils/localeConstants'
import { typographyKeys } from '../../utils/resourceConstants'
import AddTask from './AddTask'

const NoDataUI = ({ title }: { title: string }) => {
	return (
		<Box sx={{ ...flexStyles.flexColumnJustifyAlignCenter, minHeight: '158px', height: '100%', width: '100%' }}>
			<Typography variant={typographyKeys.h5} sx={{ color: '#2F2F2F' }}>
				{localeKeys.noTasksIn + ' ' + title}
			</Typography>
		</Box>
	)
}

const ListView = () => {
	return (
		<Box sx={{ ...flexStyles.flexColumn, gap: '20px' }}>
			<CustomCollapse title={localeKeys.todo}>
				<Box sx={{...flexStyles.flexColumn}}>
                    <AddTask />
					<NoDataUI title={localeKeys.todo} />
				</Box>
			</CustomCollapse>
			<CustomCollapse title={localeKeys.inProgress} color='#85D9F1'>
				<Box sx={{ height: '100%', width: '100%' }}>
					<NoDataUI title={localeKeys.progress} />
				</Box>
			</CustomCollapse>
			<CustomCollapse title={localeKeys.completed} color='#CEFFCC'>
				<Box sx={{ height: '100%', width: '100%' }}>
					<NoDataUI title={localeKeys.completed} />
				</Box>
			</CustomCollapse>
		</Box>
	)
}

export default ListView
