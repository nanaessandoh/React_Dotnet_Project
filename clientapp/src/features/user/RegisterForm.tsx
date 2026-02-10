import { useUser } from '../../lib/hooks/useUser';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import { Link } from 'react-router';
import { registerSchema, RegisterSchema } from '../../lib/schemas/registerSchema';

const RegisterForm = () => {
    const { registerUser } = useUser();
    const { control, handleSubmit, formState: { isValid, isSubmitting }, setError } = useForm<RegisterSchema>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach(err => {
                        if (err.toLowerCase().includes('email')) { setError('email', { message: err }); }
                        if (err.toLowerCase().includes("password")) { setError('password', { message: err }); }
                    })
                }
            }
        });
    }

    return (
        <Paper
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 3,
                maxWidth: "md",
                mx: "auto",
                borderRadius: 3
            }}
        >
            <Box
                display="flex"
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
                color={"secondary.main"}
            >
                <LockOpen fontSize="large" />
                <Typography variant="h4">Register</Typography>
            </Box>
            <TextInput label="Email" name="email" control={control} />
            <TextInput label="Display Name" name="displayName" control={control} />
            <TextInput label="Password" name="password" control={control} type="password" />
            <Button type={"submit"} disabled={!isValid || isSubmitting} variant="contained" size="large">
                {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
            <Typography sx={{
                textAlign: "center",
            }}>Already have an account?
                <Typography component={Link} to="/login" color="primary" sx={{ ml: 1 }}>
                    Sign in
                </Typography>
            </Typography>
        </Paper>
    )
}


export default RegisterForm;
