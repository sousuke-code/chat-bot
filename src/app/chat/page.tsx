"use client";
import TextBox from "@/components/chat/TextBox";
import { useChatStore } from "@/store/ChatStore";
import { MarkDownMessage } from "@/components/chat/MarkDownMessage";

export default function ChatPage() {
  const { messages, chatLogs } = useChatStore();
  return (
    <>
      <div className="p-10">
        

        {chatLogs &&
          chatLogs.map((chatLog, index) =>
            chatLog.role === "user" ? (
              <div className="flex items-end justify-end space-x-2">
                <div className="p-2 rounded-lg bg-secondary text-white">
                  <p key={index}> {chatLog.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-start space-x-2">
                <div className="p-2 rounded-lg text-white">
                  <MarkDownMessage key={index} content={chatLog.content} />
                </div>
              </div>
            )
          )}
        <TextBox />
      </div>
    </>
  );
}
