import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, Container, FormControlLabel } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_PROFILE_CVS_SCHEMA } from '@/constants/schemaOptions'
import { authService } from '@/graphql/auth/authService'
import { CREATE_CV } from '@/graphql/cvs/createCVMutation'
import { GET_CVS } from '@/graphql/cvs/cvsQuery'
import { FETCH_POLICY, MUTATION_FETCH_POLICY } from '@/graphql/fetchPolicy'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'
import { USER } from '@/graphql/user/userQuery'
import { createLanguagesArray } from '@/utils/createLanguagesArray'
import { createSkillsArray } from '@/utils/createSkillsArray'

import { ICVsModalProps } from '../EmployeeCVsProfile/CVsModal/CVsModal.interfaces'

import { FORM_CREATE_CV_KEYS, ICreateCVFormValues } from './CreateCVModal.interfaces'

export const CreateCVModal: FC<ICVsModalProps> = ({ onClose }) => {
  const user = useReactiveVar(authService.user$)
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
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<ICreateCVFormValues>({
    defaultValues: {
      [FORM_CREATE_CV_KEYS.name]: '',
      [FORM_CREATE_CV_KEYS.description]: '',
      [FORM_CREATE_CV_KEYS.isTemplate]: false
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_CVS_SCHEMA)
  })

  const submitClickHandler = handleSubmit(async (formData): Promise<void> => {
    await createCV({
      variables: {
        cv: {
          ...formData,
          userId: userData?.user.id,
          skills: createSkillsArray(userData?.user.profile.skills),
          languages: createLanguagesArray(userData?.user.profile.languages),
          projectsIds: []
        }
      }
    })

    onClose()
  })

  return (
    <LoadingOverlay active={createCVLoading}>
      <ModalWindow onClose={onClose}>
        <Container sx={{ minWidth: '500px' }}>
          <Input
            label="Name"
            error={!!errors[FORM_CREATE_CV_KEYS.name]}
            {...register(FORM_CREATE_CV_KEYS.name)}
            helperText={errors?.[FORM_CREATE_CV_KEYS.name]?.message}
          />
          <Input
            label="Description"
            error={!!errors[FORM_CREATE_CV_KEYS.description]}
            {...register(FORM_CREATE_CV_KEYS.description)}
            helperText={errors?.[FORM_CREATE_CV_KEYS.description]?.message}
          />
          <Controller
            control={control}
            name="is_template"
            render={({ field: { value, onChange, onBlur } }) => (
              <FormControlLabel
                label="Template"
                control={<Checkbox checked={!!value} onChange={onChange} onBlur={onBlur} />}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={submitClickHandler}
            loading={createCVLoading}
            disabled={!isDirty && isValid}
          >
            Create
          </Button>
        </Container>
      </ModalWindow>
    </LoadingOverlay>
  )
}
