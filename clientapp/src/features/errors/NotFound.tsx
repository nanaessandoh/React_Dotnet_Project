import { SearchOff, Home, ArrowBack } from '@mui/icons-material'
import {
    Button,
    Card,
    Typography,
    Container,
    Stack,
    Box,
    Chip,
    Divider,
} from '@mui/material'
import { Link, useNavigate } from 'react-router'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.light}10 0%, ${theme.palette.secondary.light}10 100%)`,
                backgroundAttachment: 'fixed',
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                <Card
                    elevation={8}
                    sx={{
                        animation: 'slideIn 0.5s ease-out',
                        '@keyframes slideIn': {
                            from: {
                                opacity: 0,
                                transform: 'translateY(-30px)',
                            },
                            to: {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            p: { xs: 3, sm: 6 },
                        }}
                    >
                        {/* Animated Icon */}
                        <Box
                            sx={{
                                mb: 3,
                                animation: 'float 3s ease-in-out infinite',
                                '@keyframes float': {
                                    '0%, 100%': {
                                        transform: 'translateY(0px)',
                                    },
                                    '50%': {
                                        transform: 'translateY(-10px)',
                                    },
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 120,
                                    height: 120,
                                    borderRadius: '50%',
                                    background: (theme) =>
                                        `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
                                    border: '3px solid',
                                    borderColor: 'primary.light',
                                }}
                            >
                                <SearchOff
                                    sx={{
                                        fontSize: 80,
                                        color: 'primary.main',
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Error Code Chip */}
                        <Chip
                            label="404 - Page Not Found"
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{ mb: 2 }}
                        />

                        {/* Heading */}
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                background: (theme) =>
                                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Page Not Found
                        </Typography>

                        {/* Subheading */}
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            sx={{
                                mb: 3,
                                fontSize: '1.1rem',
                                lineHeight: 1.6,
                            }}
                        >
                            We couldn&apos;t locate the page you&apos;re looking for. It may have been moved or deleted.
                        </Typography>

                        <Divider sx={{ my: 3, width: '100%' }} />

                        {/* Action Buttons */}
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            sx={{ width: '100%' }}
                        >
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<Home />}
                                component={Link}
                                to="/"
                                sx={{
                                    py: 1.5,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Go to Home
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                size="large"
                                startIcon={<ArrowBack />}
                                onClick={() => navigate(-1)}
                                sx={{
                                    py: 1.5,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Go Back
                            </Button>
                        </Stack>

                        {/* Help Text */}
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{
                                mt: 3,
                                pt: 2,
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                width: '100%',
                                display: 'block',
                            }}
                        >
                            If you believe this is an error, please contact support.
                        </Typography>
                    </Box>
                </Card>
            </Container>
        </Box>
    )
}

export default NotFound
