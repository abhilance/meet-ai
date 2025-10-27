import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import { AgentsGetOne } from "../../type";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agentsInsertionSchema } from "../../schema";
import { useForm } from "react-hook-form";


import { GeneratedAvatar } from "@/components/generated-avatar";
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

interface AgentFormProps {
    onSucess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentsGetOne
}

export const AgentForm = ({
    onSucess,
    onCancel,
    initialValues,
}: AgentFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    const createAgents = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async() => {
                 await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                )
                if(initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id: initialValues.id}),
                    )
                }
                onSucess?.();
            },
            onError: (error) => {
                toast.error(error.message)
            },
        })
    );
    const form = useForm<z.infer<typeof agentsInsertionSchema>>
     ({resolver: zodResolver(agentsInsertionSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        }
    })
    const isEdit = !!initialValues?.id;
    const isPending = createAgents.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertionSchema>) => {
        if (isEdit) {
            console.log("todo: update agents")
        } else {
            createAgents.mutate(values);
        }
    }
    return (

        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar
                    seed={form.watch("name")}
                    variant="botttsNeutral"
                    className="border size-16"
                />
                
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl><Input{...field} placeholder="e.g. Math Tutor"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="instructions"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl><textarea {...field} placeholder="you are a helpful math assitant that can answer maths questions" /></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-x-2">
                    {
                        onCancel&& (
                            <Button variant="ghost"
                                disabled={isPending
                                }
                                type="button"
                                onClick={()=>onCancel()}>
                                    Cancel
                            </Button>
                        )
                    }
                    <Button disabled={isPending} type="submit">
                        {isEdit? "Update": "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    )

}