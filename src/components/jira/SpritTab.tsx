import { useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type Sprint = {
    id: number,
    name: string,
}

export default function SprintTab({ sprints, setReview,setRoading } : { sprints: Sprint[] , setReview: (review: any) => void, setRoading: (loading:boolean) => void }) { 
    const [selectedSprint, setSelectedSprint] = useState<Sprint>();

    const handleSelect = async (sprint: Sprint) => {
        setSelectedSprint(sprint);
        setRoading(true);
        const res = await fetch(`/api/review/${sprint.id}`);
        const data = await res.json();
        setReview(JSON.parse(data.review));
        setRoading(false);
    }
    
    return (
        <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-white text-black hover:bg-gray-200 font-bold">
                    { selectedSprint ? selectedSprint.name: "スプリントを選択する"}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                { sprints.slice().reverse().map((sprint) => (
                    <DropdownMenuItem onClick={() => handleSelect(sprint)}>{sprint.name}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
         </DropdownMenu>
        </>
    )

}