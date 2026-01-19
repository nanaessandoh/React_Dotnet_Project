import { Divider, Paper, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router';

const ServerError = () => {
    const { state } = useLocation();

    return (
        <Paper>
            {state?.error ? (
                <div>
                    <Typography gutterBottom variant="h3" sx={{ px: 4, pt: 2 }} color='secondary'>
                        {state.error.title || 'There has been an error'}
                    </Typography>
                    <Divider />
                    <Typography gutterBottom variant="body1" sx={{ p: 4 }}>
                        {state.error.detail}
                    </Typography>
                    {state.error.stackTrace && (
                        <>
                            <Divider />
                            <Typography gutterBottom variant="subtitle1" sx={{ p: 4, whiteSpace: 'pre-wrap' }}>
                                {state.error.stackTrace}
                            </Typography>
                        </>
                    )}
                </div>
            ) : (
                <Typography gutterBottom variant="h5" sx={{ px: 4, pt: 2 }} color='secondary'>
                    {state.error.title || 'There has been an error'}
                </Typography>
            )}
        </Paper>
    )
}

export default ServerError
