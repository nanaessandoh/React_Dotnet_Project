import { CloudUpload } from '@mui/icons-material'
import { Box, Button, Grid2, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
    onPhotoUpload: (file: Blob) => void;
    loading: boolean;
}

const PhotoUploadWidget = ({ onPhotoUpload, loading }: Props) => {
    const [files, setFiles] = useState<object & { preview: string }[]>([])
    const cropperRef = useRef<ReactCropperElement>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file as Blob)
        })))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const oncrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => {
                if (blob) {
                    onPhotoUpload(blob as Blob);
                }
            });
        }
    }, [onPhotoUpload, cropperRef])

    useEffect(() => {
        // Revoke the data uris to avoid memory leaks
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }
    }, [files])

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
                    <CloudUpload sx={{ fontSize: 80 }} />
                    <Typography variant="h5">Drag and drop a photo here, or click to select one</Typography>
                </Box>
            </Grid2>
            <Grid2 size={4}>
                {files.length > 0 && files[0].preview && (
                    <>
                        <Typography variant="overline" color="secondary">Step 2 - Resize Image</Typography>
                        <div style={{ borderRadius: "5px", overflow: "hidden", display: "inline-block" }}>
                            <Cropper
                                ref={cropperRef}
                                src={files[0].preview}
                                style={{ height: 300, width: "90%", display: "block" }}
                                initialAspectRatio={1}
                                aspectRatio={1}
                                preview=".img-preview"
                                guides={false}
                                viewMode={1}
                                background={false}
                            />
                        </div>
                    </>
                )}
            </Grid2>
            <Grid2 size={4}>
                {files.length > 0 && files[0].preview && (
                    <>
                        <Typography variant="overline" color="secondary">Step 3 - Preview & Upload</Typography>
                        <div
                            className="img-preview"
                            style={{ width: 300, height: 300, overflow: "hidden", borderRadius: "5px" }}
                        />
                        <Button
                            variant="contained"
                            sx={{ mt: 1, width: 300 }}
                            color="secondary"
                            onClick={oncrop}
                            disabled={loading}
                        >
                            Upload
                        </Button>
                    </>
                )}
            </Grid2>
        </Grid2>
    )
}

export default PhotoUploadWidget
