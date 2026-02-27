import { Box, Paper, Tab, Tabs } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react'
import ProfilePhotos from './ProfilePhotos';

const ProfileContent = () => {
    const [value, setValue] = useState(0);

    const tabContent = [
        { label: 'About', content: <div>About content</div> },
        { label: 'Photos', content: <ProfilePhotos /> },
        { label: 'Events', content: <div>Events content</div> },
        { label: 'Followers', content: <div>Followers content</div> },
        { label: 'Following', content: <div>Following content</div> }
    ];

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
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
                value={value}
                onChange={handleTabChange}
                sx={{ borderRight: 1, height: 450, minWidth: 200 }}
            >
                {tabContent.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>
            <Box
                sx={{ flexGrow: 1, p: 3 }}
            >
                {tabContent[value].content}
            </Box>
        </Box>
    )
}

export default ProfileContent
