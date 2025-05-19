import { z } from "zod";

const IssuesByAssginee = z.array(
    z.object({
        assignee: z.string(),
        totalTickets: z.number(),
        done: z.number(),
        inProgress: z.number(),
        toDo: z.number(),
    })
)

export type IssuesByAssigneeType = z.infer<typeof IssuesByAssginee>