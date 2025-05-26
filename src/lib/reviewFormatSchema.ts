import { z } from "zod"
export const reviewFormatSchema = z.object({
    summary: z.object({
        totalTickets: z.number().describe("チケットの総数"),
        statusBreakdown: z.object({
            "done": z.number(),
            "inProgress": z.number(),
            "toDo": z.number(),
        }),
        completionRate: z.number(),
    }),
    byAssignee: z.array(
        z.object({
            assignee: z.string(),
            totalTickets: z.number(),
            done: z.number(),
            inProgress: z.number(),
            toDo: z.number(),
        })
    ),
    suggestions: z.array(z.string().describe(`
        スプリント全体に対する日本語の総評文を記述してください。
        Markdown形式で出力し、以下の要素を必ず含めてください：

        - 各担当者のチケット消化率（完了数 / 担当チケット総数）を明記
        - 未アサインチケットの割合とリスク
        - 完了チケットの割合が特に高い・低い担当者の傾向分析
        - 古いチケットの有無とそのリスク
        - 作業の偏りやバランスについての評価
        - チーム全体の進捗に関する総合的な所見

        できる限り客観的に、事実に基づいた表現を使用し、改善点があれば明記してください。
`)),
})

export type ReviewFormat = z.infer<typeof reviewFormatSchema> 
