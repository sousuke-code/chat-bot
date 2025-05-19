
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { IssuesByAssigneeType } from "@/types/jira/Issue";
import IssueBarChartByEmployee from "./chart/IssueBarChartByEmployee";
import type { EmployeeFormat } from "@/types/jira/employee";



export default function EmployeeTabs(employees: {
  employees: IssuesByAssigneeType;
}) {

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeFormat>();


  const handleSelect = (employee: EmployeeFormat) => {
    setSelectedEmployee(employee);
  }

  

  return (
    <>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="bg-white shadow text-balck hover:bg-gray-200 font-bol">{ selectedEmployee ? selectedEmployee.assignee : "従業員を選択する"}</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
            { employees.employees.map((employee) => (
                <DropdownMenuItem onClick={() => handleSelect(employee)}>{employee.assignee}</DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>

    <div className="mt-2">
        {selectedEmployee && (
            <IssueBarChartByEmployee employee={selectedEmployee}/>
        )}
    </div>
    </>
  )
}
