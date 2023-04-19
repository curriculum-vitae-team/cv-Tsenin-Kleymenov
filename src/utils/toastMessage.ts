import { Id, toast, ToastContainerProps } from 'react-toastify'

import { SimpleToast } from '@/components/views/SimpleToast/SimpleToast'
import { TOAST_TYPES } from '@/constants/toastTypes'

import 'react-toastify/dist/ReactToastify.css'

export const toastProps: Partial<ToastContainerProps> = {
  autoClose: 3000,
  position: 'top-right',
  closeButton: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: false,
  newestOnTop: true,
  limit: 3
}

type Position =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | undefined

export const toastMessage = (
  message: string,
  type: TOAST_TYPES,
  position: Position = 'bottom-left'
): Id => {
  toast.clearWaitingQueue()

  return toast(SimpleToast(message), {
    ...toastProps,
    type,
    position
  })
}
