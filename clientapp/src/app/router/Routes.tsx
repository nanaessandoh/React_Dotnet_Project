import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import Counter from "../../features/counter/Counter";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "activities",
                element: <ActivityDashBoard />
            },
            {
                path: "createActivity",
                element: <ActivityForm key='create' /> // Adding key to force remounting
            },
            {
                path: "activities/:activityId",
                element: <ActivityDetailsPage />
            },
            {
                path: "manage/:activityId",
                element: <ActivityForm key='manage' /> // Adding key to force remounting
            },
            {
                path: "counter",
                element: <Counter />
            }
        ]
    },
]);

