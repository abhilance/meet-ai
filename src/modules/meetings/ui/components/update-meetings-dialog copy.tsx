import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";
import { MeetingsGetOne } from "../../type";

interface MeetingsDialogProps{
    open: boolean;
    onOpenChange: (open: boolean)=>void
    initialValues:MeetingsGetOne
};

export const UpdateMeetingDialog=({
    open,
    onOpenChange,
    initialValues
}: MeetingsDialogProps)=>{

    return(
        <ResponsiveDialog
        tittle="Edit Meeting"
        description="Edit the meeting details"
        open={open}
        onOpenChange={onOpenChange}
        >
<MeetingForm
onSucess={()=>{
    onOpenChange(false)
}}
onCancel={()=>onOpenChange(false)}
initialValues={initialValues}
/>
       
    </ResponsiveDialog>
        )
}