"use client"

import { ErrorState } from "@/components/error-state";

const ErrorPage = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="Somthing went wrong"
        />
    )
}

export default ErrorPage;