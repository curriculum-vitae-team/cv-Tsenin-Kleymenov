import { ICVProject } from '@/graphql/interfaces/ICv.interfaces'

export const createProjectsIdArray = (data?: ICVProject[]): string[] => {
  if (data) {
    return data.map(({ id }) => id)
  }
  return []
}
