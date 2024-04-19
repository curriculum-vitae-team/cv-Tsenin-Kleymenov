import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'

import { FORM_PROFILE_CVS_KEYS } from '@/components/containers/EmployeeCVsProfile/CVsModal/CVsModal.interfaces'
import { FORM_PROFILE_CVS_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { CV } from '@/graphql/cv/CVQuery'
import { UPDATE_CV } from '@/graphql/cv/updateCVMutation'
import { useUser } from '@/hooks/useUser'
import { toastMessage } from '@/utils/toastMessage'

import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

import { ICVDetailItemProps, ICVDetailsFormValues } from './CVDetailItem.interfaces'

export const CVDetailItem: FC<ICVDetailItemProps> = ({ CVData }) => {
  const { t } = useTranslation()

  const { user, isAdmin } = useUser()
  const userCheck = CVData?.user.id === user?.id

  const [updateCVMutation, { loading: updateCVLoading }] = useMutation(UPDATE_CV, {
    refetchQueries: [{ query: CV, variables: { id: CVData?.id } }]
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty }
  } = useForm<ICVDetailsFormValues>({
    defaultValues: {
      [FORM_PROFILE_CVS_KEYS.name]: CVData?.name || '',
      [FORM_PROFILE_CVS_KEYS.education]: CVData?.education || '',
      [FORM_PROFILE_CVS_KEYS.description]: CVData?.description || ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_CVS_SCHEMA)
  })

  const onSubmit: SubmitHandler<ICVDetailsFormValues> = async formData => {
    await updateCVMutation({
      variables: {
        cv: {
          cvId: CVData?.id,
          name: formData[FORM_PROFILE_CVS_KEYS.name],
          education: formData[FORM_PROFILE_CVS_KEYS.education],
          description: formData[FORM_PROFILE_CVS_KEYS.description]
        }
      }
    })

    reset({
      [FORM_PROFILE_CVS_KEYS.name]: formData[FORM_PROFILE_CVS_KEYS.name],
      [FORM_PROFILE_CVS_KEYS.education]: formData[FORM_PROFILE_CVS_KEYS.education],
      [FORM_PROFILE_CVS_KEYS.description]: formData[FORM_PROFILE_CVS_KEYS.description]
    })

    toastMessage(t('successfullyUpdated'), TOAST_TYPES.success)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Input
        variant="outlined"
        label={t('name')}
        error={!!errors[FORM_PROFILE_CVS_KEYS.name]}
        helperText={t(errors?.[FORM_PROFILE_CVS_KEYS.name]?.message as string)}
        {...register(FORM_PROFILE_CVS_KEYS.name)}
      />
      <Input
        variant="outlined"
        label={t('education')}
        error={!!errors[FORM_PROFILE_CVS_KEYS.education]}
        helperText={t(errors?.[FORM_PROFILE_CVS_KEYS.education]?.message as string)}
        {...register(FORM_PROFILE_CVS_KEYS.education)}
      />
      <Input
        multiline
        rows={8}
        variant="outlined"
        label={t('description')}
        error={!!errors[FORM_PROFILE_CVS_KEYS.description]}
        helperText={t(errors?.[FORM_PROFILE_CVS_KEYS.description]?.message as string)}
        {...register(FORM_PROFILE_CVS_KEYS.description)}
      />
      {(userCheck || isAdmin) && (
        <Button
          type="submit"
          variant="contained"
          loading={updateCVLoading}
          disabled={!isDirty && isValid}
        >
          {t('update')}
        </Button>
      )}
    </form>
  )
}
