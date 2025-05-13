import OpenAI from "openai";
import { NextResponse, NextRequest } from "next/server";


export const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    
    try {
        const { messages } = await req.json();

        const systemPrompt = {
            role: "system",
            content: `あなたはMarkdown形式で出力するAIアシスタントです。
          以下の点に従ってMarkdownを使用してください：
          
          - タイトルは \`##\` を使ってください。
          - リストは \`- \` または \`1. \` を使用してください。
          - 重要な単語は \`**太字**\` にしてください。
          - コードブロックは \`\`\`言語名 で囲ってください。
          - 説明とコード例は明確に区切ってください。
          - 表が必要な場合は Markdown テーブルを使ってください。
          - 見出しの下に1行空けてください。
          `
          }


        const response = await openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                systemPrompt,
                ...messages
            ]
        })

        return NextResponse.json({
            message: response.choices[0].message,
        })
    }
    catch (error) {
        console.log("Error in OpenAI API:", error);
        return NextResponse.json({
            error: "Failed to fetch response from OpenAI",
        }, { status: 500 });
    }
}