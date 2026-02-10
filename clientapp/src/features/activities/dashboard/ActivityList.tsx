import ActivityCard from './ActivityCard';
import { Box, Typography } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';

const ActivityList = () => {
    const { activities, isLoading } = useActivities();

    if (isLoading) return <Typography>Loading...</Typography>

    if (!activities || activities.length === 0) {
        return <Typography>No activities found.</Typography>
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {activities && activities.map((activity) => (
                <ActivityCard
                    key={activity.activityId}
                    activity={activity}
                />
            ))}
        </Box>
    )
}

export default ActivityList
