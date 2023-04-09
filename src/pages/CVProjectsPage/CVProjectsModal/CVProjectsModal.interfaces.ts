import { ICV } from '@/graphql/interfaces/ICV.interfaces'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'

export interface ICVProjectsModalProps {
  CVData?: ICV
  open: boolean
  handleClose: () => void
}

export enum FORM_CV_PROJECTS_KEYS {
  projects = 'projects'
}

export interface ICVProjectFormValues {
  [FORM_CV_PROJECTS_KEYS.projects]: IProject[]
}
