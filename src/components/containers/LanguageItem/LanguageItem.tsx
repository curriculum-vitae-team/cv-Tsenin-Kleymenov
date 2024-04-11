import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { PROFICIENCY_COLORS } from '@/constants/proficiency'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'

import LanguageItemModal from './LanguageItemModal/LanguageItemModal'
import { ILanguageItemProps } from './LanguageItem.interfaces'
import { LanguageButton, LanguageItemContainer, ProficiencyBadge } from './LanguageItem.styles'

export const LanguageItem: FC<ILanguageItemProps> = ({ languageName, languageProficiency }) => {
  const { id: userId } = useParams()

  const { isVisible, toggleVisibility } = useBooleanState()

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  return (
    <LanguageButton onClick={toggleVisibility}>
      <LanguageItemContainer>
        <ProficiencyBadge proficiency_color={PROFICIENCY_COLORS[languageProficiency]}>
          {languageProficiency}
        </ProficiencyBadge>
        {languageName}
      </LanguageItemContainer>
      {isVisible && <LanguageItemModal userData={userData?.user} onClose={toggleVisibility} />}
    </LanguageButton>
  )
}
