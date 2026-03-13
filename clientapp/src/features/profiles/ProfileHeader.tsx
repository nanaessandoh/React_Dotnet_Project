import { Avatar, Box, Button, Chip, Divider, Grid2, Paper, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';


const ProfileHeader = () => {
    const { userId } = useParams();
    const { isCurrentUser, profile, updateFollowing, loadingProfile } = useProfile(userId);

    if (loadingProfile) return <Typography>Loading profile...</Typography>;
    if (!profile) return <Typography>Profile not found</Typography>;

    return (
        <Paper elevation={3} sx={{ borderRadius: 3, p: 4 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={8}>
                    <Stack direction={'row'} alignItems={'center'} spacing={3}>
                        <Avatar
                            sx={{ width: 150, height: 150 }}
                            src={profile.imageUrl}
                            alt="Profile image"
                        />
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <Typography variant='h4'>{profile.displayName}</Typography>
                            {profile.following &&
                                <Chip variant={"outlined"} color={"secondary"} label={"Following"} sx={{ borderRadius: 1 }} />}
                        </Box>
                    </Stack>
                </Grid2>
                <Grid2 size={4}>
                    <Stack spacing={2} alignItems={"center"}>
                        <Box display={"flex"} justifyContent={"space-around"} width={"100%"}>
                            <Box textAlign={"center"}>
                                <Typography variant='h6'>Followers</Typography>
                                <Typography variant='h3'>{profile.followersCount}</Typography>
                            </Box>
                            <Box textAlign={"center"}>
                                <Typography variant='h6'>Following</Typography>
                                <Typography variant='h3'>{profile.followingCount}</Typography>
                            </Box>
                        </Box>
                        {!isCurrentUser && (
                            <>
                                <Divider sx={{ width: '100%' }} />
                                <Button
                                    onClick={() => updateFollowing.mutate()}
                                    disabled={updateFollowing.isPending}
                                    variant='outlined'
                                    color={profile.following ? "error" : "success"}
                                    fullWidth
                                >
                                    {profile.following ? 'Unfollow' : 'Follow'}
                                </Button>
                            </>
                        )}
                    </Stack>
                </Grid2>
            </Grid2>
        </Paper>
    )
}

export default ProfileHeader
