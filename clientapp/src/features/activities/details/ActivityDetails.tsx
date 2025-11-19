import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';

type Props = {
    selectedActivity: Activity;
    onCancelSelectActivity: () => void;
    openForm: (id?: string) => void;
}
const ActivityDetails = ({ selectedActivity, onCancelSelectActivity, openForm }: Props) => {
    const { activities } = useActivities();
    const activity = activities?.find(a => a.activityId === selectedActivity.activityId);

    return !activity ? (<Typography>Loading...</Typography>) : (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia
                component="img"
                src={`/images/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="subtitle1" fontWeight="light">{activity.date}</Typography>
                <Typography variant="body1">{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button color="primary" onClick={() => openForm(activity.activityId)}>Edit</Button>
                <Button color="inherit" onClick={() => onCancelSelectActivity()}>Cancel</Button>
            </CardActions>
        </Card>
    )
}

export default ActivityDetails
