import { TextField, TextFieldProps } from '@mui/material'
import { useController, UseControllerProps, FieldValues } from 'react-hook-form'

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps

const TextInput = <T extends FieldValues>(props: Props<T>) => {
    const { field, fieldState } = useController({ ...props })
    return (
        <TextField
            {...props}
            {...field}
            value={field.value || ''}
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    )
}

export default TextInput