"use client";

import { Companion } from "@prisma/client";
import { ExpertChatMessageProps, ExpertChatMessage } from "@/components/expert-chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ExpertChatMessagesProps {
    messages: ExpertChatMessageProps[];
    isLoading: boolean;
    expert: Companion;
};

export const ExpertChatMessages = ({
    messages = [],
    isLoading,
    expert
}: ExpertChatMessagesProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null);

    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true: false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);

        return () => {
             clearTimeout(timeout); 
            }
    }, []);

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({behavior: "smooth"})
    }, [messages.length])

    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <ExpertChatMessage
                isLoading={fakeLoading}
                src={expert.src}
                role="system"
                content={`Hello, I am ${expert.name}, ${expert.description}`}
            />
            {messages.map((message) => (
                <ExpertChatMessage
                    key={message.content}
                    role={message.role}
                    content={message.content}
                    src={expert.src}
                />
            ))}

            {
                isLoading && (
                    <ExpertChatMessage 
                        role="system"
                        src={expert.src}
                        isLoading
                    />
                )
            }
            <div ref={scrollRef} />
        </div>
    )
}