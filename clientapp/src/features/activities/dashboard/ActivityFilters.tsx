import { Event, FilterList } from '@mui/icons-material'
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


const filterListItems = [
    {
        text: "All events"
    },
    {
        text: "I'm going"
    },
    {
        text: "I'm hosting"
    }
]

const ActivityFilters = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 3 }}>
            <Paper sx={{ borderRadius: 3, p: 3 }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant='h6'
                        sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}
                    >
                        <FilterList sx={{ mr: 1 }} />
                        Filters
                    </Typography>
                    <MenuList>
                        {filterListItems.map((item) => (
                            <MenuItem key={item.text}>
                                <ListItemText primary={item.text} />
                            </MenuItem>
                        ))}
                    </MenuList>
                </Box>
            </Paper>
            <Box component={Paper} sx={{ width: '100%', p: 3, borderRadius: 3 }}>
                <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                    <Event sx={{ mr: 1 }} />
                    Select date
                </Typography>
                <Calendar />
            </Box>
        </Box>
    )
}

export default ActivityFilters
