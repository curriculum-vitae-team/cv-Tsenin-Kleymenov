export interface IProps {
  children: React.ReactNode
  textColor: 'primary' | 'secondary' | 'inherit'
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}
