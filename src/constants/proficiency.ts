import { PROFICIENCY } from '@/components/containers/EmployeeLanguagesProfile/EmployeeLanguagesProfile.interfaces'

export const PROFICIENCY_ARRAY = [
  { id: PROFICIENCY.A1, name: PROFICIENCY.A1 },
  { id: PROFICIENCY.A2, name: PROFICIENCY.A2 },
  { id: PROFICIENCY.B1, name: PROFICIENCY.B1 },
  { id: PROFICIENCY.B2, name: PROFICIENCY.B2 },
  { id: PROFICIENCY.C1, name: PROFICIENCY.C1 },
  { id: PROFICIENCY.C2, name: PROFICIENCY.C2 },
  { id: PROFICIENCY.Native, name: PROFICIENCY.Native }
]

interface IProficiencyColors {
  [key: string]: string
}

export const PROFICIENCY_COLORS: IProficiencyColors = {
  [PROFICIENCY.A1]: 'rgb(118, 118, 118)',
  [PROFICIENCY.A2]: 'rgb(255 117 205)',
  [PROFICIENCY.B1]: 'rgb(2, 136, 209)',
  [PROFICIENCY.B2]: 'rgb(46, 125, 50)',
  [PROFICIENCY.C1]: 'rgb(255, 184, 0)',
  [PROFICIENCY.C2]: 'rgb(255 108 0)',
  [PROFICIENCY.Native]: 'rgb(198 48 49)'
}
