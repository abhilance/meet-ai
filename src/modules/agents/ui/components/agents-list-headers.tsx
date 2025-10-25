"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewAgentsDialog } from "./new-agents-dialog"
import { useState } from "react"
export const AgentsListHeaders = () => {

    const  [isDialogOpen, setisDialogOpen] = useState(false)
    return (
        <>
        <NewAgentsDialog open={isDialogOpen} onOpenChange={setisDialogOpen}/>
        <div className="py-4 px-8 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-medium">My Agents</h5>
                <Button onClick={()=>setisDialogOpen(true)}>
                    <PlusIcon/>
                    New Agents
                </Button>
            </div>
        </div>
        </>
    )
}
