import React from 'react'
import ActivityCard from './ActivityCard';
import { Box } from '@mui/material';

type Props = {
    activities: Activity[];
    onSelectActivity: (id: string) => void;
}

const ActivityList = ({ activities, onSelectActivity }: Props) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {activities.map((activity) => (
                <ActivityCard
                    key={activity.activityId}
                    activity={activity}
                    onSelectActivity={onSelectActivity}
                />
            ))}
        </Box>
    )
}

export default ActivityList
