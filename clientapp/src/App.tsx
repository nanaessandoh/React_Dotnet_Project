import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('https://localhost:5001/api/activities');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
      }
    }

    fetchActivities().then(data => setActivities(data));

    return () => {};

  }, []);

  return (
    <>
    <Typography variant='h3'>Reactivities</Typography>
    <List>
      {activities.map(activity => (
        <ListItem key={activity.id}>
          <ListItemText>
            {activity.title}
          </ListItemText>
        </ListItem>
      ))}
    </List>
    </>
  )
}

export default App