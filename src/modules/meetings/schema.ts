import {z}from "zod"
export const meetingsInsertionSchema =z.object({
    name: z.string().min(1,{message: "Name is required "}),
      agentId: z.string().min(1,{message: "Agent are required"})
})
export const meetingsUpdateSchema= meetingsInsertionSchema.extend({
    id: z.string().min(1,{message: "Id is required"})
});