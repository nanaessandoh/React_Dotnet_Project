import { Star, StarBorder } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

type Props = {
    selected: boolean;
}

const StarButton = (props: Props) => {
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
                    '&:hover .star-icon': {
                        opacity: 1,
                    }
                }}
            >
                <StarBorder
                    sx={{
                        fontSize: 20,
                        color: "white",
                        transition: "opacity 0.3s",
                        position: "absolute",
                    }}
                    className="star-border"
                />
                <Star
                    sx={{
                        fontSize: 16,
                        color: "gold",
                        transition: "opacity 0.3s",
                        position: "absolute",
                        opacity: props.selected ? 1 : 0,
                    }}
                    className="star-icon"
                />
            </Button>
        </Box>
    )
}

export default StarButton
