export interface ICreateCVModal {
  handleOpenClose: () => void
}

export enum FORM_CREATE_CV_KEYS {
  name = 'name',
  description = 'description',
  education = 'education'
}

export interface ICreateCVFormValues {
  [FORM_CREATE_CV_KEYS.name]: string
  [FORM_CREATE_CV_KEYS.description]: string
  [FORM_CREATE_CV_KEYS.education]: string
}
