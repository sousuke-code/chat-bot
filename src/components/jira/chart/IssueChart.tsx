
import { PureComponent } from "react";
import { LineChart, Line, CartesianGrid,XAxis, YAxis, Tooltip, Legend, BarChart, ResponsiveContainer, Bar, LabelList} from "recharts";
import type { IssuesByAssigneeType } from "@/types/jira/Issue";

export default function IssueChart({issues} : {issues : IssuesByAssigneeType})  {
       console.log("issues", issues);
        return (
            <>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart width={730} height={250} data={issues}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis
                   tick={{ fontSize: 8 }}
                   dataKey="assignee"
                />
                <YAxis />
                <Bar dataKey="done" stackId="a" fill="#8884d8" >
                  <Tooltip />      
                </Bar>
                <Bar dataKey="inProgress" stackId="a" fill="#82ca9d">
                    <Tooltip />
                </Bar>
                <Bar dataKey="toDo" stackId="a" fill="#FFBB28">
                    <Tooltip />
                </Bar>
            
                <Legend />
            </BarChart>         
            </ResponsiveContainer>
            </>
        )
}



