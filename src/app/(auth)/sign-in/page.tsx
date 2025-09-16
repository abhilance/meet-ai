import React from 'react'
import { Card } from '@/components/ui/card'
import { SignInView } from '@/modules/auth/ui/views/sign-in-view'

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { session } from '@/db/schema'
import { auth } from '@/lib/auth'

const page = async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if(!!session){
    redirect("/")
  }
  return <SignInView/>
}

export default page

