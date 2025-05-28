import { NextResponse } from "next/server";
import { jira } from "@/lib/jiraClient";

export async function GET() {
  try { 


    const issues = await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearch({
      jql:"project = KIK AND sprint in closedSprints()",
      fields: ["key", "summary", "status", "asignee", "created", "updated"],
    });

    return NextResponse.json(issues);
  } catch (error){
    console.error("Error fetching issues from Jira",  error);
    return NextResponse.json({
        error: "Failed to fetch issues from Jira",
    }, { status: 500 });
  }
}