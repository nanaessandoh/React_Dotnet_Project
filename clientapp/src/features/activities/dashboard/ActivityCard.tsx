import { AccessTime, Place } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Typography } from '@mui/material';
import { Link } from 'react-router';
import { formatDate } from '../../../lib/util/util';
import AvatarPopover from '../../../app/shared/components/AvatarPopover';

type Props = {
    activity: Activity;
}

const ActivityCard = ({ activity }: Props) => {
    const label = activity.isHost ? 'You are hosting this event' : 'You are going to this event';
    const color = activity.isHost ? 'secondary' : activity.isGoing ? 'warning' : 'default';

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
                            Hosted by{' '}<Link to={`/profiles/${activity.hostUserId}`}>{activity.hostDisplayName}</Link>
                        </>
                    }
                />
                <Box display={'flex'} flexDirection={'column'} gap={2} mr={2}>
                    {(activity.isHost || activity.isGoing) && <Chip label={label} variant="outlined" color={color} sx={{ borderRadius: 2 }} />}
                    {activity.isCancelled && <Chip label="Cancelled" variant="outlined" color="error" sx={{ borderRadius: 2 }} />}
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
                    {activity.attendees.map(attendee => (
                        <AvatarPopover
                            key={attendee.userId}
                            attendee={attendee}
                        />
                    ))}
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
