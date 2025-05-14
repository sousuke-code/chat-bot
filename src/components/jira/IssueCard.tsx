import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { ReviewFormat } from "@/lib/reviewFormatSchema";
import { reviewFormatSchema } from "@/lib/reviewFormatSchema";

export default function IssueCard({ review } : { review : ReviewFormat}) {

    
    console.log("review/summary", review.summary);
    console.log("review/summary/breakdown", review.summary.statusBreakdown);

    return (
  <Card>
    <CardHeader>
      <CardTitle>チケットの進捗度</CardTitle>
    </CardHeader>
    <CardContent>
      <div>
          <p>完了タスク数:{review.summary.statusBreakdown.done}</p>
      </div>

      <div>
         <p>進行中タスク数:{review.summary.statusBreakdown.inProgress}</p>
      </div>

      <div>
        <p>未着手タスク数:{review.summary.statusBreakdown.toDo}</p>
      </div>
    </CardContent>
  </Card>
    )
}
