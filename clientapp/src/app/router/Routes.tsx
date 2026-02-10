import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import RouteError from "../../features/errors/RouteError";
import LoginForm from "../../features/user/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../features/user/RegisterForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <RouteError />,
        children: [
            {
                element: <RequireAuth />,
                children: [
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

                ]
            },
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "counter",
                element: <Counter />
            },
            {
                path: "errors",
                element: <TestErrors />
            },
            {
                path: "not-found",
                element: <NotFound />
            },
            {
                path: "server-error",
                element: <ServerError />
            },
            {
                path: "login",
                element: <LoginForm />
            },
            {
                path: "register",
                element: <RegisterForm />
            },
            {
                path: "*",
                element: <Navigate replace to="/not-found" />
            }
        ]
    },
]);

