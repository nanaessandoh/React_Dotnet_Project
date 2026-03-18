import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";

export const useProfile = (userId?: string, followingType?: FollowingType) => {
    const queryClient = useQueryClient();

    const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
        queryKey: ['profile', userId],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/userprofiles/${userId}`);
            return response.data;
        },
        enabled: !!userId && !followingType
    });

    const { data: photos, isLoading: loadingPhotos } = useQuery({
        queryKey: ['photos', userId],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/userprofiles/${userId}/photos`);
            return response.data;
        },
        enabled: !!userId && !followingType
    });

    const { data: followings, isLoading: loadingFollowings } = useQuery<Profile[]>({
        queryKey: ['followings', userId, followingType],
        queryFn: async () => {
            const response = await agent.get<Profile[]>(`/userprofiles/${userId}/follow-list?type=${followingType}`);
            return response.data;
        },
        enabled: !!userId && !!followingType
    });

    const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('File', file);
            const response = await agent.post<Photo>(`/userprofiles/add-photo`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        },
        onSuccess: async (newPhoto) => {
            // Invalidate the photos query to refetch the updated list of photos
            await queryClient.invalidateQueries({ queryKey: ['photos', userId] });
            queryClient.setQueryData<User>(['user'], (old: User | undefined) => {
                if (old) {
                    // If the user doesn't have an image, set it to the new photo's URL
                    return { ...old, imageUrl: old.imageUrl || newPhoto.url };
                }
                return old;
            });
            queryClient.setQueryData<Profile>(['profile', userId], (old: Profile | undefined) => {
                if (old) {
                    // If the profile doesn't have an image, set it to the new photo's URL
                    return { ...old, imageUrl: old.imageUrl || newPhoto.url };
                }
                return old;
            });
        }
    });

    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.patch(`/userprofiles/photos/${photo.photoId}/set-main`);
        },
        onSuccess: (_, photo: Photo) => {
            queryClient.setQueryData<User>(['user'], (old: User | undefined) => {
                if (old) {
                    // Update user image to the new main photo URL
                    return { ...old, imageUrl: photo.url };
                }
                return old;
            });
            queryClient.setQueryData<Profile>(['profile', userId], (old: Profile | undefined) => {
                if (old) {
                    // Update profile photo to the new main photo URL
                    return { ...old, imageUrl: photo.url };
                }
                return old;
            });
        }
    });

    const updateProfile = useMutation({
        mutationFn: async (profile: Profile) => {
            await agent.patch(`/userprofiles/update-profile`, profile)
        },
        onSuccess: (_, profile: Profile) => {
            queryClient.setQueryData<User>(['user'], (old: User | undefined) => {
                if (old) {
                    // Update user display name
                    return { ...old, displayName: profile.displayName };
                }
                return old;
            });
            queryClient.setQueryData<Profile>(['profile', userId], (old: Profile | undefined) => {
                if (old) {
                    // Update display name and bio
                    return { ...old, displayName: profile.displayName, bio: profile.bio };
                }
                return old;
            });
        }
    });

    const deletePhoto = useMutation({
        mutationFn: async (photoId: string) => {
            await agent.delete(`/userprofiles/${photoId}/photos`);
        },
        onSuccess: (_, photoId: string) => {
            queryClient.setQueryData<Photo[]>(['photos', userId], (old: Photo[] | undefined) => {
                if (old) {
                    // Remove the deleted photo from the photos list
                    return old.filter(photo => photo.photoId !== photoId);
                }
                return old;
            });
        }
    });

    const updateFollowing = useMutation({
        mutationFn: async () => {
            await agent.post(`/userprofiles/${userId}/follow`)
        },
        onSuccess: () => {
            queryClient.setQueryData(['profile', userId], (profile: Profile) => {
                queryClient.invalidateQueries({ queryKey: ["followings", userId, "followers"] })
                if (!profile || profile.followersCount === undefined) return profile;

                return {
                    ...profile,
                    following: !profile.following,
                    followersCount: profile.following
                        ? profile.followersCount - 1
                        : profile.followersCount + 1
                } as Profile;
            })
        }
    });

    const isCurrentUser = useMemo(() => userId === queryClient.getQueryData<User>(['user'])?.id, [userId, queryClient]);

    return {
        profile,
        loadingProfile,
        photos,
        loadingPhotos,
        uploadPhoto,
        setMainPhoto,
        updateProfile,
        deletePhoto,
        updateFollowing,
        followings,
        loadingFollowings,
        isCurrentUser
    }
};