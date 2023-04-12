export interface ICreateCVModal {
  isOpen: boolean
  handleOpenClose: () => void
}

export interface IFormCreateCV {
  [key: string]: string | boolean
  name: string
  description: string
  is_template: boolean
}
