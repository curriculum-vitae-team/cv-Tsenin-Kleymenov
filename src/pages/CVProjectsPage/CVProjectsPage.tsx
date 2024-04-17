import { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/material'

import { ICVResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { CV } from '@/graphql/cv/CVQuery'
import { ICVProject } from '@/graphql/interfaces/ICv.interfaces'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'

import { CVProjectsModal } from './CVProjectsModal/CVProjectsModal'
import { tableColumns } from './tableColumns'

export const CVProjectsPage: FC = () => {
  const { id: CVId } = useParams()

  const { isVisible, toggleVisibility } = useBooleanState()

  const [searchedName, setSearchedName] = useState<string>('')

  const { user, isAdmin } = useUser()
  const {
    data: CVData,
    loading: CVLoading,
    error: CVError
  } = useQuery<ICVResult>(CV, {
    variables: { id: CVId }
  })

  const userCheck = CVData?.cv?.user?.id === user?.id

  const { t } = useTranslation()

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      searchedName === ''
        ? CVData?.cv.projects
        : CVData?.cv.projects.filter(
            project =>
              project.name?.toLowerCase().includes(searchedName.toLowerCase()) ||
              project.internal_name?.toLowerCase().includes(searchedName.toLowerCase())
          ),
    [CVData?.cv.projects, searchedName]
  )

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <InputWithIcon
          icon={<SearchIcon fontSize="small" />}
          position="start"
          size="small"
          style={{ marginBottom: '20px' }}
          value={searchedName}
          onChange={handleSearchUser}
          placeholder={t('search') as string}
        />
        {(userCheck || isAdmin) && (
          <Button sx={{ maxWidth: 150 }} variant="contained" onClick={toggleVisibility}>
            {t('update')}
          </Button>
        )}
      </Box>
      <CommonTable<ICVProject>
        label="projects"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={CVLoading}
        error={CVError}
      />
      {isVisible && <CVProjectsModal onClose={toggleVisibility} CVData={CVData?.cv} />}
    </>
  )
}
