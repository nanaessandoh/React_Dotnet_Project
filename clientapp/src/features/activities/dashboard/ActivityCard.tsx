import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';
import { Link } from 'react-router';

type Props = {
    activity: Activity;
}

const ActivityCard = ({ activity }: Props) => {
    const { deleteActivity } = useActivities();

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
                    <Button component={Link} to={`/activities/${activity.activityId}`} size="medium" variant="contained">View</Button>
                    <Button size="medium" variant="contained" color="error" disabled={deleteActivity.isPending} onClick={() => deleteActivity.mutate(activity.activityId)}>Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}



export default ActivityCard
