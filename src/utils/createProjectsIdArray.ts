import { IProject } from '@/graphql/interfaces/IProject.interfaces'

export const createProjectsIdArray = (data?: IProject[]): string[] => {
  if (data) {
    return data.map(({ id }) => id)
  }
  return []
}
