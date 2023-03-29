export const getUserProfilePath = (route: string, id: string | undefined): string => {
  return route.includes(':id') ? route.replace(':id', id as string) : route
}
