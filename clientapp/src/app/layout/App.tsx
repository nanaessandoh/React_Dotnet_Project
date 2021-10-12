import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';
import axios from 'axios';

export default function App(): JSX.Element {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState< Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities')
            .then((response) => {
            setActivities(response.data);
        });
    }, []);

    function handleSelectActivity(id: string): void {
        setSelectedActivity(activities.find(x => x.id === id));
    }

    function handleCancelSelectActivity(): void {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string ) : void {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditActivity (activity: Activity): void {
        activity.id
        ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) //Edit
        : setActivities([...activities, activity]); //Create
        setEditMode(false);
        setSelectedActivity(activity);
    }

    return (
        <>
            <NavBar openForm={handleFormOpen} />
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard 
                    activities={ activities }
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                />
            </Container>
        </>
    );
}