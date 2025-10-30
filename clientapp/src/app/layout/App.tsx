import { Box, Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavBar } from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.activityId === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenCreateForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    if (activity.activityId) {
      setActivities(activities.map(x => x.activityId === activity.activityId ? activity : x));
    } else {
      activity.activityId = crypto.randomUUID();
      setActivities([...activities, activity]);
    }
    setEditMode(false);
    setSelectedActivity(activity);
  }

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(x => x.activityId !== id));
    if (selectedActivity?.activityId === id) {
      handleCancelSelectActivity();
    }
  }

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setActivities([]);;
      }
    }

    fetchActivities();

    return () => {
      setActivities([]);
      setSelectedActivity(undefined);
    };

  }, []);

  return (
    <Box sx={{ backgroundColor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenCreateForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          onSelectActivity={handleSelectActivity}
          onCancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleOpenCreateForm}
          closeForm={handleCloseForm}
          handleSubmitForm={handleSubmitForm}
          deleteActivity={deleteActivity}
        />
      </Container>
    </Box>
  )
}

export default App