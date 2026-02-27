import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import { useState } from 'react';
import PhotoUploadWidget from '../../app/shared/components/PhotoUploadWidget';

const ProfilePhotos = () => {
    const { userId } = useParams();
    const { photos, loadingPhotos, isCurrentUser } = useProfile(userId);
    const [editMode, setEditMode] = useState(false);

    if (loadingPhotos) return <Typography>Loading photos...</Typography>;
    if (!photos || photos.length === 0) return <Typography>No photos found.</Typography>;

    return (
        <Box>
            {isCurrentUser && (
                <Box>
                    <Button onClick={() => setEditMode(!editMode)} sx={{ mb: 2 }}>
                        {editMode ? 'Cancel' : 'Manage Photos'}
                    </Button>
                </Box>)}
            {editMode ? (
                <PhotoUploadWidget />
            ) : (
                <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
                    {photos?.map((item, index) => (
                        <ImageListItem key={item.id}>
                            <img
                                srcSet={`${item.url.replace(
                                    "/upload/",
                                    "/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/"
                                )}`}
                                src={`${item.url.replace(
                                    "/upload/",
                                    "/upload/w_164,h_164,c_fill,f_auto,g_face/"
                                )}`}
                                alt={`Photo ${index + 1} of user profile`}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

            )}
        </Box>
    )
}

export default ProfilePhotos
