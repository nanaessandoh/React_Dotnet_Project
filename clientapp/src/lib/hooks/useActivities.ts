import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = (activityId?: string) => {
    const queryClient = useQueryClient();

    // get activities
    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        }
    });

    // get activity by id
    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', activityId],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${activityId}`);
            return response.data;
        },
        enabled: !!activityId
    });

    //create activity
    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post('/activities', activity);
            return response.data;
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
        deleteActivity,
        activity,
        isLoadingActivity
    };
}