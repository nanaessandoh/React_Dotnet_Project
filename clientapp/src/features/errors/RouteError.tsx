import React from 'react'
import { Divider, Paper, Typography, Button } from '@mui/material'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router'

const RouteError = () => {
    const error = useRouteError()

    return (
        <Paper sx={{ p: 4 }}>
            <Typography gutterBottom variant="h4" color="error">
                Oops — something went wrong
            </Typography>

            {isRouteErrorResponse(error) ? (
                <div>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        {error.status} {error.statusText}
                    </Typography>
                    {error.data && (
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            {(error.data).message || JSON.stringify(error.data)}
                        </Typography>
                    )}
                </div>
            ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>
                    {'An unexpected error occurred.'}
                </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            <Button fullWidth component={Link} to="/">
                Go back home
            </Button>
        </Paper>
    )
}

export default RouteError
