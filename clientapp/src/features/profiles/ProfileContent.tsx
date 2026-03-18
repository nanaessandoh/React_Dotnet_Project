import { Box, Paper, Tab, Tabs } from '@mui/material';
import { SyntheticEvent } from 'react'
import ProfilePhotos from './ProfilePhotos';
import ProfileAbout from './ProfileAbout';
import { useStore } from '../../lib/hooks/useStore';
import { observer } from 'mobx-react-lite';
import ProfileFollowings from './ProfileFollowings';

const ProfileContent = observer(function ProfileContent() {
    const { uiStore } = useStore();

    const tabContent = [
        { label: 'About', content: <ProfileAbout /> },
        { label: 'Photos', content: <ProfilePhotos /> },
        { label: 'Events', content: <div>Events content</div> },
        { label: 'Followers', content: <ProfileFollowings /> },
        { label: 'Following', content: <ProfileFollowings /> }
    ];

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        uiStore.setActiveProfileTab(newValue);
    }

    return (
        <Box
            component={Paper}
            mt={2}
            p={3}
            elevation={3}
            height={500}
            sx={{ display: "flex", borderRadius: 3, alignItems: "flex-start" }}
        >
            <Tabs
                orientation="vertical"
                value={uiStore.activeTab}
                onChange={handleTabChange}
                sx={{ borderRight: 1, height: 450, minWidth: 200 }}
            >
                {tabContent.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>
            <Box
                sx={{ flexGrow: 1, p: 3, pt: 0 }}
            >
                {tabContent[uiStore.activeTab].content}
            </Box>
        </Box>
    )
});

export default ProfileContent
