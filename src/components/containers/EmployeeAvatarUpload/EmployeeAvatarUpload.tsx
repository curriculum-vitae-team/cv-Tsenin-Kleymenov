import { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { EmployeeAvatarAlert } from '@/components/views/EmployeeAvatarAlert/EmployeeAvatarAlert'
import { DROP_ZONE_ACCEPT_FILES } from '@/constants/dropZoneAcceptFile'
import { authService } from '@/graphql/auth/authService'
import { DELETE_AVATAR } from '@/graphql/user/deleteUserAvatarMutation'
import { UPLOAD_AVATAR } from '@/graphql/user/uploadUserAvatarMutation'
import { USER } from '@/graphql/user/userQuery'
import { convertBase64 } from '@/utils/convertBase64'
import { getFirstChars } from '@/utils/getFirstChar'

import { ErrorUploadMessage } from './ErrorUploadMessage/ErrorUploadMessage'
import { AvatarWrapper, DropZone } from './EmployeeAvatarUpload.styles'

export const EmployeeAvatarUpload: FC = () => {
  const user = useReactiveVar(authService.user$)

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: user?.id }
  })

  const [uploadAvatarMutation] = useMutation(UPLOAD_AVATAR, {
    refetchQueries: () => [{ query: USER, variables: { id: user?.id } }]
  })

  const [deleteAvatarMutation] = useMutation(DELETE_AVATAR, {
    refetchQueries: () => [{ query: USER, variables: { id: user?.id } }]
  })

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: DROP_ZONE_ACCEPT_FILES,
    maxSize: 500000,
    maxFiles: 1,
    onDrop: acceptedFiles => uploadAvatar(acceptedFiles[0])
  })

  const uploadAvatar = async (file: File): Promise<void> => {
    if (file) {
      const base64File = await convertBase64(file)
      await uploadAvatarMutation({
        variables: {
          id: userData?.user.profile.id,
          avatar: {
            base64: base64File,
            size: file.size,
            type: file.type
          }
        }
      })
    }
  }

  const handleFileRemove = async (): Promise<void> => {
    await deleteAvatarMutation({
      variables: {
        id: userData?.user.profile.id
      }
    })
  }

  return (
    <Grid sx={{ mt: 2 }} container spacing={2}>
      <Grid item xs={5}>
        {userData?.user.profile.avatar ? (
          <AvatarWrapper>
            <Avatar src={userData?.user.profile.avatar} sx={{ width: 150, height: 150, mb: 5 }} />
            <IconButton onClick={handleFileRemove}>
              <CloseIcon />
            </IconButton>
          </AvatarWrapper>
        ) : (
          <Avatar sx={{ width: 150, height: 150, mb: 5 }}>
            <Typography variant="h3">
              {getFirstChars(userData?.user.profile.full_name || userData?.user.email)}
            </Typography>
          </Avatar>
        )}
      </Grid>
      <Grid item xs={6}>
        <DropZone {...getRootProps()} sx={{ p: 1 }} variant="outlined">
          <input {...getInputProps()} />
          <Typography variant="h6">
            <Box sx={{ display: 'flex' }}>
              <FileUploadIcon sx={{ mr: 1 }} />
              <Typography sx={{ textTransform: 'uppercase' }}>upload avatar image</Typography>
            </Box>
            <Typography>png, jpg or gif no more than 0.5MB</Typography>
          </Typography>
        </DropZone>
        {fileRejections.length > 0 && (
          <EmployeeAvatarAlert>
            {fileRejections.map(({ file, errors }) => (
              <ErrorUploadMessage key={file.name} file={file} errors={errors} />
            ))}
          </EmployeeAvatarAlert>
        )}
      </Grid>
    </Grid>
  )
}
