"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ReviewFormat } from "@/lib/reviewFormatSchema";
import IssuesPieChart from "@/components/jira/chart/IssuesPieChart";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import EmployeeTabs from "@/components/jira/EmployeeTab";
import SprintTab from "@/components/jira/SpritTab";
import { Spinner }  from "@heroui/spinner/";
import { Loader } from "lucide-react";
import { MarkDownMessage } from "@/components/chat/MarkDownMessage";


type Sprint =  {
    id: number;
    name: string;
}

export default function ReviewPage() {
  const [review, setReview] = useState<ReviewFormat>();
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [selectedSprint, setSelectedSprint] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    const res = await fetch("/api/review");
    const data = await res.json();
    setReview(JSON.parse(data.review));
  };

  useEffect(() => {
    const fetchSprints = async () => {
        const res = await fetch("/api/sprints");
        const data = await res.json();
        setSprints(data);
    };
    fetchSprints();
  }, []);



  return (
    <>
      <SprintTab sprints={sprints} setReview={setReview} setRoading={setLoading} />
      
      {review && loading == false && (
        <div className="m-10 h-full">
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
                  <MarkDownMessage content={review.suggestions.map( s => `- ${s}`).join("\n") }/>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      )}

        {loading && 
        <div className="flex justify-center items-center h-screen">
            <Loader size="150" className="animate-spin"/>
        </div> 
        }
    </>
  );
}
