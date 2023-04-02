export interface IAppSelectProps<T> {
  loading?: boolean
  label: string
  items?: T[]
}

export interface IMastery {
  id: string
  name: string
}

export interface IProficiency {
  id: string
  name: string
}
