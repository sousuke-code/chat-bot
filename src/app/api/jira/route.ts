import { NextResponse } from "next/server";
import { jira } from "@/lib/jiraClient";
import { headers } from "next/headers";
import { jiraConnectorClient } from "@/lib/jiraClient";

const BOARD = 107;

export async function GET(){
    try {
        const res = await jiraConnectorClient.board.getAllSprints({ boardId: BOARD});
        
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({
            error: "Failed to fetch issues from jira",
        }, { status: 500 })
    }
}