import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'
import ResetPassword from './_components/ResetPassword'

const SuspenseResetPassword = () => {
  return (
    <Suspense fallback={<Loader2 size={32} />}>
      <ResetPassword />
    </Suspense>
  )
}

export default SuspenseResetPassword