"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MarkDownMessage } from "@/components/chat/MarkDownMessage";
import type { ReviewFormat } from "@/lib/reviewFormatSchema";
import IssueCard from "@/components/jira/IssueCard";
import IssueByEmployeeCard from "@/components/jira/IssueByEmploeeCard";
import SummaryCard from "@/components/jira/SummaryCard";


export default function ReviewPage() {
    const [review, setReview] = useState<ReviewFormat>();
    const handleReview = async () => {
        const res = await fetch("/api/review")
        const data = await res.json();
        console.log(data);
        console.log("data", data.review);
        setReview(JSON.parse(data.review));
    }

    return (
        <>
         <Button onClick={handleReview}>レビューをする</Button>
         
         { review && (
            <div className="grid grid-cols-3 gap-2">
                <IssueCard review={review} />
                {/* <IssueByEmployeeCard review={review} /> */}
                {review.byAssignee.map((assignee) => (
                    <IssueByEmployeeCard key={assignee.assignee}  employee={assignee} />
                ))}

                <SummaryCard review={ review } />
            </div>
         )}
        </>


    )
}