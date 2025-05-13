import ReactMarkdown from 'react-markdown';
import React from 'react-markdown';

type Props = {
    content: string;
}

export const MarkDownMessage = ({ content} : Props) => {
    console.log("content", content);
    const contentCovertedToMarkdown = content.replace(/\\n/g, "\n");
    return (
        <div className="prose prose-invert max-w-none text-white">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
  
    )
}