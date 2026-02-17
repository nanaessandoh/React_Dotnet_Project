import { Grid2, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useActivities } from '../../../lib/hooks/useActivities';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';


const ActivityDetailsPage = () => {
    const { activityId } = useParams();
    const { activity, isLoadingActivity } = useActivities(activityId);

    if (isLoadingActivity)
        return (<Typography>Loading...</Typography>)

    if (!activity)
        return (<Typography>Activity not found</Typography>);

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={8}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                <ActivityDetailsChat />
            </Grid2>
            <Grid2 size={4}>
                <ActivityDetailsSidebar activity={activity} />
            </Grid2>
        </Grid2>
    )
}

export default ActivityDetailsPage
