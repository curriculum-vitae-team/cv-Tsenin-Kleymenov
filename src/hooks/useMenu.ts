import { useCallback, useState } from 'react'

interface IUseMenuResult {
  anchorEl: (EventTarget & (HTMLButtonElement | HTMLDivElement)) | null
  handleClick: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
  handleClose: () => void
}

type IInitialState = ((EventTarget & HTMLButtonElement) | HTMLDivElement) | null

export const useMenu = (initialState: IInitialState = null): IUseMenuResult => {
  const [anchorEl, setAnchorEl] = useState(initialState)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>): void =>
      setAnchorEl(event.currentTarget),
    []
  )

  const handleClose = useCallback(() => setAnchorEl(null), [])

  return { anchorEl, handleClick, handleClose } as const
}
