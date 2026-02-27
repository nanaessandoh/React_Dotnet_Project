import { Delete, DeleteOutline } from '@mui/icons-material';
import { Box, Button } from '@mui/material';


const DeleteButton = () => {
    return (
        <Box sx={{ position: "relative" }}>
            <Button
                sx={{
                    opacity: 0.8,
                    transition: "opacity 0.3s",
                    position: "relative",
                    cursor: "pointer",
                    '&:hover': {
                        opacity: 1,
                    },
                    '&:hover .delete-icon': {
                        opacity: 1,
                    }
                }}
            >
                <DeleteOutline
                    sx={{
                        fontSize: 20,
                        color: "white",
                        transition: "opacity 0.3s",
                        position: "absolute",
                    }}
                    className="delete-outline"
                />
                <Delete
                    sx={{
                        fontSize: 16,
                        color: "red",
                        transition: "opacity 0.3s",
                        position: "absolute",
                        opacity: 0,
                    }}
                    className="delete-icon"
                />
            </Button>
        </Box>
    )
}

export default DeleteButton;
