"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MarkDownMessage } from "@/components/chat/MarkDownMessage";

export default function ReviewPage() {
    const [review, setReview] = useState<string>("");
    const handleReview = async () => {

        const res = await fetch("/api/review")
        const data = await res.json();
        console.log(data);
        console.log("data", data.review);
        setReview(data.review);
    }

    return (
        <>
         <Button onClick={handleReview}>レビューをする</Button>
         { review && (
            <div className="flex items-start justify-start space-x-2">
                <div className="p-2 rounded-lg text-white">
                    <MarkDownMessage content={review} />
                </div>
            </div>
         )}
        </>


    )
}