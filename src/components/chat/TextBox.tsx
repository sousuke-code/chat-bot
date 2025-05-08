import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { TbSend2 } from "react-icons/tb";
import { useChatStore } from "@/store/ChatStore";


export default function TextBox() {
    const [input, setInput] = useState("");
    

    const handleChange = async () => {
        const { addMessage, setLoading, addChatLog, chatLogs} = useChatStore.getState();


        const res = await fetch("/api/openAI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    ...chatLogs,
                    { role: "user", content: input }
                ]
            })
        })
        const data = await res.json();
        addChatLog({ content: input, role: "user" });
        addChatLog({ content: data.message.content, role: "assistant" });

        setInput("");
    }

    return (
        <div className="relative">
             <Textarea placeholder="send a message..." className="pr-1 bg-secondary border-none text-white" value={input} onChange={(e) => setInput(e.target.value)}/>
             <TbSend2 size={27} className="absolute right-2 bottom-2 cursor-pointer" color="white" onClick={handleChange}/>
        </div>
    )
}