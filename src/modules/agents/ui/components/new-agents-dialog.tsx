import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
interface NewAgentsDialogProps{
    open: boolean;
    onOpenChange: (open: boolean)=>void
};

export const NewAgentsDialog=({
    open,
    onOpenChange,
}: NewAgentsDialogProps)=>{
    return(

        <ResponsiveDialog
        
        tittle="New Agents"
        description="create new Agents"
        open={open}
        onOpenChange={onOpenChange}
        >
<AgentForm
onSucess={()=> onOpenChange(false)}
onCancel={()=> onOpenChange(false)}/>
       
    </ResponsiveDialog>
        )
}