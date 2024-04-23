import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import { IUseDeleteModal } from '@/appTypes/IBaseModalProps.interfaces'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_DEPARTMENT } from '@/graphql/department/deleteDepartmentMutation'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { toastMessage } from '@/utils/toastMessage'

export const useDeleteDepartment = (departmentId: string, onClose: () => void): IUseDeleteModal => {
  const { t } = useTranslation()

  const [deleteDepartmentMutation, { loading }] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS }]
  })

  const onSubmit = async (): Promise<void> => {
    await deleteDepartmentMutation({
      variables: {
        department: {
          departmentId
        }
      }
    })

    onClose()

    toastMessage(t('successfullyDeleted'), TOAST_TYPES.success)
  }

  return { onSubmit, loading }
}
