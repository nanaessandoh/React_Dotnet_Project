import { Person } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from '@mui/material';
import { Link } from 'react-router';

type Props = {
    profile: Profile;
}

const ProfileCard = ({ profile }: Props) => {

    return (
        <Link to={`/profiles/${profile.userId}`} style={{ textDecoration: 'none' }}>
            <Card
                elevation={4}
                sx={{ maxWidth: 300, borderRadius: 3, p: 3, textDecoration: 'none' }}
            >
                <CardMedia
                    component="img"
                    src={profile?.imageUrl || '/images/user.png'}
                    sx={{ width: "100%", zIndex: 50 }}
                    alt={profile.displayName + " image"}
                />
                <CardContent>
                    <Box display={'flex'} flexDirection={"column"} gap={1}>
                        <Typography variant="h5">{profile.displayName}</Typography>
                        {profile.bio && (
                            <Typography variant="body2" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {profile.bio}
                            </Typography>
                        )}
                        {profile.following && <Chip size="small" label="Following" color="secondary" variant="outlined" />}
                    </Box>
                </CardContent>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                    <Person />
                    <Typography sx={{ ml: 1 }}>{profile.followersCount === 0 ? `No followers` : profile.followersCount === 1 ? `1 follower` : `${profile.followersCount} followers`}</Typography>
                </Box>
            </Card>
        </Link>
    )
}

export default ProfileCard