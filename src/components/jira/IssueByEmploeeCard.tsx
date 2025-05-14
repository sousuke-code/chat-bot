import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../ui/card";
import type { ReviewFormat } from "@/lib/reviewFormatSchema";
import { z } from "zod";

const Employee = z.object({
  assignee: z.string(),
  totalTickets: z.number(),
  done: z.number(),
  inProgress: z.number(),
  toDo: z.number(),
});

export type EmployeeType = z.infer<typeof Employee>;

export default function IssueByEmployeeCard({
  employee,
}: {
  employee: EmployeeType;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>従業員別のチケット状況</CardTitle>
      </CardHeader>
      <CardContent>
        <p>従業員名{employee.assignee}</p>
        <p>チケット総数:{employee.totalTickets}</p>
        <p>完了したチケット数:{employee.done}</p>
        <p>進行中のチケット数:{employee.inProgress}</p>
        <p>完了したチケット数:{employee.toDo}</p>
      </CardContent>
    </Card>
  );
}
