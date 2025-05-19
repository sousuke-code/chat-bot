import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../ui/card";
import type { EmployeeFormat } from "@/types/jira/employee";

export default function IssueByEmployeeCard({
  employee,
}: {
  employee: EmployeeFormat;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{employee.assignee}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>チケット総数:{employee.totalTickets}</p>
        <p>完了したチケット数:{employee.done}</p>
        <p>進行中のチケット数:{employee.inProgress}</p>
        <p>完了したチケット数:{employee.toDo}</p>
      </CardContent>
    </Card>
  );
}
