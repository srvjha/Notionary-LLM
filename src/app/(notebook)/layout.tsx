import { currentUser } from '@/modules/authentication/actions';
import Header from '@/modules/layout/components/header'
import { auth } from '@/utils/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const ChatLayout = async({children}:{children:React.ReactNode}) => {
   const user = await currentUser()
   const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      redirect("/sign-in");
    }
  return (
    <div>
      <Header user={user!}/>
      {children}
    </div>
  )
}

export default ChatLayout
