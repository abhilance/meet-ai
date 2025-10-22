"use client"
import { useQuery, useSuspenseQuery}from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
export const AgentsView =()=>{
    const trpc = useTRPC();
    const {data}= useSuspenseQuery( trpc.agents.getMany.queryOptions());
    
     

    return (
        <div>
            {JSON.stringify(data, null,2)}
        </div>
    )
}

export const AgentsViewLoading = ()=>{
    return (
        <LoadingState
         tittle="Loading Agents"
         description="this may take few seconds"/>
    )
}

export const AgentsViewError = ()=> {
    return (
        <ErrorState
        tittle = "Error Loading Agents"
        description= " Somthing went wrong "
        />
    )
}
