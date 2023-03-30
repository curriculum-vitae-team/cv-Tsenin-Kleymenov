import { ITab } from '@/constants/tabs'

export const filterRoutPath = (tabsLocation: string, tabs: ITab[]): string | undefined => {
  const tabsPathArray = tabs.map(tab => tab.path)
  return tabsLocation
    .split('/')
    .filter(item => tabsPathArray.includes(item))
    .toString()
}
