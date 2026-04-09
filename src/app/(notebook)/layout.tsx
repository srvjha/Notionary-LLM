import { currentUser } from '@/modules/authentication/actions';
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
    <div className="h-screen w-full bg-black overflow-hidden flex flex-col text-slate-300">
      {children}
    </div>
  )
}

export default ChatLayout
