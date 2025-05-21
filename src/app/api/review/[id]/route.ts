import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jira } from "@/lib/jiraClient";
import { formatIssuesForReview } from "@/lib/formatJiraIssues";
import type { ChatCompletionMessageParam } from "openai/resources.mjs";
import { openAi } from "../../openAI/route";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { reviewFormatSchema } from "@/lib/reviewFormatSchema";


export async function GET(req: NextRequest, { params} : { params: Promise<{id : number}>} ){
    const { id } = await params;

    try{
        const res = await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearch({
            jql: `projehct = KIK and id = ${id}`,
            fields: ["key", "summary", "status", "assignee", "created", "updated"],
        });

        if (!res.issues) {
            return NextResponse.json(
                {
                    error: "No issues found", 
                },
                {status: 404}
            )
        }

        const formatted = formatIssuesForReview(res.issues);

        const messages: ChatCompletionMessageParam[] = [
              {
                role: "system",
                content: `あなたはソフトウェア開発チームのプロジェクトマネージャーです。
                以下はJiraから取得したスプリント中の課題リストです。各課題の担当者、ステータス、内容を考慮して、次の観点でレビューを作成してください。
                1. チケットの総数、進捗ステータス（完了、進行中、未着手）の件数と割合
                2. 担当者ごとのチケット数と進捗状況
                3. 特定の担当者にタスクが偏っていないか、未アサインのチケットが放置されていないか
                4. 作成日や更新日時が古いのに進んでいないチケットはないか
                5. 完了済みのチケットが多すぎる/少なすぎるなど、作業バランスの偏りがないか
                6. 次のアクションとして推奨されるチーム内調整
                出力は日本語で行い、Markdown形式で見出し・リスト・表などを使って整形してください。また、事実に基づいた客観的かつ詳細なレビュー文にしてください。`,
              },
              {
                role: "user",
                content: `以下のJiraの課題をレビューしてください。${formatted}`,
              },
            ];

            const chat = await openAi.chat.completions.create({
                  model: "gpt-4.1",
                  messages: messages,
                  response_format: zodResponseFormat(reviewFormatSchema, "review"),
                });

                return NextResponse.json({ review: chat.choices[0].message.content });
    } catch (error ){
        return NextResponse.json({
            error: "Failed to fetch issues from Jira",
        },
        { status: 500 }
    )
    }

}