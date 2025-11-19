import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = () => {
    const queryClient = useQueryClient();

    // get activities
    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        }
    });

    //create activity
    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.post('/activities', activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    // update activity
    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.patch(`/activities`, activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    // delete activity
    const deleteActivity = useMutation({
        mutationFn: async (activityId: string) => {
            await agent.delete(`/activities/${activityId}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    return {
        activities,
        isPending,
        createActivity,
        updateActivity,
        deleteActivity
    };
}