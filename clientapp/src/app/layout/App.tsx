import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import { NavBar } from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import { useActivities } from "../../lib/hooks/useActivities";

const App = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(a => a.activityId === id));
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


  return (
    <Box sx={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenCreateForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities && isPending ? (<Typography>Loading...</Typography>)
          : (<ActivityDashBoard
            activities={activities!}
            selectedActivity={selectedActivity}
            onSelectActivity={handleSelectActivity}
            onCancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleOpenCreateForm}
            closeForm={handleCloseForm}
          />)}

      </Container>
    </Box>
  )
}

export default App