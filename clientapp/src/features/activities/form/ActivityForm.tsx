import React, { type FormEvent } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

type Props = {
    activity?: Activity;
    closeForm: () => void;
    handleSubmitForm: (activity: Activity) => void;
}
const ActivityForm = ({ activity, closeForm, handleSubmitForm }: Props) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (activity) {
            data['activityId'] = activity.activityId;
        }

        handleSubmitForm(data as unknown as Activity);
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
                <TextField name="date" label="Date" defaultValue={activity?.date} type="datetime-local" variant="outlined" />
                <TextField name="city" label="City" defaultValue={activity?.city} fullWidth />
                <TextField name="vanue" label="Venue" defaultValue={activity?.venue} fullWidth />
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button type="submit" variant="contained" color="success">
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
