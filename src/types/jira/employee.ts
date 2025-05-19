import { z } from "zod";

export const Employee = z.object({
    assignee: z.string(),

})

export const EmployeeSchema = z.object({
    assignee: z.string(),
    totalTickets: z.number(),
    done: z.number(),
    inProgress: z.number(),
    toDo: z.number(),
})

export type EmployeeFormat = z.infer<typeof EmployeeSchema>