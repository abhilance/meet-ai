import { auth } from '@/lib/auth';
import { MeetingsListHeaders } from '@/modules/meetings/ui/components/meetings-list-headers';
import { MeetingsViewError, MeetingsViewLoading, MeetingView } from '@/modules/meetings/ui/views/meetings-views'
import { getQueryClient,trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const page = async() => {

  const session = await auth.api.getSession({
        headers: await headers(),
      }) 
      if(!session){
        redirect ("/sign-in")
      }
  
    const querClient=getQueryClient();
    void querClient.prefetchQuery(
     trpc.meetings.getMany.queryOptions({})
    )
  return (
    <>
    <MeetingsListHeaders/>
    <HydrationBoundary state={dehydrate(querClient)}>
<Suspense fallback={<MeetingsViewLoading/>}>
    <ErrorBoundary fallback={<MeetingsViewError/>}>
   <MeetingView/>
    </ErrorBoundary>
</Suspense>
    </HydrationBoundary>
    </>
  )
}

export default page
