import { useState } from 'react'
import {
    Typography,
    Button,
    Backdrop,
    Card,
    CardContent,
    CardActions,
    Chip,
    Collapse,
    Divider,
    Box,
    Stack,
    Alert,
    Container,
    Paper,
} from '@mui/material'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HomeIcon from '@mui/icons-material/Home'
import BugReportIcon from '@mui/icons-material/BugReport'

const RouteError = () => {
    const error = useRouteError()
    const [expandDetails, setExpandDetails] = useState(false)
    const isDev = import.meta.env.DEV

    const getErrorInfo = () => {
        if (isRouteErrorResponse(error)) {
            return {
                type: 'route',
                status: error.status,
                statusText: error.statusText,
                message: error.data?.message,
                data: error.data,
            }
        } else if (error instanceof Error) {
            return {
                type: 'error',
                message: error.message,
                stack: error.stack,
            }
        }
        return {
            type: 'unknown',
            message: 'An unexpected error occurred',
        }
    }

    const errorInfo = getErrorInfo()
    const statusCode = 'status' in errorInfo ? errorInfo.status : undefined

    return (
        <Backdrop
            sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${theme.palette.error.dark}15 0%, ${theme.palette.error.light}15 100%)`,
                zIndex: theme.zIndex.drawer + 1,
            })}
            open={true}
        >
            <Container maxWidth="sm">
                <Card
                    elevation={8}
                    sx={{
                        borderTop: '4px solid',
                        borderTopColor: 'error.main',
                        animation: 'slideIn 0.4s ease-out',
                        '@keyframes slideIn': {
                            from: {
                                opacity: 0,
                                transform: 'translateY(-20px)',
                            },
                            to: {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        },
                    }}
                >
                    <CardContent sx={{ pt: 3 }}>
                        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                            <ErrorOutlineIcon
                                sx={{
                                    fontSize: 40,
                                    color: 'error.main',
                                    mt: 0.5,
                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Oops! Something went wrong
                                </Typography>
                            </Box>
                        </Stack>
                        <Divider sx={{ my: 2 }} />
                        {statusCode && (
                            <Box sx={{ mb: 3 }}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                                    <Chip
                                        icon={<BugReportIcon />}
                                        label={`Error ${statusCode}`}
                                        color="error"
                                        variant="outlined"
                                        size="small"
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        {errorInfo.statusText}
                                    </Typography>
                                </Stack>
                            </Box>
                        )}
                        {errorInfo.message && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                    {errorInfo.message}
                                </Typography>
                            </Alert>
                        )}
                        {'data' in errorInfo && errorInfo.data && typeof errorInfo.data === 'object' && (
                            <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'action.hover' }}>
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                                    ERROR DETAILS
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontSize: '0.85rem',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {JSON.stringify(errorInfo.data, null, 2)}
                                </Typography>
                            </Paper>
                        )}
                        {isDev && 'stack' in errorInfo && errorInfo.stack && (
                            <>
                                <Button
                                    fullWidth
                                    variant="text"
                                    endIcon={
                                        <ExpandMoreIcon
                                            sx={{
                                                transform: expandDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s',
                                            }}
                                        />
                                    }
                                    onClick={() => setExpandDetails(!expandDetails)}
                                    sx={{ justifyContent: 'flex-start', mb: 1 }}
                                >
                                    <Typography variant="caption" color="textSecondary">
                                        Stack Trace
                                    </Typography>
                                </Button>
                                <Collapse in={expandDetails}>
                                    <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'grey.900' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontSize: '0.75rem',
                                                color: 'success.light',
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word',
                                                maxHeight: '300px',
                                                overflow: 'auto',
                                            }}
                                        >
                                            {errorInfo.stack}
                                        </Typography>
                                    </Paper>
                                </Collapse>
                            </>
                        )}
                        <Alert severity="info" sx={{ mb: 2 }}>
                            <Typography variant="body2">
                                If this problem persists, please contact support or try refreshing the page.
                            </Typography>
                        </Alert>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ pt: 2, pb: 2, px: 2 }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1}
                            sx={{ width: '100%' }}
                        >
                            <Button
                                fullWidth
                                variant="outlined"
                                color="inherit"
                                startIcon={<HomeIcon />}
                                component={Link}
                                to="/"
                            >
                                Go Home
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
            </Container>
        </Backdrop>
    )
}

export default RouteError
