"use client"
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const MeetingView=()=>{
    const trpc= useTRPC();
    const {data}= useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
    return (
     <div className="overflow-x-scroll">
        {JSON.stringify(data)}
     </div>
    )
}

export const MeetingsViewLoading = ()=>{
    return (
        <LoadingState
         tittle="Loading Agents"
         description="this may take few seconds"/>
    )
}

export const MeetingsViewError = ()=> {
    return (
        <ErrorState
        tittle = "Error Loading Agents"
        description= " Somthing went wrong "
        />
    )
}