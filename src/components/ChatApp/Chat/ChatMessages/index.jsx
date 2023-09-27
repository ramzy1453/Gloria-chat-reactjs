import React, { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import WriteMessage from "./WriteMessage";
import HeaderMessage from "./HeaderMessage";
import api from "../../../../store/api";
import { useAuth, useRoom } from "../../../../hooks";
import websocket from "../../../../utils/socket.io";

export default function ChatMessages() {
  const { actualRoom, setActualRoom, removeActualRoom } = useRoom();
  const messagesContainerRef = useRef();
  const {
    data: messages,
    isLoading,
    error,
    refetch,
  } = api.useGetMessagesByRoomQuery(actualRoom?.id);
  const { auth } = useAuth();

  const joinRoom = () => {
    websocket.joinRoom(actualRoom?.id, auth?.accessToken);
    setActualRoom({ ...actualRoom, isJoined: true });
  };

  useEffect(() => {
    websocket.onRoomJoined(() => {
      refetch();
    });
    websocket.onRoomLeft(() => {
      refetch();
      removeActualRoom();
    });
    websocket.onRoomDeleted(() => {
      refetch();
      removeActualRoom();
    });
    return () => {
      websocket.offRoomJoined();
      websocket.offRoomLeft();
      websocket.offRoomDeleted();
    };
  }, [actualRoom]);

  useEffect(() => {
    websocket.onMessageCreated(() => {
      refetch();
    });
    return () => {
      websocket.offMessageCreated();
    };
  }, [messages]);

  useEffect(() => {
    if (messagesContainerRef) {
      messagesContainerRef?.current.addEventListener(
        "DOMNodeInserted",
        (event) => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: "smooth" });
        }
      );
    }
  }, []);
  return (
    <>
      <div>
        <HeaderMessage />
      </div>
      <div
        id="messages-container"
        className="px-3 py-2 flex-1 overflow-y-scroll"
        ref={messagesContainerRef}
      >
        {actualRoom?.isJoined &&
          messages?.map((message) => (
            <MessageBox
              key={message.id}
              isMine={message.userId === auth.id}
              {...message}
            />
          ))}

        {!actualRoom?.isJoined && (
          <div className="flex flex-col justify-center items-center h-full space-y-6">
            <h1 className="text-center text-2xl font-bold">
              You are not joined to this room
            </h1>
            <button className="btn btn-" onClick={joinRoom}>
              Join room
            </button>
          </div>
        )}
      </div>
      <div className="">
        <WriteMessage />
      </div>
    </>
  );
}
