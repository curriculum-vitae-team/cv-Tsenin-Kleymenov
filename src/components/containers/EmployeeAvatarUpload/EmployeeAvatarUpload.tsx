import { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { EmployeeAvatarAlert } from '@/components/views/EmployeeAvatarAlert/EmployeeAvatarAlert'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
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
  const { id } = useParams()
  const { t } = useTranslation()
  const user = useReactiveVar(authService.user$)
  const userCheck = id === user?.id

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id }
  })

  const [uploadAvatarMutation, { loading: uploadLoading }] = useMutation(UPLOAD_AVATAR, {
    refetchQueries: () => [{ query: USER, variables: { id } }]
  })

  const [deleteAvatarMutation] = useMutation(DELETE_AVATAR, {
    refetchQueries: () => [{ query: USER, variables: { id } }]
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
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <AvatarWrapper>
          {userData?.user.profile.avatar ? (
            <>
              <Avatar src={userData?.user.profile.avatar} sx={{ width: 200, height: 200 }} />
              {userCheck && (
                <IconButton onClick={handleFileRemove}>
                  <CloseIcon />
                </IconButton>
              )}
            </>
          ) : (
            <Avatar sx={{ width: 200, height: 200 }}>
              <LoadingOverlay active={uploadLoading} position="static">
                <Typography variant="h3">
                  {getFirstChars(userData?.user.profile.full_name || userData?.user.email)}
                </Typography>
              </LoadingOverlay>
            </Avatar>
          )}
        </AvatarWrapper>
      </Grid>
      {userCheck && (
        <Grid item xs={6}>
          <DropZone {...getRootProps()} sx={{ p: 1 }} variant="outlined">
            <input {...getInputProps()} />
            <Typography variant="h6">
              <Box sx={{ display: 'flex' }}>
                <FileUploadIcon sx={{ mr: 1 }} />
                <Typography sx={{ textTransform: 'uppercase' }}>
                  {t('upload avatar image')}
                </Typography>
              </Box>
              <Typography>png, jpg or gif {t('no more than')} 0.5MB</Typography>
            </Typography>
          </DropZone>
          {fileRejections.length > 0 && (
            <EmployeeAvatarAlert>
              {fileRejections.map(({ file, errors }) => (
                <ErrorUploadMessage key={file.name} errors={errors} />
              ))}
            </EmployeeAvatarAlert>
          )}
        </Grid>
      )}
    </Grid>
  )
}
