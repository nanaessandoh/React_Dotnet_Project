import React, { type FormEvent } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';

type Props = {
    activity?: Activity;
    closeForm: () => void;
}
const ActivityForm = ({ activity, closeForm }: Props) => {
    const { createActivity, updateActivity } = useActivities();

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
            closeForm();
        } else {
            await createActivity.mutateAsync(data as unknown as Activity);
            closeForm();
        }
    }

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Create Activity
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
                    <Button variant="outlined" color="inherit" onClick={closeForm}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default ActivityForm
