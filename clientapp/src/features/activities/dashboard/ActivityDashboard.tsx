import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({activities}: Props): JSX.Element {

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} />
            </Grid.Column>
        </Grid>
    );
}