import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "../../hooks/use-agents-filter"
import { SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export const AgentsSearchFilter = () => {
    const [filter, setFilter] = useAgentsFilters();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key == "/" && (e.metaKey || e.ctrlKey)) {
                if (inputRef.current) inputRef.current.focus();
            }
        }

        document.addEventListener("keydown", down);

        return () => removeEventListener("keydown", down);
    }, [])

    return (
        <div className="relative">
            <Input
                value={filter.search}
                onChange={(e) => setFilter({ search: e.target.value })}
                placeholder="Filter by name"
                ref={inputRef}
                className="h-9 bg-white w-[200px] pl-7"
            />
            <SearchIcon className="size-4 absolute left-4 top-1/2 -translate-1/2 text-muted-foreground" />
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground absolute right-2 top-1/4">
                <span className="text-sm">&#8984;</span>/
            </kbd>
        </div>
    )
}