import { useState } from 'react'

interface IUseDeleteModal {
  isDelete: boolean
  toggleDelete: () => void
}

export const useDeleteModal = (): IUseDeleteModal => {
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const toggleDelete = (): void => {
    setIsDelete(prev => !prev)
  }

  return { isDelete, toggleDelete }
}
