import { useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";

export const useProfile = (userId?: string) => {
    const queryClient = useQueryClient();
    const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
        queryKey: ['profile', userId],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/userprofiles/${userId}`);
            return response.data;
        },
        enabled: !!userId
    })

    const { data: photos, isLoading: loadingPhotos } = useQuery({
        queryKey: ['photos', userId],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/userprofiles/${userId}/photos`);
            return response.data;
        },
        enabled: !!userId
    })

    const isCurrentUser = useMemo(() => userId === queryClient.getQueryData<User>(['user'])?.id, [userId, queryClient]);

    return {
        profile,
        loadingProfile,
        photos,
        loadingPhotos,
        isCurrentUser
    }
};