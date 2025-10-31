import { MeetingsViewError, MeetingsViewLoading, MeetingView } from '@/modules/meetings/ui/views/meetings-views'
import { getQueryClient,trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const page = () => {
    const querClient=getQueryClient();
    void querClient.prefetchQuery(
     trpc.meetings.getMany.queryOptions({})
    )
  return (
    <HydrationBoundary state={dehydrate(querClient)}>
<Suspense fallback={<MeetingsViewLoading/>}>
    <ErrorBoundary fallback={<MeetingsViewError/>}>
   <MeetingView/>
    </ErrorBoundary>
</Suspense>
    </HydrationBoundary>
  )
}

export default page
