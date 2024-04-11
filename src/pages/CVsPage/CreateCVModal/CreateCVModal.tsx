import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { ICVsModalProps } from '@/components/containers/EmployeeCVsProfile/CVsModal/CVsModal.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_PROFILE_CVS_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { CREATE_CV } from '@/graphql/cv/createCVMutation'
import { GET_CVS } from '@/graphql/cvs/cvsQuery'
import { FETCH_POLICY, MUTATION_FETCH_POLICY } from '@/graphql/fetchPolicy'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'
import { USER } from '@/graphql/user/userQuery'
import { useUser } from '@/hooks/useUser'
import { toastMessage } from '@/utils/toastMessage'

import { FORM_CREATE_CV_KEYS, ICreateCVFormValues } from './CreateCVModal.interfaces'

export const CreateCVModal: FC<ICVsModalProps> = ({ onClose }) => {
  const { user } = useUser()

  const [createCV, { loading: createCVLoading }] = useMutation<ICV>(CREATE_CV, {
    refetchQueries: [{ query: GET_CVS }],
    fetchPolicy: MUTATION_FETCH_POLICY.networkOnly
  })

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: user?.id },
    fetchPolicy: FETCH_POLICY.noCache
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<ICreateCVFormValues>({
    defaultValues: {
      [FORM_CREATE_CV_KEYS.name]: '',
      [FORM_CREATE_CV_KEYS.description]: '',
      [FORM_CREATE_CV_KEYS.education]: ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_CVS_SCHEMA)
  })

  const { t } = useTranslation()

  const submitClickHandler = handleSubmit(async (formData): Promise<void> => {
    await createCV({
      variables: {
        cv: {
          name: formData[FORM_CREATE_CV_KEYS.name],
          education: formData[FORM_CREATE_CV_KEYS.education],
          description: formData[FORM_CREATE_CV_KEYS.description],
          userId: userData?.user.id
        }
      }
    })

    onClose()

    toastMessage(t('Successfully created'), TOAST_TYPES.success)
  })

  return (
    <LoadingOverlay active={createCVLoading}>
      <ModalWindow onClose={onClose} title="Create CV">
        <Container sx={{ minWidth: '500px' }}>
          <Input
            label={t('Name')}
            error={!!errors[FORM_CREATE_CV_KEYS.name]}
            {...register(FORM_CREATE_CV_KEYS.name)}
            helperText={t(errors?.[FORM_CREATE_CV_KEYS.name]?.message as string)}
          />
          <Input
            label={t('Education')}
            error={!!errors[FORM_CREATE_CV_KEYS.education]}
            {...register(FORM_CREATE_CV_KEYS.education)}
            helperText={t(errors?.[FORM_CREATE_CV_KEYS.education]?.message as string)}
          />
          <Input
            label={t('Description')}
            error={!!errors[FORM_CREATE_CV_KEYS.description]}
            {...register(FORM_CREATE_CV_KEYS.description)}
            helperText={t(errors?.[FORM_CREATE_CV_KEYS.description]?.message as string)}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={submitClickHandler}
            loading={createCVLoading}
            disabled={!isDirty && isValid}
          >
            {t('Create')}
          </Button>
        </Container>
      </ModalWindow>
    </LoadingOverlay>
  )
}
