import { ICV } from '@/graphql/interfaces/ICV.interfaces'

export interface ICVsItemProps {
  CV: ICV
  handleSetCurrentCV: (cv: ICV) => void
}
