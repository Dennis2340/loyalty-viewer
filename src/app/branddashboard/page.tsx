import MainBrandDashboard from '@/components/MainBrandDashboard'
import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { db } from '@/db'
import { redirect } from 'next/navigation'
interface Props {}

const Page = async() => {

  const { getUser } = getKindeServerSession()

  const user = await getUser()
  if(!user || !user.id) redirect("/auth-callback?origin=branddashboard")

  const dbUser = await db.user.findFirst({
    where: {id : user.id}
  })
  
  if(!dbUser){
    redirect("/auth-callback?origin=branddashboard")
  }

  return <>
  <MainBrandDashboard/>
  </>
}

export default Page