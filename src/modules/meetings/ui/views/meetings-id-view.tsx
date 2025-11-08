"use client"
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/modules/agents/hooks/use-confirm";
import { useState } from "react";
import { UpdateMeetingDialog } from "../components/update-meetings-dialog copy";

interface Props {
    meetingId : string;
}

export const MeetingIdView= ({
    meetingId
}: Props)=>{

    const trpc = useTRPC();
    const { data }= useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId}),
    )

    const [UpdatedMeetingDialogOpen, setUpdatedMeetingDialogOpen] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

                router.push("/meetings")
            },
            onError: (error) => {
                toast.error(error.message)
            }
        }),
    )
    const[RemoveConfirmation, confirmRemove]=useConfirm(
        "Are you sure ",
        `The following action will remove this meetings`
    )
    const handleRemovemeeting= async()=>{
        const ok = await confirmRemove();
        if(!ok)return;
        await removeMeeting.mutateAsync({id:meetingId})
    }

    return (
        <>
        <RemoveConfirmation/>
        <UpdateMeetingDialog
        open={UpdatedMeetingDialogOpen}
        onOpenChange={setUpdatedMeetingDialogOpen}
        initialValues={data}
        />
        <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
         <MeetingIdViewHeader
         meetingId={meetingId}
         meetingName={data.name}
         onEdit={()=>setUpdatedMeetingDialogOpen(true)}
         onRemove={handleRemovemeeting}
         />
           {JSON.stringify(data,null,2)}
        </div>
        </>
    )
}

export const MeetingsIdViewLoading = ()=>{
    return (
        <LoadingState
         tittle="Loading Meetings"
         description="this may take few seconds"/>
    )
}

export const MeetingsIdViewError = ()=> {
    return (
        <ErrorState
        tittle = "Error Loading Meetings"
        description= " Somthing went wrong "
        />
    )
}