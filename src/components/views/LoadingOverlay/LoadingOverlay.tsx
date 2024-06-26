import { FC } from 'react'

import { Loader } from '@/components/views/Loader/Loader'

import { ILoadingOverlayProps } from './LoadingOverlay.interfaces'

export const LoadingOverlay: FC<ILoadingOverlayProps> = ({
  active,
  position,
  children,
  ...props
}) => {
  return (
    <>
      {active ? (
        <Loader sx={{ position: `${position}` }} color="primary" {...props} />
      ) : (
        <>{children}</>
      )}
    </>
  )
}
