import {z}from "zod"
export const agentsInsertionSchema =z.object({
    name: z.string().min(1,{message: "Name is required "}),
    instructions: z.string().min(1,{message: "instructions are required "})
})
export const agentUpdateSchema= agentsInsertionSchema.extend({
    id: z.string().min(1,{message: "Id is required"})
});