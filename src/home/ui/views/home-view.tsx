"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import React from 'react'

export const HomeView = () => {
const trpc = useTRPC()
const{data}= useQuery(trpc.hello.queryOptions({text : "abhi"}))

  return (
    
      <div className="p-4 flex flex-col gap-y-4">
      {data?.greeting}
    </div>
  )
}
