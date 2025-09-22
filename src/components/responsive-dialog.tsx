import { useIsMobile } from "@/hooks/use-mobile"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "./ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./ui/dialog";

interface Props {
    title: string,
    description: string,
    children: React.ReactNode
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export const ResponsiceDialog = ({
    title,
    description,
    children,
    open,
    onOpenChange
}: Props) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer
                open={open}
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            {title}
                        </DrawerTitle>
                        <DrawerDescription>
                            {description}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        {children}
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogHeader>
                <DialogContent>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                    {children}
                </DialogContent>
            </DialogHeader>
        </Dialog>
    )
}