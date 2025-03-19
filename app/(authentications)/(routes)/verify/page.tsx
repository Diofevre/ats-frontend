import React, { Suspense } from 'react'
import FormVerifyPage from './_components/FormVerify'

const Verify = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormVerifyPage />
    </Suspense>
  )
}

export default Verify