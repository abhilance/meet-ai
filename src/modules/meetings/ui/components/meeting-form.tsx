import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import { MeetingsGetOne } from "../../type";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { meetingsInsertionSchema } from "../../schema";
import { useForm } from "react-hook-form";



import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentsDialog } from "@/modules/agents/ui/components/new-agents-dialog";

interface MeetingFormProps {
    onSucess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingsGetOne
}

export const MeetingForm = ({
    onSucess,
    onCancel,
    initialValues,
}: MeetingFormProps) => {

    const [agentSearch, setAgentsearch] = useState("")
    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false)
    const trpc = useTRPC();
    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch
        })
    )
    const router = useRouter();
    const queryClient = useQueryClient();
    const createMeetings = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                )

                onSucess?.(data.id);
            },
            onError: (error) => {
                toast.error(error.message)
            },
        })
    );
    const UpdateMeetings = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                )
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id }),
                    )
                }
                onSucess?.();
            },
            onError: (error) => {
                toast.error(error.message)
            },
        })
    );
    const form = useForm<z.infer<typeof meetingsInsertionSchema>>
        ({
            resolver: zodResolver(meetingsInsertionSchema),
            defaultValues: {
                name: initialValues?.name ?? "",
                agentId: initialValues?.agentId ?? "",
            }
        })
    const isEdit = !!initialValues?.id;
    const isPending = createMeetings.isPending || UpdateMeetings.isPending;

    const onSubmit = (values: z.infer<typeof meetingsInsertionSchema>) => {
        if (isEdit) {
            UpdateMeetings.mutate({ ...values, id: initialValues.id })
        } else {
            createMeetings.mutate(values);
        }
    }
    return (

       <>
       <NewAgentsDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog}/>
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>

                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl><Input{...field} placeholder="e.g. Math Consultations" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                

                        <FormField
                            name="agentId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Agent</FormLabel>
                                    <FormControl>
                                        <CommandSelect
                                            options={(agents.data?.items ?? []).map((agent) => ({
                                                id: agent.id,
                                                value: agent.id,
                                                children: (
                                                    <div className="flex items-center gap-x-2">
                                                        <GeneratedAvatar

                                                            seed={agent.name}
                                                            variant="botttsNeutral"
                                                            className="border size-6"
                                                        />
                                                        <span>{agent.name}</span>

                                                    </div>

                                                )
                                            }))}
                                            onSelect={field.onChange}
                                            onSearch={setAgentsearch}
                                            value={field.value}
                                            placeholder="Select an agent"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Not found what you&apos;re looking for?{" "}
                                        <button
                                        type="button"
                                        className="text-primary hover:underline"
                                        onClick={()=>setOpenNewAgentDialog(true)}
                                        >
                                          Create new agent
                                        </button>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between gap-x-2">
                            {
                                onCancel && (
                                    <Button variant="ghost"
                                        disabled={isPending
                                        }
                                        type="button"
                                        onClick={() => onCancel()}>
                                        Cancel
                                    </Button>
                                )
                            }
                            <Button disabled={isPending} type="submit">
                                {isEdit ? "Update" : "Create"}
                            </Button>
                        </div>
                    </form>
                </Form>

                            </>
                )

}