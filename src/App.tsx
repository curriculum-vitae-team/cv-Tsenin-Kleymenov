import { FC, Suspense } from 'react'

import { Loader } from '@/components/views/Loader/Loader'
import { AppRouter } from '@/router/AppRouter'

const App: FC = () => {
  return (
    <>
      <Suspense fallback={<Loader color="primary" />}>
        <AppRouter />
      </Suspense>
    </>
  )
}

export default App
