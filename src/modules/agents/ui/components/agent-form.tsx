import { useTRPC } from "@/trpc/client"
import { AgentGetOne } from "../../types"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { agentInsertSchema } from "../../schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { GeneratedAvatar } from "@/components/generated-avatar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Props {
    onSuccess?: () => void
    onCancel?: () => void
    initialValues?: AgentGetOne
}

export const AgentForm = ({
    initialValues,
    onSuccess,
    onCancel
}: Props) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const router = useRouter();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                );

                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id })
                    )
                }

                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);

                // TODO Check if error code is "FORBIDDEN", redirect to "/upgrade"
            }
        })
    )

    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? ""
        }
    })

    const isEdit = !!initialValues?.id
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        if (isEdit) {
            console.log("TODO: update agent")
        } else {
            createAgent.mutate(values);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <GeneratedAvatar
                    seed={form.watch("name")}
                    varient="botttsNeutral"
                    className="border size-16"
                />

                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="e.g. Math tutor" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="instructions"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Instructions
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="You are a helpful math assistant tat can answer questions and help with assigments"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-between gap-x-2    ">
                    {onCancel && (
                        <Button
                            variant="ghost"
                            disabled={isPending}
                            type="button"
                            onClick={() => onCancel()}
                        >
                            Cancle
                        </Button>
                    )}

                    <Button
                        disabled={isPending}
                        type="submit"
                    >
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}