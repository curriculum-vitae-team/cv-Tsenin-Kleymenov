import * as yup from 'yup'

import { FORM_PROFILE_LANGUAGES_KEYS } from '@/components/containers/EmployeeLanguagesProfileForm/LanguagesModal/LanguagesModal.interfaces'
import { FORM_PROFILE_KEYS } from '@/components/containers/EmployeeProfileForm/EmployeeProfileForm.interfaces'
import { FORM_LOGIN_KEYS } from '@/components/containers/LoginForm/LoginForm.interfaces'
import { FORM_SIGNUP_KEYS } from '@/components/containers/SignUpForm/SignUpForm.interfaces'

export const LOGIN_SCHEMA = yup.object().shape({
  [FORM_LOGIN_KEYS.email]: yup
    .string()
    .required('Email is a required field')
    .email('Invalid email format'),
  [FORM_LOGIN_KEYS.password]: yup
    .string()
    .required('Password is a required field')
    .min(6, 'Password must be at least 6 characters')
})

export const SIGNUP_SCHEMA = yup.object().shape({
  [FORM_SIGNUP_KEYS.email]: yup
    .string()
    .required('Email is a required field')
    .email('Invalid email format'),
  [FORM_SIGNUP_KEYS.password]: yup
    .string()
    .required('Password is a required field')
    .min(6, 'Password must be at least 6 characters')
})

export const FORM_PROFILE_SCHEMA = yup.object().shape({
  [FORM_PROFILE_KEYS.firstName]: yup
    .string()
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
    .required('First Name is a required field'),
  [FORM_PROFILE_KEYS.lastName]: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
    .required('Last Name is a required field'),
  [FORM_PROFILE_KEYS.department]: yup.string().required('Department is a required field'),
  [FORM_PROFILE_KEYS.position]: yup.string().required('Position is a required field')
})

export const FORM_PROFILE_LANGUAGES_SCHEMA = yup.object().shape({
  [FORM_PROFILE_LANGUAGES_KEYS.languages]: yup.string().required('Languages is a required field'),
  [FORM_PROFILE_LANGUAGES_KEYS.proficiency]: yup.string().required('Proficiency is a required field')
})
