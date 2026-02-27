import { Cloud } from '@mui/icons-material'
import { Box, Grid2, Typography } from '@mui/material'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const PhotoUploadWidget = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        acceptedFiles.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsDataURL(file)
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={4}>
                <Typography variant="overline" color="secondary">Step 1 - Add Photo</Typography>
                <Box
                    sx={{
                        border: 'dashed 3px #eee',
                        borderColor: isDragActive ? 'green' : '#eee',
                        borderRadius: "5px",
                        paddingTop: "30px",
                        textAlign: "center",
                        height: "280px",
                    }}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <Cloud sx={{ fontSize: 80 }} />
                    <Typography variant="h5">Drag and drop a photo here, or click to select one</Typography>
                </Box>
            </Grid2>
            <Grid2 size={4}>
                <Typography variant="overline" color="secondary">Step 2 - Resize Image</Typography>
            </Grid2>
            <Grid2 size={4}>
                <Typography variant="overline" color="secondary">Step 3 - Preview & Upload</Typography>
            </Grid2>
        </Grid2>
    )
}

export default PhotoUploadWidget
