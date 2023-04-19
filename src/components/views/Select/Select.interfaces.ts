export interface IAppSelectProps<T> {
  loading?: boolean
  label: string
  items?: T[]
}

export interface IAppSelectItemProps {
  id: string
  name: string
}
