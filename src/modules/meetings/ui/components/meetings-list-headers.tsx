"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"

import { useState } from "react"


import { DEFAULT_PAGE } from "@/constants"
import { NewMeetingDialog } from "./new-meetings-dialog"
import { MeetingsSearchFilter } from "./meetings-search-filters"
import { StatusFilter } from "./status-filter"
import { AgentIdFilter } from "./agent-id-filter"
import { useMeetingsFilters } from "../../hooks/use-meetings-filter"
export const MeetingsListHeaders = () => {

    

    const  [isDialogOpen, setisDialogOpen] = useState(false)
    const [filters, setfilters] = useMeetingsFilters();
    const isAnyFilterModifies= !!filters.status|| !!filters.search || !!filters.agentId;
    const onClearFilters=()=>{
        setfilters({
            status: null,
            agentId:"",
            search: "",
            page: 1,
        })
    }
    return (
        <>
       <NewMeetingDialog 
       open={isDialogOpen}
       onOpenChange={setisDialogOpen}
       />
        <div className="py-4 px-8 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-medium">My Meetings</h5>
                <Button onClick={()=>setisDialogOpen(true)}>
                    <PlusIcon/>
                    New Meeting
                </Button>
            </div>
            <div className="flex items-center gap-x-2 p-1">
              <MeetingsSearchFilter/>
              <StatusFilter/>
              <AgentIdFilter/>
              {isAnyFilterModifies && (
                <Button variant= "outline" onClick={onClearFilters}>
                    <XCircleIcon className="size-4"/>
                     Clear
                </Button>
              )}
            </div>
        </div>
    </>
    )
}
