import React, { useEffect } from 'react'
import { useProfile } from '../../lib/hooks/useProfile';
import { useParams } from 'react-router';
import Typography from '@mui/material/Typography/Typography';
import { profileSchema, ProfileSchema } from '../../lib/schemas/profileSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { Box, Button } from '@mui/material';
import TextInput from '../../app/shared/components/TextInput';

type Props = {
    setEditMode: (editMode: boolean) => void
}

const ProfileEditorForm = ({ setEditMode }: Props) => {
    const { userId } = useParams();
    const { profile, loadingProfile, updateProfile } = useProfile(userId);
    const { reset, handleSubmit, control, formState: { isDirty, isValid } } = useForm<ProfileSchema>({
        mode: 'onTouched',
        resolver: zodResolver(profileSchema)
    });

    const onSubmit = async (data: ProfileSchema) => {
        try {
            await updateProfile.mutateAsync({ ...data } as Profile)
            setEditMode(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (profile) {
            reset({ ...profile });
        }
    }, [profile, reset]);

    if (loadingProfile) return <Typography>Loading...</Typography>;

    return (
        <Box component="form" display="flex" flexDirection="column" gap={3} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextInput label="Display Name" control={control} name="displayName" />
            <TextInput label="Add your bio" control={control} name="bio" multiline rows={5} />
            <Button fullWidth type="submit" color="primary" variant="contained" disabled={updateProfile.isPending || !isDirty || !isValid}>
                Update Profile
            </Button>
        </Box>
    )
}

export default ProfileEditorForm
