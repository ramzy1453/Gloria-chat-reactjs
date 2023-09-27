import { useEffect, useRef } from "react";
import { TbSend } from "react-icons/tb";
import websocket from "../../../../utils/socket.io";
import { useAuth, useRoom } from "../../../../hooks";

export default function WriteMessage() {
  const { auth } = useAuth();
  const { actualRoom } = useRoom();
  const inputRef = useRef();

  const handleSendMessage = () => {
    console.log("button clicked");
    websocket.createMessage(
      inputRef.current.value,
      auth?.accessToken,
      actualRoom?.id
    );
    inputRef.current.value = "";
  };

  useEffect(() => {
    const keyListener = (e) => {
      if (e.key === "Enter" && document.activeElement === inputRef.current) {
        console.log("ue");
        handleSendMessage();
      }
    };
    document.addEventListener("keydown", keyListener);

    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  }, []);
  return (
    <div className="message-box shadow-xl my-3 mx-4 rounded-xl flex p-2">
      <input
        type="text"
        placeholder="Type here"
        className="w-full input-sm bg-transparent pl-3 pr-2 outline-none text-sm"
        ref={inputRef}
      />
      <div className="">
        <button className="btn btn-sm btn-square" onClick={handleSendMessage}>
          <TbSend size={18} />
        </button>
      </div>
    </div>
  );
}
