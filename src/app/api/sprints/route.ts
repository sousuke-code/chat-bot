import { NextResponse } from "next/server";
import { jiraConnectorClient } from "@/lib/jiraClient";

const BOARD = 107;

export async function GET(){
    try {
        const res = await jiraConnectorClient.board.getAllSprints({ boardId: BOARD});
        const sprint = res.values.map((sprint: any) => ({
            id: sprint.id,
            name: sprint.name,
        }))

        return NextResponse.json(sprint)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: "Failed to fetch issues from jira",
        }, { status: 500 })
    }
}