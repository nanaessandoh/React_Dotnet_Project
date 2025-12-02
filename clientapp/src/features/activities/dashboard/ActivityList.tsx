import ActivityCard from './ActivityCard';
import { Box, Typography } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';

const ActivityList = () => {
    const { activities, isPending } = useActivities();

    return !activities && isPending
        ? (
            <Typography>Loading...</Typography>)
        : (
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
