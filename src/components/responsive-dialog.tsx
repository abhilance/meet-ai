"use client"
import { useIsMobile } from "@/hooks/use-mobile"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer"


interface ResponsiveDialogProps {
    tittle: string;
    description: string;
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const ResponsiveDialog = ({
    tittle,
    description,
    children,
    open,
    onOpenChange,


}: ResponsiveDialogProps) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            {tittle}
                        </DrawerTitle>
                        <DrawerDescription>
                            {description}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 ">
                        {children}
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }   
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {tittle}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
