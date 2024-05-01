import { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Box, Grid, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { CloseButton } from '@/components/views/CloseButton/CloseButton'
import { EmployeeAvatarAlert } from '@/components/views/EmployeeAvatarAlert/EmployeeAvatarAlert'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { DROP_ZONE_ACCEPT_FILES } from '@/constants/dropZoneAcceptFile'
import { DELETE_AVATAR } from '@/graphql/user/deleteUserAvatarMutation'
import { UPLOAD_AVATAR } from '@/graphql/user/uploadUserAvatarMutation'
import { USER } from '@/graphql/user/userQuery'
import { useUser } from '@/hooks/useUser'
import { convertBase64 } from '@/utils/convertBase64'
import { getFirstChars } from '@/utils/getFirstChar'

import { ErrorUploadMessage } from './ErrorUploadMessage/ErrorUploadMessage'
import { AvatarWrapper, DropZone, EmployeeAvatar } from './EmployeeAvatarUpload.styles'

export const EmployeeAvatarUpload: FC = () => {
  const { id: userId } = useParams()
  const { user } = useUser()
  const userCheck = userId === user?.id

  const { t } = useTranslation()

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const [uploadAvatarMutation, { loading: uploadLoading }] = useMutation(UPLOAD_AVATAR, {
    refetchQueries: () => [{ query: USER, variables: { id: userId } }]
  })

  const [deleteAvatarMutation] = useMutation(DELETE_AVATAR, {
    refetchQueries: () => [{ query: USER, variables: { id: userId } }]
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
          avatar: {
            userId: userData?.user.profile.id,
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
        avatar: {
          userId: userData?.user.profile.id
        }
      }
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <AvatarWrapper>
          {userData?.user.profile.avatar ? (
            <>
              <EmployeeAvatar src={userData?.user.profile.avatar} />
              {userCheck && <CloseButton onClick={handleFileRemove} />}
            </>
          ) : (
            <EmployeeAvatar>
              <LoadingOverlay active={uploadLoading} position="static">
                <Typography variant="h3">
                  {getFirstChars(userData?.user.profile.full_name || userData?.user.email)}
                </Typography>
              </LoadingOverlay>
            </EmployeeAvatar>
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
                <Typography sx={{ textTransform: 'uppercase' }}>{t('uploadAvatar')}</Typography>
              </Box>
              <Typography>png, jpg or gif {t('noMoreThan')} 0.5MB</Typography>
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
