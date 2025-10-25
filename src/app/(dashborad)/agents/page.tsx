import React, { Suspense } from 'react'
import { AgentsView, AgentsViewError, AgentsViewLoading } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc} from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { LoadingState } from '@/components/loading-state';
import { ErrorBoundary } from "react-error-boundary"
import { AgentsListHeaders } from '@/modules/agents/ui/components/agents-list-headers';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const page = async() => {
  const session = await auth.api.getSession({
      headers: await headers(),
    }) 
    if(!session){
      redirect ("/sign-in")
    }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <>
    <AgentsListHeaders/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />}>
      <ErrorBoundary fallback={<AgentsViewError/>}>
       <AgentsView/>
      </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
  )
}
export default page
