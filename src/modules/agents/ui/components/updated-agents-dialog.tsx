import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentsGetOne } from "../../type";
interface UpdatedagentsDialogProps{
    open: boolean;
    onOpenChange: (open: boolean)=>void
    initialValues: AgentsGetOne
};

export const UpdatedAgentsDialog=({
    open,
    onOpenChange,
    initialValues
}: UpdatedagentsDialogProps)=>{
    return(

        <ResponsiveDialog
        tittle="Edit Agent"
        description="Edit the agent details"
        open={open}
        onOpenChange={onOpenChange}

        >
<AgentForm
onSucess={()=> onOpenChange(false)}
onCancel={()=> onOpenChange(false)}
initialValues={initialValues}
/>
       
    </ResponsiveDialog>
        )
}