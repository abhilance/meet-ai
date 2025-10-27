"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewAgentsDialog } from "./new-agents-dialog"
import { useState } from "react"
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { AgentsSearchFilter } from "./agent-search-filters"
import { DEFAULT_PAGE } from "@/constants"
export const AgentsListHeaders = () => {

    const[filters, setfilters]=useAgentsFilters();
    const  isAnyFilterModified=!!filters.search;

    const onClearFilters=()=>{
        setfilters({
            search:"",
            page:DEFAULT_PAGE,

        })
    }

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
            <div className="flex items-center gap-x-2 p-1">
                <AgentsSearchFilter/>
                {isAnyFilterModified&&(
                 <Button variant="outline" size="sm" onClick={onClearFilters}>
                    <XCircleIcon/>
                    Clear
                 </Button>
                )}
            </div>
        </div>
        </>
    )
}
