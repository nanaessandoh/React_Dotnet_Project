import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import { LocationIQSuggestion } from "../../../lib/types";
import { useEffect, useMemo, useState } from "react";
import { Box, debounce, ListItemButton, TextField, Typography } from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = {} & UseControllerProps<T>

const access_token = 'pk.5fe5bc7f0f9caad7fe7952c0f9a724bb';
const locationURl = `https://api.locationiq.com/v1/autocomplete?key=${access_token}&limit=5&dedupe=1&`;

const LocationInput = <T extends FieldValues>(props: Props<T>) => {
    const { field, fieldState } = useController({ ...props })
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || '');

    // unCallback has issue when using debounce, so use useMemo instead
    const fetchSuggestions = useMemo(
        () => debounce(async (query: string) => {
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }

            setLoading(true);

            try {
                const response = await axios.get<LocationIQSuggestion[]>(`${locationURl}q=${query}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching location suggestions:", error);
            } finally {
                setLoading(false);
            }
        }, 500), []);

    useEffect(() => {
        if (field.value && typeof field.value === 'object') {
            setInputValue(field.value.venue || '');
        } else {
            setInputValue(field.value || '');
        }
    }, [field.value]);

    const handleChange = async (value: string) => {
        field.onChange(value);
        fetchSuggestions(value);
    }

    const handleSelect = (location: LocationIQSuggestion) => {
        const city = location.address?.city || location.address?.town || location.address?.village || '';
        const venue = location.display_name;
        const latitude = parseFloat(location.lat);
        const longitude = parseFloat(location.lon);

        setInputValue(venue);
        field.onChange({ venue, city, latitude: latitude, longitude: longitude });
        setSuggestions([]);
    }

    return (
        <Box>
            <TextField
                {...props}
                label="Enter the location"
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
            {loading && <Typography>Loading...</Typography>}
            {suggestions.map((suggestion) => (
                <ListItemButton
                    key={suggestion.place_id}
                    divider
                    sx={{ textAlign: 'left', border: '1px solid #ddd' }}
                    onClick={() => handleSelect(suggestion)}
                >
                    {suggestion.display_name}
                </ListItemButton>
            ))}
        </Box>
    )
}

export default LocationInput
