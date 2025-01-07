import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../custom_components/CustomHooks'
import { flexStyles } from '../utils/commonStyles'
import CustomCard from './CustomCard'
import CustomSingleSelect from '../custom_components/CustomSingleSelect'
import { useEffect, useState } from 'react'

import { typographyKeys } from '../utils/resourceConstants'
import { fetchStats } from '../current_user/currentUserSlice'

export interface Option {
	id: string
	label: string
}

export function formatTime(seconds: number) {
	const hours = Math.floor(seconds / 3600) // Get total hours
	const minutes = Math.floor((seconds % 3600) / 60) // Get remaining minutes
	const secs = Math.round(seconds % 60) // Get remaining seconds

	return `${hours}h ${minutes}m ${secs}s`
}

const filterOptions = [
	{ id: '1', label: 'Today' },
	{ id: '2', label: 'This Week' },
	{ id: '3', label: 'This Month' },
	{ id: '4', label: 'This Year' },
]

// Skeleton components
// const QuickStatsSkeleton = () => (
// 	<Box sx={{ bgcolor: 'background.surface', p: 2, borderRadius: '16px', ...flexStyles.flexRowSpaceBetweenAlignCenter, height: '112px' }}>
// 		<Box sx={{ ...flexStyles.flexColumn, flexGrow: 1 }}>
// 			<Skeleton variant='text' width='60%' height={16} />
// 			<Skeleton variant='text' width='40%' height={16} sx={{ my: 1 }} />
// 			<Skeleton variant='text' width='80%' height={16} />
// 		</Box>
// 		<Skeleton variant='circular' width={80} height={80} />
// 	</Box>
// )

const Home = () => {
	const dispatch = useAppDispatch()

	const [isLoading, setIsloading] = useState(false)
	const [selectedFilter, setSelectedFilter] = useState<Option | null>(filterOptions[0])
	// const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
	// const isTab = useMediaQuery(theme.breakpoints.down('lg'))

	const { stats } = useAppSelector((store) => store.currentUser)

	const fetchStatsData = async () => {
		setIsloading(true)
		const body = {
			filter: {
				dates: Number(selectedFilter?.id),
			},
		}
		await dispatch(fetchStats(body))
		setIsloading(false)
	}

	useEffect(() => {
		fetchStatsData()
	}, [selectedFilter])

	const countData = [
		// {
		// 	_id: '12345',
		// 	title: 'Total Players',
		// 	count: stats?.totalUsers,
		// 	description: 'Players in the platform',
		// 	hasFilter: false,
		// },
		{
			_id: '12346',
			title: 'New Players',
			count: stats?.newLogins,
			description: 'Players joined',
			hasFilter: true,
		},
		{
			_id: '12347',
			title: 'Returned Players',
			count: stats?.returnedUsers,
			description: 'Players Returned',
			hasFilter: true,
		},
		{
			_id: '12348',
			title: 'Average Time Spent',
			count: formatTime(stats?.averageTimeSpent ?? 0),
			description: 'time spent by players',
			hasFilter: true,
		},
	]

	return (
		<Box sx={{ p: '20px 40px' }}>
			<Box sx={{ ...flexStyles.flexColumnCenter }}>
				<Box
					sx={{
						flex: '1 1 calc(25% - 16px)', // 4 columns on large screens
						maxWidth: 'calc(25% - 16px)',
						minWidth: '220px', // Ensures a minimum size for smaller screens
						mb: '20px',
					}}
				>
					<CustomCard title='Total Players' count={stats?.totalUsers ?? 0} description='Players in the platform' hasFilter={false} />
				</Box>
			</Box>

			<Box sx={{ width: '100%', ...flexStyles.flexRowSpaceBetweenAlignCenter, gap: '10px' }}>
				<Box sx={{ ...flexStyles.flexRowJustifyStart, gap: '8px' }}>
					<Typography variant={typographyKeys.h3} sx={{ mb: '5px' }}>
						Stats
					</Typography>
				</Box>

				<Box sx={{ width: '200px', mb: '20px' }}>
					<CustomSingleSelect
						name='filter'
						placeholder=''
						options={filterOptions}
						onSelect={(option) => setSelectedFilter(option)}
						value={selectedFilter}
					/>
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center', // Center align items horizontally
					gap: 2, // Spacing between items
				}}
			>
				{isLoading
					? Array(3)
							.fill(0)
							.map((_, index) => (
								<Box
									key={index}
									sx={{
										flex: '1 1 calc(25% - 16px)', // 4 columns on large screens
										maxWidth: 'calc(25% - 16px)',
										minWidth: '220px', // Ensures a minimum size for smaller screens
									}}
								></Box>
							))
					: countData?.map((item) => (
							<Box
								key={item._id}
								sx={{
									flex: '1 1 calc(25% - 16px)', // 4 columns on large screens
									maxWidth: 'calc(25% - 16px)',
									minWidth: '220px', // Ensures a minimum size for smaller screens
								}}
							>
								<CustomCard
									title={item.title}
									count={item.count ?? 0}
									description={item.description}
									hasFilter={item.hasFilter}
									filter={selectedFilter?.label}
								/>
							</Box>
					  ))}
			</Box>
		</Box>
	)
}

export default Home
