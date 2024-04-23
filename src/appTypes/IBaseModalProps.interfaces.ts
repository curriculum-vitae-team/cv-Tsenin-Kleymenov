export interface IBaseModalProps {
  onClose: () => void
}

export interface IUseDeleteModal {
  onSubmit: () => Promise<void>
  loading: boolean
}
