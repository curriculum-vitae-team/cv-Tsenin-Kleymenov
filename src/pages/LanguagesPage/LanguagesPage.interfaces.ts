export enum FORM_LANGUAGE_KEYS {
  name = 'name',
  native_name = 'native_name',
  iso2 = 'iso2'
}

export interface ILanguageFormValues {
  [FORM_LANGUAGE_KEYS.name]: string
  [FORM_LANGUAGE_KEYS.native_name]: string
  [FORM_LANGUAGE_KEYS.iso2]: string
}
