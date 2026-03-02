import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import Typography from '@mui/material/Typography/Typography';
import { Box, Button, Divider } from '@mui/material';
import { useState } from 'react';
import ProfileEditorForm from './ProfileEditorForm';

const ProfileAbout = () => {
    const { userId } = useParams();
    const { profile, loadingProfile, isCurrentUser } = useProfile(userId);
    const [editMode, setEditMode] = useState(false);

    if (loadingProfile) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h5" gutterBottom>
                    About {profile?.displayName}
                </Typography>
                {isCurrentUser && (
                    <Button onClick={() => setEditMode(!editMode)}>
                        {editMode ? "Cancel" : "Edit Profile"}
                    </Button>
                )}
            </Box>
            <Divider sx={{ my: 2 }} />
            {editMode ? (
                <ProfileEditorForm setEditMode={setEditMode} />
            ) : (
                <Box sx={{ overflow: "auto", maxHeight: 350 }}>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                        {profile?.bio || "No description available."}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default ProfileAbout
