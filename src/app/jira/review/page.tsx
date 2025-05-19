"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ReviewFormat } from "@/lib/reviewFormatSchema";
import IssuesPieChart from "@/components/jira/chart/IssuesPieChart";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import EmployeeTabs from "@/components/jira/EmployeeTab";

export default function ReviewPage() {
  const [review, setReview] = useState<ReviewFormat>();
  const handleReview = async () => {
    const res = await fetch("/api/review");
    const data = await res.json();
    setReview(JSON.parse(data.review));
  };

  return (
    <>
      <Button onClick={handleReview}>レビューをする</Button>

      {review && (
        <div className="m-10">
          <div className="grid grid-cols-2 grid-rows-3 gap-4">
            <Card className="col-span-1 row-span-2">
              <CardHeader>
                <CardTitle>チケットの進捗度合い</CardTitle>
              </CardHeader>
              <CardContent>
                <IssuesPieChart reviews={review} />
              </CardContent>
            </Card>

            <Card className="col-span-2 row-span-2">
              <CardHeader>
                <CardTitle>担当別チケット数</CardTitle>
                <CardContent>
                  <EmployeeTabs employees={review.byAssignee} />
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="col-span-3 row-span-3">
              <CardHeader>
                <CardTitle>総評</CardTitle>
                <CardContent>
                  {review.suggestions.map((summary) => (
                    <>
                      <p>{summary}</p>
                    </>
                  ))}
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
