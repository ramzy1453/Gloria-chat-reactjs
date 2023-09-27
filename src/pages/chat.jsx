import React from "react";
import ChatSidebar from "../components/ChatApp/Chat/ChatSidebar";
import ChatMessages from "../components/ChatApp/Chat/ChatMessages";
import ChatPannel from "../components/ChatApp/Chat/ChatPannel";

export default function Chat() {
  return (
    <div className="px-10 py-8 h-screen bg-gradient">
      <div className="flex rounded-lg bg-slate-600 overflow-hidden h-full shadow-2xl">
        <div className="bg-black py-4 px-2">
          <ChatPannel />
        </div>
        <div className="message-card flex flex-col flex-[1]">
          <ChatSidebar />
        </div>
        <div className="messages-container flex-[3] flex flex-col">
          <ChatMessages />
        </div>
      </div>
    </div>
  );
}
