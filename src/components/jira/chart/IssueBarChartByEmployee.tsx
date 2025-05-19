import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend } from "recharts";
import type { EmployeeFormat } from "@/types/jira/employee";

export default function IssueBarChartByEmployee({
  employee,
}: {
  employee: EmployeeFormat;
}) {
  const BarData = [
    { name: "完了", value: employee.done },
    { name: "進行中", value: employee.inProgress },
    { name: "未着手", value: employee.toDo },
  ];

  return (
    <>
      <BarChart data={BarData} width={400} height={400}>
        <XAxis dataKey="name" />
        <YAxis />

        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </>
  );
}
