import React from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { db } from '@/db'
import { redirect } from 'next/navigation'
interface Props {}

const Page = async() => {
    const { getUser } = getKindeServerSession()

    const user = await getUser()
    if(!user || !user.id) redirect("/auth-callback?origin=userdashboard")
  
    const dbUser = await db.user.findFirst({
      where: {id : user.id}
    })
    
    if(!dbUser){
      redirect("/auth-callback?origin=userdashboard")
    }
  return <div></div>
}

export default Page