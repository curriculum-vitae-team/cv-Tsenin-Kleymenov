import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { MenuItem, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import DeleteModal from '@/components/views/DeleteModal/DeleteModal'
import { useDeleteModal } from '@/components/views/DeleteModal/hook/useDeleteModal'
import { PROFICIENCY_COLORS } from '@/constants/proficiency'
import { ILanguageProficiency } from '@/graphql/interfaces/ILanguageProficiency.interfaces'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'

import { BasicMenu } from '../BasicMenu/BasicMenu'

import { useDeleteLanguage } from './hook/useDeleteLanguage'
import LanguageItemModal from './LanguageItemModal/LanguageItemModal'
import { ILanguageInfo, ILanguageItemProps } from './LanguageItem.interfaces'
import { LanguageCard, LanguageItemContainer, ProficiencyBadge } from './LanguageItem.styles'

export const LanguageItem: FC<ILanguageItemProps> = ({ languageName, languageProficiency }) => {
  const { id: userId } = useParams()

  const { t } = useTranslation()

  const { user, isAdmin } = useUser()
  const userCheck = userId === user?.id

  const { isVisible, toggleVisibility } = useBooleanState()
  const { isDelete, toggleDelete } = useDeleteModal()

  const [language, setLanguage] = useState<ILanguageInfo>({
    name: languageName,
    proficiency: languageProficiency
  })

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const { onSubmit, deleteProfileLangLoading } = useDeleteLanguage(
    {
      id: userId as string,
      languageName: language.name
    },
    toggleDelete
  )

  return (
    <>
      <LanguageCard>
        <LanguageItemContainer>
          <ProficiencyBadge proficiency_color={PROFICIENCY_COLORS[languageProficiency]}>
            {language.proficiency}
          </ProficiencyBadge>
          <Typography>{language.name}</Typography>
        </LanguageItemContainer>
        {(userCheck || isAdmin) && (
          <BasicMenu>
            <MenuItem onClick={toggleVisibility}>{t('update')}</MenuItem>
            <MenuItem onClick={toggleDelete}>{t('remove')}</MenuItem>
          </BasicMenu>
        )}
      </LanguageCard>
      {isVisible && (
        <LanguageItemModal
          userData={{
            id: userId as string,
            languages: userData?.user.profile.languages as ILanguageProficiency[]
          }}
          languageInfo={{
            language,
            setLanguage
          }}
          onClose={toggleVisibility}
        />
      )}
      {isDelete && (
        <DeleteModal
          isLoading={deleteProfileLangLoading}
          title={t('confirmRemoveLanguage')}
          message={t('confirmRemoveLanguageMessage')}
          onSubmit={onSubmit}
          onClose={toggleDelete}
        />
      )}
    </>
  )
}
