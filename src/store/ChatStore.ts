import { create } from "zustand";

export type Message = {
    role: "user" | "assistant";
    content: string; 
}

type ChatStore = {
    messages: Message[];
    chatLogs: Message[];
    loading: boolean;
    error?: string;
    addMessage: (message: Message) => void;
    setLoading: (loading: boolean) => void;
    addChatLog: (chatLog : Message) => void;
    setError: (error: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    chatLogs: [],
    loading: false,
    error : undefined,
    addMessage: (message) => set((state) => ({ messages: [ ...state.messages, message ]})),
    addChatLog: (chatLog) => set((state) => ({ chatLogs: [...state.chatLogs, chatLog ]})),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error}),     
}))