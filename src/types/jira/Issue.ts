import { z } from "zod";

const IssuesByAssginee = z.array(
    z.object({
        assignee: z.string(),
        totalTickets: z.number(),
        done: z.number(),
        inProgress: z.number(),
        toDo: z.number(),
        summary: z.string(),
        completionRate: z.number(),
        risk: z.string(),
    })
)

export type IssuesByAssigneeType = z.infer<typeof IssuesByAssginee>