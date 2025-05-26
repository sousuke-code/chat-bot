import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jira } from "@/lib/jiraClient";
import { formatIssuesForReview } from "@/lib/formatJiraIssues";
import type { ChatCompletionMessageParam } from "openai/resources.mjs";

import { openAi, POST } from "../../openAI/route";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { zodToJsonSchema } from "zod-to-json-schema";
import { reviewFormatSchema } from "@/lib/reviewFormatSchema";
import { format } from "path";
import { Schema } from "zod";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const res = await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearch({
      jql: `project = KIK and sprint = ${id}`,
      fields: ["key", "summary", "status", "assignee", "created", "updated"],
    });

    if (!res.issues) {
      return NextResponse.json(
        {
          error: "No issues found",
        },
        { status: 404 }
      );
    }

    const formatted = formatIssuesForReview(res.issues);

    console.log("formatted---", formatted);

    // const chat = await fetch("https://api.openai.com/v1/responses ", {
    //     method: "POST",
    //     headers: {
    //         "Content-type": "application/json",
    //         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //         model: "gpt-4.1",
    //         input: messages,
    //         text: zodResponseFormat(reviewFormatSchema, "review"),

    //     })
    // })

    console.log("----OPENAIの呼び出し開始----");

    const chat = await openAi.responses.create({
      model: "gpt-4o",
      // input: JSON.stringify(messages),
      // text: {
      //     format: {
      //         type: "json_schema",
      //         name: "review",
      //         schema: zodResponseFormat(reviewFormatSchema, "review"),
      //     }
      // }
      instructions: `
              あなたはソフトウェア開発チームのプロジェクトマネージャーです。
              以下はJiraから取得したスプリント中の課題リストです。
              各課題の担当者、ステータス、内容を考慮して、次の観点で構造化されたレビューをJSON形式で出力してください：
              ...
              最後に reviewText に、これらの情報に基づいた客観的かつ詳細な日本語の総評（Markdown形式）を記述してください。
`,
      input: [
        {
          role: "user",
          content: `以下のJiraの課題をレビューしてください。\n\n 今回のスプリント:${formatted}`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "review",
          schema: zodToJsonSchema(reviewFormatSchema),
        },
      },
    });

    console.log("----OPENAIの呼び出し終了----");
    console.log("chat", chat);

    if (chat.error) {
      const error = chat.error.message;
      console.log("OpenAI error", error);

      return NextResponse.json(
        { error: "Failes to fetch respose OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ review: chat.output_text });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        error: "Failed to fetch issues from Jira",
      },
      { status: 500 }
    );
  }
}
