export interface IRole {
  [key: string]: string
}

export enum ROLE {
  admin = 'admin',
  employee = 'employee'
}

export const ROLE_ARRAY: IRole[] = [
  { id: ROLE.admin, name: ROLE.admin },
  { id: ROLE.employee, name: ROLE.employee }
]
