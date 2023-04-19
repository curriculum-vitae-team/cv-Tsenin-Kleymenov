import { ICV } from '@/graphql/interfaces/ICv.interfaces'

export interface ICVsItemProps {
  CV: ICV
  handleSetCurrentCV: (cv: ICV) => void
}
