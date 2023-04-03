import { ITab } from '@/constants/tabs'

export const filterRoutPath = (path: string, tabs: ITab[]): string | void => {
  const tabsPathArray = tabs.map(tab => tab.path)
  return path
    .split('/')
    .filter(item => tabsPathArray.includes(item))
    .toString()
}
