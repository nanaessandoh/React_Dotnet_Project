import { useStore } from '../../lib/hooks/useStore';
import { observer } from 'mobx-react-lite';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';



const Counter = observer(function Counter() {
    const { counterStore } = useStore();

    return (
        <Box display='flex' justifyContent='space-between'>
            <Box sx={{ width: '60%' }}>
                <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
                <Typography variant='h6'>The count is: {counterStore.count}</Typography>
                <ButtonGroup sx={{ mt: 3 }} >
                    <Button onClick={() => counterStore.increment(5)} variant='contained' color='primary'>Increment by 5</Button>
                    <Button onClick={() => counterStore.decrement(5)} variant='contained' color='secondary'>Decrement by 5</Button>
                    <Button onClick={() => counterStore.increment()} variant='contained' color='error'>Increment by 1</Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ width: '40%', p: 4 }}>
                <Typography variant="h6" gutterBottom>Event Log - Total Events: {counterStore.eventCount}</Typography>
                <Box sx={{ border: '1px solid grey', borderRadius: 2, p: 2 }}>
                    {counterStore.events.map((event, index) => (
                        <Typography key={index} variant="body2">{event}</Typography>
                    ))}
                </Box>
            </Box>
        </Box>
    )
});

export default Counter;
