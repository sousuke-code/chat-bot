import OpenAI from "openai";
import { NextResponse, NextRequest } from "next/server";


const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    
    try {
        const { messages } = await req.json();

        const respomse = await openAi.chat.completions.create({
            messages,
            model: "gpt-3.5-turbo",
        })

        return NextResponse.json({
            message: respomse.choices[0].message,
        })
    }
    catch (error) {
        console.log("Error in OpenAI API:", error);
        return NextResponse.json({
            error: "Failed to fetch response from OpenAI",
        }, { status: 500 });
    }
}