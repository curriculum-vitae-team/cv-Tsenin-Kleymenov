import React, { FC, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const UnauthenticatedApp = React.lazy(async () => await import('./UnauthenticatedApp'))

const App: FC = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<UnauthenticatedApp />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
