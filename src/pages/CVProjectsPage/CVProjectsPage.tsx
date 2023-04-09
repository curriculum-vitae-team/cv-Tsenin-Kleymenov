import { FC, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Divider } from '@mui/material'

import { ICVResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { authService } from '@/graphql/auth/authService'
import { CV } from '@/graphql/cv/CVQuery'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'

import { CVProjectsModal } from './CVProjectsModal/CVProjectsModal'
import { tableColumns } from './tableColumns'

export const CVProjectsPage: FC = () => {
  const { id: CVId } = useParams()
  const {
    data: CVData,
    loading: CVLoading,
    error: CVError
  } = useQuery<ICVResult>(CV, {
    variables: { id: CVId }
  })

  const user = useReactiveVar(authService.user$)
  const userCheck = CVData?.cv?.user?.id === user?.id
  const [open, setOpen] = useState<boolean>(false)
  const [searchedName, setSearchedName] = useState<string>('')

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const handleCVsModalClose = (): void => {
    setOpen(prev => !prev)
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
          placeholder="Search"
        />

        {userCheck && (
          <Button sx={{ maxWidth: 150 }} variant="contained" onClick={handleCVsModalClose}>
            Update
          </Button>
        )}
      </Box>
      <Divider />
      <CommonTable<IProject>
        label="projects"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={CVLoading}
        error={CVError}
      />
      {open && (
        <CVProjectsModal open={open} handleClose={handleCVsModalClose} CVData={CVData?.cv} />
      )}
    </>
  )
}
