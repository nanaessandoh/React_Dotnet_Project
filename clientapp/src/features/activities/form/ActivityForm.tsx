import { type FormEvent } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';
import { useNavigate, useParams } from 'react-router';


const ActivityForm = () => {
    const navigate = useNavigate();
    const { activityId } = useParams();
    const { createActivity, updateActivity, activity, isLoadingActivity } = useActivities(activityId);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (activity) {
            data['activityId'] = activity.activityId;
            await updateActivity.mutateAsync(data as unknown as Activity);
            navigate(`/activities/${activity.activityId}`);
        } else {
            createActivity.mutate(data as unknown as Activity, {
                onSuccess: (newActivity) => {
                    navigate(`/activities/${(newActivity as Activity).activityId}`);
                }
            });
        }
    }

    if (isLoadingActivity)
        return (<Typography>Loading...</Typography>)

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component="form" display="flex" flexDirection="column" gap={3} autoComplete="off" onSubmit={handleSubmit}>
                <TextField name="title" label="Title" defaultValue={activity?.title} fullWidth />
                <TextField name="description" label="Description" defaultValue={activity?.description} fullWidth multiline rows={3} />
                <TextField name="category" label="Category" defaultValue={activity?.category} fullWidth />
                <TextField name="date" label="Date" defaultValue={activity?.date
                    ? new Date(activity.date).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0]} type="date" variant="outlined" />
                <TextField name="city" label="City" defaultValue={activity?.city} fullWidth />
                <TextField name="venue" label="Venue" defaultValue={activity?.venue} fullWidth />
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button type="submit" variant="contained" color="success" disabled={createActivity.isPending || updateActivity.isPending}>
                        Submit
                    </Button>
                    <Button variant="outlined" color="inherit">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default ActivityForm
