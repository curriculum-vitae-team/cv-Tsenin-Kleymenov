import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { ICV } from '@/graphql/interfaces/ICV.interfaces'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'

export interface ICVProjectsModalProps extends IBaseModalProps {
  CVData?: ICV
}

export enum FORM_CV_PROJECTS_KEYS {
  projects = 'projects'
}

export interface ICVProjectFormValues {
  [FORM_CV_PROJECTS_KEYS.projects]: IProject[]
}
