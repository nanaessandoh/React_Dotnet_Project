import { AccessTime, Place } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Typography } from '@mui/material';
import { Link } from 'react-router';
import { formatDate } from '../../../lib/util/util';

type Props = {
    activity: Activity;
}

const ActivityCard = ({ activity }: Props) => {
    const isHost = false; // Placeholder for host check logic
    const isGoing = false; // Placeholder for going check logic
    const label = isHost ? 'You are hosting this event' : 'You are going to this event';
    const isCancelled = false; // Placeholder for cancellation check logic
    const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';

    return (
        <Card elevation={3} sx={{ borderRadius: 3 }}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <CardHeader
                    avatar={<Avatar sx={{ height: 80, width: 80 }} />}
                    title={activity.title}
                    slotProps={{
                        title: {
                            fontWeight: 'bold',
                            fontSize: 20,
                        }
                    }}
                    subheader={
                        <>
                            Hosted by{' '}<Link to={`/profiles/bob}`}>Bob</Link>
                        </>
                    }
                />
                <Box display={'flex'} flexDirection={'column'} gap={2} mr={2}>
                    {isHost || isGoing && <Chip label={label} color={color} sx={{ borderRadius: 2 }} />}
                    {isCancelled && <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />}
                </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <CardContent sx={{ p: 0 }}>
                <Box display={'flex'} alignItems={'center'} mb={2} px={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
                        <AccessTime sx={{ mr: 1 }} />
                        <Typography variant={'body2'} noWrap>{formatDate(activity.date)}</Typography>
                    </Box>
                    <Place sx={{ mr: 1, ml: 3 }} />
                    <Typography variant={'body2'}>{activity.venue}</Typography>
                </Box>
                <Divider />
                <Box display={'flex'} gap={2} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}>
                    Attendees go here
                </Box>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
                <Typography variant="body2">
                    {activity.description}
                </Typography>
                <Button
                    component={Link}
                    to={`/activities/${activity.activityId}`}
                    size="medium"
                    variant="contained"
                    sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}
                >
                    View
                </Button>
            </CardActions>
        </Card>
    )
}



export default ActivityCard
