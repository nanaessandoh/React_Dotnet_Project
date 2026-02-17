import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useUser } from "./useUser";

export const useActivities = (activityId?: string) => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const { currentUser } = useUser();

    // get activities
    const { data: activities, isLoading } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        },
        enabled: location.pathname === '/activities' && !activityId && !!currentUser,
        select: (data) => {
            return data.map(activity => {
                return {
                    ...activity,
                    isGoing: activity.attendees.some(a => a.userId === currentUser?.id),
                    isHost: activity.hostUserId === currentUser?.id
                };
            });
        }
    });

    // get activity by id
    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', activityId],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${activityId}`);
            return response.data;
        },
        enabled: !!activityId && !!currentUser,
        select: (data) => {
            return {
                ...data,
                isGoing: data.attendees.some(a => a.userId === currentUser?.id),
                isHost: data.hostUserId === currentUser?.id
            };
        }
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
            await agent.patch(`/activities/${activity.activityId}`, activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    // update activity attendance
    const updateAttendance = useMutation({
        mutationFn: async (activityId: string) => {
            await agent.post(`/activities/${activityId}/attend`);
        },
        onMutate: async (activityId: string) => {
            await queryClient.cancelQueries({ queryKey: ['activities', activityId] });

            const previousActivity = queryClient.getQueryData<Activity>(['activities', activityId]);

            if (previousActivity) {
                queryClient.setQueryData(['activities', activityId], (oldActivity: Activity | undefined) => {
                    if (!oldActivity || !currentUser) {
                        return oldActivity;
                    }

                    const isHost = oldActivity.hostUserId === currentUser.id;
                    const isGoing = oldActivity.attendees.some(a => a.userId === currentUser.id);

                    return {
                        ...oldActivity,
                        isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
                        attendees: isGoing ?
                            isHost ? oldActivity.attendees :
                                oldActivity.attendees.filter(a => a.userId !== currentUser.id) :
                            [...oldActivity.attendees,
                            {
                                userId: currentUser.id,
                                displayName: currentUser.displayName,
                                imageUrl: currentUser.imageUrl
                            }
                            ]
                    }
                });
                return { previousActivity };
            }
        },
        onError: (error, activityId, context) => {
            console.error('Error updating attendance', error);
            if (context?.previousActivity) {
                queryClient.setQueryData(['activities', activityId], context.previousActivity);
            }
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
        isLoading,
        createActivity,
        updateActivity,
        deleteActivity,
        updateAttendance,
        activity,
        isLoadingActivity
    };
}