import * as yup from 'yup'

export const PROFILE_SCHEMA = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
    .required('First Name is a required field'),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
    .required('Last Name is a required field'),
  department: yup.string().required('Department is a required field'),
  position: yup.string().required('Position is a required field')
})
