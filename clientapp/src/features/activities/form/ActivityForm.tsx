import { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { activitySchema, ActivitySchema } from '../../../lib/schemas/activitySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../../app/shared/components/TextInput';
import SelectInput from '../../../app/shared/components/SelectInput';
import { categoryOptions } from './categoryOptions';
import DateTimeInput from '../../../app/shared/components/DateTimeInput';
import LocationInput from '../../../app/shared/components/LocationInput';
import { Activity } from '../../../lib/types';


const ActivityForm = () => {
    const { reset, handleSubmit, control } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });
    const { activityId } = useParams();
    const { createActivity, updateActivity, activity, isLoadingActivity } = useActivities(activityId);
    const navigate = useNavigate();

    const onSubmit = async (data: ActivitySchema) => {
        console.log(data);
        const { location, ...activityData } = data;
        const flattendedData = { ...activityData, ...location } as Activity;
        try {
            if (activity) {
                await updateActivity.mutateAsync({ ...activity, ...flattendedData }, {
                    onSuccess: () => navigate(`/activities/${activity.activityId}`)
                });
            } else {
                await createActivity.mutateAsync(flattendedData, {
                    onSuccess: (createdActivity) => navigate(`/activities/${createdActivity.activityId}`)
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = () => {
        if (activity) {
            navigate(`/activities/${activity.activityId}`);
        } else {
            navigate('/activities');
        }
    }

    useEffect(() => {
        if (activity) {
            reset({
                ...activity,
                date: new Date(activity.date),
                location: {
                    venue: activity.venue,
                    city: activity.city,
                    latitude: activity.latitude,
                    longitude: activity.longitude,
                }
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
                <Box display="flex" gap={3}>
                    <SelectInput items={categoryOptions} label="Category" control={control} name="category" />
                    <DateTimeInput label="Date" control={control} name="date" />
                </Box>
                <LocationInput control={control} name="location" />
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button type="submit" variant="contained" color="success" disabled={createActivity.isPending || updateActivity.isPending}>
                        Submit
                    </Button>
                    <Button variant="outlined" color="inherit" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default ActivityForm;

