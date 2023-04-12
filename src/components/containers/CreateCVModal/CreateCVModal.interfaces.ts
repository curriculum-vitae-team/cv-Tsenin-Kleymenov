export interface ICreateCVModal {
  handleOpenClose: () => void
}

export interface IFormCreateCV {
  [key: string]: string | boolean
  name: string
  description: string
  is_template: boolean
}
