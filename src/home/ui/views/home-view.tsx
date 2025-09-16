"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from 'react'

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (!session) return (

    <p>loding....</p>
  )
  return (
    <div>
      <div className="p-4 flex flex-col gap-y-4">
        <p> log in as {session?.user.name}</p>
        <Button
          onClick={() => authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/sign-in")
            }
          }
          )}
        >signed-out</Button>
      </div>
    </div>
  )
}
