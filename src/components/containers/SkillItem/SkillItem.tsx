import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { MenuItem } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import DeleteModal from '@/components/views/DeleteModal/DeleteModal'
import { useDeleteModal } from '@/components/views/DeleteModal/hook/useDeleteModal'
import { MASTERY_ARRAY } from '@/constants/mastery'
import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { getMasteryColor } from '@/utils/getMasteryColor'

import { BasicMenu } from '../BasicMenu/BasicMenu'

import { useDeleteSkill } from './hook/useDeleteSkill'
import { SkillItemModal } from './SkillItemModal/SkillItemModal'
import { ISkillItemProps } from './SkillItem.interfaces'
import { LinearProgress, SkillCard, SkillInfo, SkillName } from './SkillItem.styles'

export const SkillItem: FC<ISkillItemProps> = ({ skill }) => {
  const { id: userId } = useParams()
  const { t } = useTranslation()
  const { user, isAdmin } = useUser()

  const [skillInfo, setSkillInfo] = useState(skill)

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })
  const { isVisible, toggleVisibility } = useBooleanState()
  const { isDelete, toggleDelete } = useDeleteModal()

  const { onSubmit, deleteProfileSkillLoading } = useDeleteSkill(
    {
      id: userId as string,
      skillName: skill.name
    },
    toggleDelete
  )

  const color = getMasteryColor(skill.mastery)

  const value = MASTERY_ARRAY.find(mastery => mastery.id === skill.mastery)?.value
  return (
    <>
      <SkillCard>
        <SkillInfo>
          <LinearProgress variant="determinate" value={value} color={color} />
          <SkillName>{skill.name}</SkillName>
        </SkillInfo>
        {(user || isAdmin) && (
          <BasicMenu>
            <MenuItem onClick={toggleVisibility}>{t('update')}</MenuItem>
            <MenuItem onClick={toggleDelete}>{t('remove')}</MenuItem>
          </BasicMenu>
        )}
      </SkillCard>
      {isVisible && (
        <SkillItemModal
          skillInfo={{ skill: skillInfo, setSkillInfo }}
          userData={{
            id: userId as string,
            skills: userData?.user.profile?.skills as ISkillMastery[]
          }}
          onClose={toggleVisibility}
        />
      )}
      {isDelete && (
        <DeleteModal
          isLoading={deleteProfileSkillLoading}
          message="confirmRemoveSkillMessage"
          onClose={toggleDelete}
          onSubmit={onSubmit}
          title="confirmRemoveSkill"
        />
      )}
    </>
  )
}
