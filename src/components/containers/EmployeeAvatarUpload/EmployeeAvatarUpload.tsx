import { FC, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import CloseIcon from '@mui/icons-material/Close'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'

import { EmployeeAvatarAlert } from './EmployeeAvatarAlert/EmployeeAvatarAlert'
import { AvatarWrapper, DropZone } from './EmployeeAvatarUpload.styles'

export const EmployeeAvatarUpload: FC = () => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([])

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.gif']
    },
    maxSize: 500000,
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  const handleFileRemove = (file: File & { preview: string }) => () => {
    setFiles(prevFiles => prevFiles.filter(prevFile => prevFile !== file))
  }

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <Box key={file.name}>
        {errors.map(e => (
          <Typography key={e.code}>{e.message}</Typography>
        ))}
      </Box>
    )
  })

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          {files.length > 0 ? (
            files.map(file => (
              <AvatarWrapper key={file.name}>
                <Avatar src={file.preview} sx={{ width: 150, height: 150, mb: 5 }} />
                <IconButton onClick={handleFileRemove(file)}>
                  <CloseIcon />
                </IconButton>
              </AvatarWrapper>
            ))
          ) : (
            <Avatar sx={{ width: 150, height: 150, mb: 5 }}>
              <Typography variant="h3">H</Typography>
            </Avatar>
          )}
        </Grid>
        <Grid item xs={6}>
          <DropZone {...getRootProps()} sx={{ p: 1 }} variant="outlined">
            <input {...getInputProps()} />
            <Typography variant="h6">
              <FileUploadIcon sx={{ mr: 1 }} />
              UPLOAD AVATAR IMAGE
              <Typography> png, jpg or gif no more than 0.5MB</Typography>
            </Typography>
          </DropZone>
          {fileRejectionItems.length > 0 && (
            <EmployeeAvatarAlert>{fileRejectionItems}</EmployeeAvatarAlert>
          )}
        </Grid>
      </Grid>
    </>
  )
}
