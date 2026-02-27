import { Avatar, Box, Button, Chip, Divider, Grid2, Paper, Stack, Typography } from '@mui/material';

type Props = {
    profile: Profile;
}

const ProfileHeader = ({ profile }: Props) => {
    const isFollowing = true;

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
                            {isFollowing &&
                                <Chip variant={"outlined"} color={"secondary"} label={"Following"} sx={{ borderRadius: 1 }} />}
                        </Box>
                    </Stack>
                </Grid2>
                <Grid2 size={4}>
                    <Stack spacing={2} alignItems={"center"}>
                        <Box display={"flex"} justifyContent={"space-around"} width={"100%"}>
                            <Box textAlign={"center"}>
                                <Typography variant='h6'>Followers</Typography>
                                <Typography variant='h3'>20</Typography>
                            </Box>
                            <Box textAlign={"center"}>
                                <Typography variant='h6'>Following</Typography>
                                <Typography variant='h3'>42</Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ width: '100%' }} />
                        <Button variant='outlined' color={isFollowing ? "error" : "success"} fullWidth>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    </Stack>
                </Grid2>
            </Grid2>
        </Paper>
    )
}

export default ProfileHeader
