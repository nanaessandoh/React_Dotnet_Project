import { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { activitySchema, ActivitySchema } from '../../../lib/schemas/activitySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../../app/shared/components/TextInput';
import SelectInput from '../../../app/shared/components/SelectInput';
import { categoryOptions } from './categoryOptions';
import DateTimeInput from '../../../app/shared/components/DateTimeInput';


const ActivityForm = () => {
    const { reset, handleSubmit, control } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });
    const { activityId } = useParams();
    const { createActivity, updateActivity, activity, isLoadingActivity } = useActivities(activityId);

    const onSubmit = async (data: ActivitySchema) => {
        console.log(data);
    }

    useEffect(() => {
        if (activity) {
            reset({
                ...activity,
                date: new Date(activity.date)
            });
        }
    }, [activity, reset]);

    if (isLoadingActivity)
        return (<Typography>Loading...</Typography>)

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component="form" display="flex" flexDirection="column" gap={3} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <TextInput label="Title" control={control} name="title" />
                <TextInput label="Description" control={control} name="description" multiline rows={3} />
                <SelectInput items={categoryOptions} label="Category" control={control} name="category" />
                <DateTimeInput label="Date" control={control} name="date" />
                <TextInput label="City" control={control} name="city" />
                <TextInput label="Venue" control={control} name="venue" />
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

export default ActivityForm;

