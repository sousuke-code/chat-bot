import React from "react";


export default function ChatLayout({
    children,
} : Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-screen bg-primary">
            <div className="flex-1 overflow-y-auto p-10">
                {children}
            </div>
        </div>
    )
}