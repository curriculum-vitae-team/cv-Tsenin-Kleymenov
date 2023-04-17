export enum FORM_EMPLOYEES_KEYS {
  email = 'email',
  password = 'password',
  first_name = 'first_name',
  last_name = 'last_name',
  position = 'position',
  department = 'department',
  role = 'role'
}

export interface IEmployeesFormValues {
  [FORM_EMPLOYEES_KEYS.email]: string
  [FORM_EMPLOYEES_KEYS.password]: string
  [FORM_EMPLOYEES_KEYS.first_name]: string
  [FORM_EMPLOYEES_KEYS.last_name]: string
  [FORM_EMPLOYEES_KEYS.position]: string
  [FORM_EMPLOYEES_KEYS.department]: string
  [FORM_EMPLOYEES_KEYS.role]: string
}
