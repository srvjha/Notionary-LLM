import { useSession } from '@/lib/auth-client'
import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  console.log("User Session: ",useSession)
  return (
    <div>
      {children}
    </div>
  )
}

export default AuthLayout
