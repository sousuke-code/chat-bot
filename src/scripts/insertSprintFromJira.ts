import { jiraConnectorClient } from "../lib/jiraClient";
import { jira } from "../lib/jiraClient";
import { PrismaClient} from "../generated/prisma";


const prisma = new PrismaClient();

async function  main() {
    const boardId = 107; 

    const sprints = await jiraConnectorClient.board.getAllSprints({ boardId: boardId });

    for (const sprint of sprints.values) {
        const res = await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearch({
            jql: `sprint = ${sprint.id}`,
            fields: ["status", "assignee", "updated" ]
        })


        const issues = res.issues ?? [];

        const done = issues.filter(issue => issue.fields.status.name === "Done").length;

        const ticketCount = issues.length;
        const unassignedCount = issues.filter(issue => issue.fields.status.name === "To Do" && !issue.fields.assignee).length;
        const completionRate = ticketCount ? done / ticketCount * 100 : 0;

        const assigneeMap = new Map<
         string,
         { done: number; inProgress: number; toDo: number }
        >();

        console.log(`チケット総数: ${ticketCount}`);
        console.log(`未割り当てチケット数: ${unassignedCount}`);
        console.log(`完了率: ${completionRate.toFixed(2)}%`);
        for (const issue of issues) {
            const name = issue.fields.assignee?.displayName || "未割り当て";
            
            const status = issue.fields?.status?.statusCategory?.name ?? "未割り当て";

            console.log(`担当者：${name} status`, status)

            if(!assigneeMap.has(name)) {
                assigneeMap.set(name, { done: 0, inProgress: 0, toDo: 0 });
            }

            const stats = assigneeMap.get(name)!;
            if ( status === "完了") stats.done++;
            else if (status === "進行中") stats.inProgress++;
            else if (status === "To Do") stats.toDo++;
        }

        await prisma.sprint.create({
            data: {
                name: sprint.name,
                startDate: sprint.startDate,
                endDate: sprint.endDate,
                completionRate,
                ticketCount,
                stagnantCount: 0,
                unassignedCount,
                assignedCount: {
                   create: Array.from(assigneeMap.entries()).map(([name, stat]) => ({
                       name,
                       ...stat,
                   }))
                }
            }
        })
        

    }

    console.log("sprints", sprints);
}

main()
    .then(() => {
        console.log("Script executed successfully");
    })
    .catch((error) => {
        console.error("Error executing script:", error);
    })