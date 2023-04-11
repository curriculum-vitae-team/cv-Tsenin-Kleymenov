import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { Autocomplete, Checkbox, Container, TextField } from '@mui/material'

import { IProjectsResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { authService } from '@/graphql/auth/authService'
import { CV } from '@/graphql/cv/CVQuery'
import { UPDATE_CV } from '@/graphql/cv/updateCVMutation'
import { GET_PROJECTS } from '@/graphql/projects/projectsQuery'
import { createLanguagesArray } from '@/utils/createLanguagesArray'
import { createProjectsIdArray } from '@/utils/createProjectsIdArray'
import { createSkillsArray } from '@/utils/createSkillsArray'

import {
  FORM_CV_PROJECTS_KEYS,
  ICVProjectFormValues,
  ICVProjectsModalProps
} from './CVProjectsModal.interfaces'

export const CVProjectsModal: FC<ICVProjectsModalProps> = ({ CVData, open, handleClose }) => {
  const user = useReactiveVar(authService.user$)

  const [updateCVMutation, { loading: updateCVLoading }] = useMutation(UPDATE_CV, {
    refetchQueries: [{ query: CV, variables: { id: CVData?.id } }]
  })

  const { data: projectsData } = useQuery<IProjectsResult>(GET_PROJECTS)

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty }
  } = useForm<ICVProjectFormValues>({
    defaultValues: {
      [FORM_CV_PROJECTS_KEYS.projects]: CVData?.projects || []
    }
  })

  const onSubmit: SubmitHandler<ICVProjectFormValues> = async formData => {
    await updateCVMutation({
      variables: {
        id: CVData?.id,
        cv: {
          name: CVData?.name,
          description: CVData?.description,
          userId: user?.id,
          projectsIds: createProjectsIdArray(formData[FORM_CV_PROJECTS_KEYS.projects]),
          skills: createSkillsArray(CVData?.skills),
          languages: createLanguagesArray(CVData?.languages),
          is_template: CVData?.is_template
        }
      }
    })
    handleClose()
  }

  return (
    <ModalWindow open={open} onClose={handleClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Controller
            control={control}
            name={FORM_CV_PROJECTS_KEYS.projects}
            render={({ field: { ref, onChange, ...field } }) => (
              <Autocomplete
                multiple
                disableCloseOnSelect
                defaultValue={CVData?.projects || []}
                options={projectsData?.projects || []}
                getOptionLabel={option => option.name}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                onChange={(_, data) => onChange(data)}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<CheckBoxIcon />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                renderInput={params => (
                  <TextField
                    {...field}
                    {...params}
                    fullWidth
                    inputRef={ref}
                    variant="outlined"
                    label="Projects"
                  />
                )}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            loading={updateCVLoading}
            disabled={!isDirty && isValid}
          >
            Save
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
