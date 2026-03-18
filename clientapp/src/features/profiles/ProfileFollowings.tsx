import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import { useStore } from '../../lib/hooks/useStore';
import { useProfile } from '../../lib/hooks/useProfile';
import { Box, Divider, Typography } from '@mui/material';
import ProfileCard from './ProfileCard';
import { JSX } from 'react';


const Helmet = (body: JSX.Element, activeTab: number, profile: Profile): JSX.Element => {
    return (
        <Box>
            <Box display={'flex'}>
                <Typography variant="h5">
                    {activeTab === 3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`}
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            {body}
        </Box>
    )
}

const ProfileFollowings = observer(function ProfileFollowings() {
    const { userId } = useParams();
    const { uiStore } = useStore();
    const activeTab = uiStore.activeTab;
    const followingType = activeTab === 3
        ? "followers"
        : "following";
    const { profile, followings, loadingFollowings } = useProfile(userId, followingType);

    if (loadingFollowings) {
        return (<Typography>Loading...</Typography>);
    }

    if (followings?.length === 0) {
        return activeTab === 3 ? Helmet((<Typography>No followers</Typography>), activeTab, profile!)
            : Helmet((<Typography>Not following anyone</Typography>), activeTab, profile!)
    }

    return Helmet((
        <Box display={"flex"} marginTop={3} gap={3}>
            {followings?.map(profile => (
                <ProfileCard key={profile.userId} profile={profile} />
            ))}
        </Box>), activeTab, profile!);
});

export default ProfileFollowings
