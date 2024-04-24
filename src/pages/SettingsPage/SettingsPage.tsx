import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { AppSelect } from '@/components/views/Select/Select'
import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/context/ThemeContext'

import { SETTINGS_FORM_KEYS } from './SettingsPage.interfaces'
import { SettingsWrapper } from './SettingsPage.styles'

const SettingsPage: FC = () => {
  const { t } = useTranslation()

  const { theme, setTheme } = useThemeContext()

  const themeOptions = Object.values(Theme).map(item => {
    const convertedItem = item.toLowerCase()

    return {
      id: convertedItem,
      name: t(convertedItem)
    }
  })

  const { register, watch } = useForm({
    defaultValues: {
      [SETTINGS_FORM_KEYS.Theme]: theme || Theme.LIGHT
    },
    mode: 'onChange'
  })

  const watchTheme = watch(SETTINGS_FORM_KEYS.Theme)

  useEffect(() => {
    setTheme(watchTheme as Theme)
  }, [watchTheme])

  return (
    <SettingsWrapper>
      <form>
        <AppSelect
          variant="outlined"
          value={watchTheme ?? Theme.LIGHT}
          label={t('appearance')}
          items={themeOptions}
          {...register(SETTINGS_FORM_KEYS.Theme)}
        />
      </form>
    </SettingsWrapper>
  )
}

export default SettingsPage
