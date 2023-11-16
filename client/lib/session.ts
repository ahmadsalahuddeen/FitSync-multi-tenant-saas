import { getServerSession } from "next-auth/next"

import { authOptions } from "../app/api/auth/[...nextauth]/route"
import { redirect, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}



// checks if a user session exists and redirects to the homepage if it doesn't(in the server side).
export async function loginIsRequiredServer() {
  const session = await getCurrentUser()
  if(!session) return redirect("/")
}


// checks if a user session exists and redirects to the homepage if it doesn't(in the Client side).
export  function loginIsRequiredClient() {
  const session = useSession()
  const router = useRouter()
  if(!session) return router.push('/');
}