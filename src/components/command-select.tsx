import { ReactNode, useState } from "react"
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronsDownIcon } from "lucide-react";
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "./ui/command";
interface Props {
        options:Array<{
        id: string,
        value: string,
        children: ReactNode;
    }>
    onSelect: (value: string) => void
    onSearch?: (value: string) => void
    value:string
    placeholder?: string
    isSearchable?: boolean
    className?: string
}
export const CommandSelect = ({
    options,
    onSelect,
    value,
    onSearch,
    placeholder= "Select an option",
    isSearchable,
    className
}: Props) => {
const [open, setopen] = useState(false)
const selectedOption= options.find((option)=>option.value === value)
const handleOpenChange = (open:boolean)=>{
    onSearch?.("")
    setopen(open)
}
return (
 <>
 <Button 
 onClick={()=>setopen(true)}
 type="button"
        variant="outline"
        className={cn("h-9 justify-between font-normal px-2",
            !selectedOption && "text-muted-foreground",
            className
        )}
    >
        <div>
            {selectedOption?.children ?? placeholder}
        </div>
        <ChevronsDownIcon />
    </Button>
    <CommandResponsiveDialog
    shouldFilter={!onSearch}
    open= {open}
onOpenChange={handleOpenChange}>
        <CommandInput placeholder="search" onValueChange={onSearch}/>
        <CommandList>
            <CommandEmpty>
                <span className="text-muted-foreground">
                 No options found
                </span>
            </CommandEmpty>
            {options.map((option)=>(
                <CommandItem 
                key={option.id}
                onSelect={()=>{
                    onSelect(option.value)
                    setopen(false)
                }}
                >
                    {option.children}
                </CommandItem>
            ))}
        </CommandList>
    </CommandResponsiveDialog>
</>
)
}
