import { AlertCircle } from "lucide-react"

interface Props {
    title: string,
    description: string
}

export const ErrorState = ({
    description,
    title
}: Props) => {
    return (
        <div className="py4 px-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                <AlertCircle className="size-6 animate-spin text-red-500" />
                <h6 className="text-lg font-medium">{title}</h6>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    )
}