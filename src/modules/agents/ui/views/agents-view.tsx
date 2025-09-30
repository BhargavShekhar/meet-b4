"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filter";
import { DataPaginiation } from "../components/data-pagination";

export const AgentsView = () => {
    const [filters, setFilters] = useAgentsFilters()

    const trpc = useTRPC();

    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }));

    return (
        <div className="flex-1 px-4 pb-4 md:px-8 flex flex-col gap-y-4">
            <DataTable columns={columns} data={data.items} />
            <DataPaginiation
                page={filters.page}
                totalPages={data.tatalPages}
                onPageChange={ (page) => setFilters({ page }) }
            />
            {data.items.length == 0 && (
                <EmptyState
                    title="Create Your first Agent"
                    description="Create an agent to join your meeting. Each agent will follow your instruction
                    and can interact and participate during the call"
                />
            )}
        </div>
    )
}

export const AgentsViewLoading = () => {
    return (
        <LoadingState title="Loading Agents" description="This may take a few seconds..." />
    )
}

export const AgentsViewError = () => {
    return (
        <ErrorState title="Failed to load agents" description="Please try again later" />
    )
}