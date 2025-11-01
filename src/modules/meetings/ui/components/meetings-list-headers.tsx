"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"

import { useState } from "react"


import { DEFAULT_PAGE } from "@/constants"
import { NewMeetingDialog } from "./new-meetings-dialog"
export const MeetingsListHeaders = () => {

    

    const  [isDialogOpen, setisDialogOpen] = useState(false)
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
              too ilters
            </div>
        </div>
        </>
    )
}
