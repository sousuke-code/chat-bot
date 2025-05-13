import { NextResponse } from "next/server";
import { jira } from "@/lib/jiraClient";
import { openAi } from "../openAI/route";
import { formatIssuesForReview } from "@/lib/formatJiraIssues";
import type { ChatCompletionMessageParam } from "openai/resources.mjs";

export async function GET() {
  try {
    const response =
      await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearch({
        jql: "project = KIK AND sprint in openSprints()",
        fields: ["key", "summary", "status", "assignee", "created", "updated"],
      });
    if (!response.issues) {
      return NextResponse.json(
        {
          error: "No issues found",
        },
        { status: 404 }
      );
    }

    const formatted = formatIssuesForReview(response.issues);

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `あなたはソフトウェア開発チームのプロジェクトマネージャーです。

以下はJiraから取得したスプリント中の課題リストです。各課題の担当者、ステータス、内容を考慮して、次の観点でレビューを作成してください。

1. チケットの総数、進捗ステータス（完了、進行中、未着手）の件数と割合
2. 特定の担当者にタスクが偏っていないか、未アサインのチケットが放置されていないか
3. 作成日や更新日時が古いのに進んでいないチケットはないか
4. 完了済みのチケットが多すぎる/少なすぎるなど、作業バランスの偏りがないか
5. 次のアクションとして推奨されるチーム内調整

出力は日本語で、事実に基づいた客観的かつ詳細なレビュー文にしてください。`,
      },
      {
        role: "system",
        content: `以下のJiraの課題をレビューしてください。${formatted}`,
      },
    ];

    const chat = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    return NextResponse.json({ review: chat.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching issues from Jira", error);
    return NextResponse.json(
      {
        error: "Failed to fetch issues from Jira",
      },
      { status: 500 }
    );
  }
}
