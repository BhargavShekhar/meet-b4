import { ResponsiceDialog } from "@/components/responsive-dialog"
import { AgentForm } from "./agent-form"

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export const NewAgentDialog = ({
    open,
    onOpenChange
}: Props) => {
    return (
        <ResponsiceDialog
            title="New Agent"
            description="Create a new agent"
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm 
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}

            />
        </ResponsiceDialog>
    )
}