import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { AppSelect } from '@/components/views/Select/Select'

const SettingsPage: FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <AppSelect variant="outlined" label={t('appearance')} />
    </div>
  )
}

export default SettingsPage
