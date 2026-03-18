import { Grid2, Typography } from '@mui/material'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import { useParams } from 'react-router'
import { useProfile } from '../../lib/hooks/useProfile'

const ProfilePage = () => {
    const { userId } = useParams();
    const { profile, loadingProfile } = useProfile(userId);

    if (loadingProfile) return <Typography>Loading profile...</Typography>;
    if (!profile) return <Typography>Profile not found</Typography>;

    return (
        <Grid2 container>
            <Grid2 size={12}>
                <ProfileHeader />
                <ProfileContent />
            </Grid2>
        </Grid2>
    )
}

export default ProfilePage
