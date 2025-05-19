
import { PieChart, Pie, Tooltip, Legend, Cell} from "recharts";
import type { ReviewFormat } from "@/lib/reviewFormatSchema";


export default function IssuesPieChart({ reviews} : { reviews: ReviewFormat}) {
    console.log("reviews", reviews);
    const PieData = [
        { name: "完了", value: reviews.summary.statusBreakdown.done },
        { name: "進行中", value: reviews.summary.statusBreakdown.inProgress },
        { name: "未着手", value: reviews.summary.statusBreakdown.toDo },
    ]


    return (
        <div className="flex justify-center">
        <PieChart  width={400} height={400}>
            <Pie data={PieData} cx={200} cy={200} fill="#8884d8" dataKey="value" >
                {PieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#FFBB28"][index]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
        </div>
    )
}