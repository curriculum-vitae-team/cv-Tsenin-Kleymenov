import * as yup from 'yup'

import { FORM_PROFILE_CVS_KEYS } from '@/components/containers/EmployeeCVsProfile/CVsModal/CVsModal.interfaces'
import { FORM_PROFILE_LANGUAGES_KEYS } from '@/components/containers/EmployeeLanguagesProfile/LanguagesModal/LanguagesModal.interfaces'
import { FORM_PROFILE_KEYS } from '@/components/containers/EmployeeProfileForm/EmployeeProfileForm.interfaces'
import { FORM_PROFILE_SKILLS_KEYS } from '@/components/containers/EmployeeSkillsProfile/SkillsModal/SkillsModal.interfaces'
import { FORM_LOGIN_KEYS } from '@/components/containers/LoginForm/LoginForm.interfaces'
import { FORM_SIGNUP_KEYS } from '@/components/containers/SignUpForm/SignUpForm.interfaces'
import { FORM_DEPARTMENT_KEYS } from '@/pages/DepartmentsPage/DepartmentsPage.interfaces'
import { FORM_EMPLOYEES_KEYS } from '@/pages/EmployeesPage/EmployeesPage.interfaces'
import { FORM_LANGUAGE_KEYS } from '@/pages/LanguagesPage/LanguagesPage.interfaces'
import { FORM_POSITION_KEYS } from '@/pages/PositionsPage/PositionsPage.interfaces'
import { FORM_PROJECT_KEYS } from '@/pages/ProjectsPage/ProjectsPage.interfaces'
import { FORM_SKILL_KEYS } from '@/pages/SkillsPage/SkillsPage.interfaces'

export const LOGIN_SCHEMA = yup.object().shape({
  [FORM_LOGIN_KEYS.email]: yup.string().required('emailRequired').email('invalidEmailFormat'),
  [FORM_LOGIN_KEYS.password]: yup.string().required('passwordRequired')
})

export const SIGNUP_SCHEMA = yup.object().shape({
  [FORM_SIGNUP_KEYS.email]: yup.string().required('emailRequired').email('invalidEmailFormat'),
  [FORM_SIGNUP_KEYS.password]: yup.string().required('passwordRequired')
})

export const FORM_EMPLOYEES_SCHEMA = yup.object({
  [FORM_EMPLOYEES_KEYS.email]: yup.string().required('emailRequired').email('invalidEmailFormat'),
  [FORM_EMPLOYEES_KEYS.password]: yup.string().required('passwordRequired'),
  [FORM_EMPLOYEES_KEYS.first_name]: yup
    .string()
    .matches(/^([^0-9]*)$/, 'firstNameNoNumbers')
    .required('firstNameRequired'),
  [FORM_EMPLOYEES_KEYS.last_name]: yup
    .string()
    .matches(/^([^0-9]*)$/, 'lastNameNoNumbers')
    .required('lastNameRequired'),
  [FORM_EMPLOYEES_KEYS.role]: yup.string().required('roleRequired')
})

export const FORM_PROFILE_SCHEMA = yup.object().shape({
  [FORM_PROFILE_KEYS.firstName]: yup.string().matches(/^([^0-9]*)$/, 'firstNameNoNumbers'),
  [FORM_PROFILE_KEYS.lastName]: yup.string().matches(/^([^0-9]*)$/, 'lastNameNoNumbers'),
  [FORM_PROFILE_KEYS.department]: yup.string().required('departmentRequired'),
  [FORM_PROFILE_KEYS.position]: yup.string().required('positionRequired')
})

export const FORM_PROFILE_LANGUAGES_SCHEMA = yup.object().shape({
  [FORM_PROFILE_LANGUAGES_KEYS.languages]: yup.string().required('languagesRequired'),
  [FORM_PROFILE_LANGUAGES_KEYS.proficiency]: yup.string().required('proficiencyRequired')
})

export const FORM_PROFILE_SKILLS_SCHEMA = yup.object().shape({
  [FORM_PROFILE_SKILLS_KEYS.skills]: yup.string().required('skillsRequired'),
  [FORM_PROFILE_SKILLS_KEYS.mastery]: yup.string().required('masteryRequired')
})

export const FORM_PROFILE_CVS_SCHEMA = yup.object().shape({
  [FORM_PROFILE_CVS_KEYS.name]: yup.string().required('nameRequired'),
  [FORM_PROFILE_CVS_KEYS.description]: yup.string().required('descriptionRequired'),
  [FORM_PROFILE_CVS_KEYS.education]: yup.string().required('educationRequired')
})

export const FORM_PROJECT_SCHEMA = yup.object().shape({
  [FORM_PROJECT_KEYS.name]: yup.string().required('nameRequired'),
  [FORM_PROJECT_KEYS.internal_name]: yup.string().required('internalNameRequired'),
  [FORM_PROJECT_KEYS.domain]: yup.string().required('domainRequired'),
  [FORM_PROJECT_KEYS.team_size]: yup
    .number()
    .typeError('mustBeNumber')
    .min(1)
    .required('teamSizeRequired'),
  [FORM_PROJECT_KEYS.start_date]: yup.date().required('startDateRequired'),
  [FORM_PROJECT_KEYS.end_date]: yup
    .date()
    .notRequired()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(yup.ref(FORM_PROJECT_KEYS.start_date), 'endDateInvalid')
})

export const FORM_DEPARTMENT_SCHEMA = yup.object().shape({
  [FORM_DEPARTMENT_KEYS.name]: yup.string().required('nameRequired')
})

export const FORM_POSITION_SCHEMA = yup.object().shape({
  [FORM_POSITION_KEYS.name]: yup.string().required('nameRequired')
})

export const FORM_SKILL_SCHEMA = yup.object().shape({
  [FORM_SKILL_KEYS.name]: yup.string().required('nameRequired')
})

export const FORM_LANGUAGE_SCHEMA = yup.object().shape({
  [FORM_LANGUAGE_KEYS.name]: yup.string().required('nameRequired').matches(/^\S+$/, 'nameNoSpaces'),
  [FORM_LANGUAGE_KEYS.native_name]: yup
    .string()
    .required('nativeNameRequired')
    .matches(/^\S+$/, 'nativeNameNoSpaces'),
  [FORM_LANGUAGE_KEYS.iso2]: yup
    .string()
    .max(2)
    .required('iso2Required')
    .matches(/^[A-Z]*$/gms, 'onlyTwoLetters')
})
