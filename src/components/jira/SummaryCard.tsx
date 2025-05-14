import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { ReviewFormat } from "@/lib/reviewFormatSchema";
import type { z } from "zod";


export default function SummaryCard({review} : { review: ReviewFormat}){
    return (
        <Card>
            <CardHeader>
                <CardTitle>総評</CardTitle>
            </CardHeader>
            <CardContent>
                { review.suggestions.map((summary) => (
                    <>
                     <p>{summary}</p>
                    </>
                    
                ))}
            </CardContent>
        </Card>
    )
}