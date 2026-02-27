import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import Typography from '@mui/material/Typography/Typography';
import { Box, Button, Divider } from '@mui/material';

const ProfileAbout = () => {
    const { userId } = useParams();
    const { profile, loadingProfile } = useProfile(userId);

    if (loadingProfile) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h5" gutterBottom>
                    About {profile?.displayName}
                </Typography>
                <Button>
                    Edit Profile
                </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ overflow: "auto", maxHeight: 350 }}>
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {profile?.bio || "No description available."}
                </Typography>
            </Box>
        </Box>
    )
}

export default ProfileAbout
