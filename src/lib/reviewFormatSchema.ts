import { z } from "zod"
export const reviewFormatSchema = z.object({
    summary: z.object({
        totalTickets: z.number().describe("チケットの総数"),
        statusBreakdown: z.object({
            "done": z.number(),
            "inProgress": z.number(),
            "toDo": z.number(),
        }),
        completionRate: z.number(),
    }),
    byAssignee: z.array(
        z.object({
            assignee: z.string(),
            totalTickets: z.number(),
            done: z.number(),
            inProgress: z.number(),
            toDo: z.number(),
        })
    ),
    suggestions: z.array(z.string().describe("チケット情報から考えられる次の行動")),
})

export type ReviewFormat = z.infer<typeof reviewFormatSchema> 
