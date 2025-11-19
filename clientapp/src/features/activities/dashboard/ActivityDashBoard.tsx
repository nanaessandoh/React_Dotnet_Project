import React from 'react';
import { Grid2 } from '@mui/material';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

type Props = {
    activities: Activity[];
    selectedActivity?: Activity;
    onSelectActivity: (id: string) => void;
    onCancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id?: string) => void;
    closeForm: () => void;
}

const ActivityDashBoard = ({
    activities,
    selectedActivity,
    onSelectActivity,
    onCancelSelectActivity,
    editMode,
    openForm,
    closeForm
}: Props) => {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList
                    activities={activities}
                    onSelectActivity={onSelectActivity}
                />
            </Grid2>
            <Grid2 size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        selectedActivity={selectedActivity}
                        onCancelSelectActivity={onCancelSelectActivity}
                        openForm={openForm}
                    />
                }
                {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} />}
            </Grid2>
        </Grid2>
    )
}

export default ActivityDashBoard
