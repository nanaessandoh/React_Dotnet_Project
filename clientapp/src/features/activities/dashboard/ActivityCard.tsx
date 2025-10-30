import React from 'react'
import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';

type Props = {
    activity: Activity;
    onSelectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

const ActivityCard = ({ activity, onSelectActivity, deleteActivity }: Props) => {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">
                    {activity.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                    {activity.date}
                </Typography>
                <Typography variant="body2">
                    {activity.description}
                </Typography>
                <Typography variant="subtitle1">
                    {activity.city} / {activity.venue}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
                <Chip label={activity.category} variant="outlined" />
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button size="medium" variant="contained" onClick={() => onSelectActivity(activity.activityId)}>View</Button>
                    <Button size="medium" variant="contained" color="error" onClick={() => deleteActivity(activity.activityId)}>Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}



export default ActivityCard
