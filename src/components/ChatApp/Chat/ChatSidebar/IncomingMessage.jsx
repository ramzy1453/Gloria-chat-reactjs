import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useRoom } from "../../../../hooks";
import { limitter } from "../../../../utils/functions";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { motion } from "framer-motion";
import ProfilePicture from "../../ProfilePicture";
import api from "../../../../store/api";
import websocket from "../../../../utils/socket.io";
import LeaveRoom from "./LeaveRoom";
import c from "classnames";

export default function IncomingMessage({
  id,
  name,
  isJoined,
  picture,
  adminId,
}) {
  const { actualRoom, setActualRoom } = useRoom();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    setActualRoom({ id, name, isJoined, picture, adminId });
    navigate(`/chat/${id}`);
  };

  const currentIsSelected = actualRoom.id === id;

  const {
    data: lastMessageOfRoom,
    isLoading,
    error,
    refetch,
  } = api.useGetLastMessageByRoomQuery(id);

  useEffect(() => {
    websocket.onMessageCreated(() => {
      refetch();
    });
    return () => {
      websocket.offMessageCreated();
    };
  }, [lastMessageOfRoom?.text]);
  console.log(auth, actualRoom);
  return (
    <>
      <LeaveRoom isAdmin={auth?.id === actualRoom?.adminId} />
      <motion.div
        initial={{ filter: "blur(10px)" }}
        animate={{ filter: "blur(0px)" }}
        onClick={handleClick}
        className={c(
          "border-b border-[#0000001a] group relative message-card hover:message-card-hover cursor-pointer flex justify-between py-3 px-4",
          {
            "message-card-hover": currentIsSelected,
          },
          "relative"
        )}
        style={{}}
      >
        <div className="flex space-x-3">
          {/* avatar */}
          <ProfilePicture src={picture} name={name} width="w-12" />

          {/* Name & Message */}
          <div className="flex flex-col py-1 space-y-1">
            <h1 className="font-bold text-xs">{limitter(name, 20)}</h1>
            <p className="text-xs text-gray-500">
              {isJoined
                ? !isLoading && !error
                  ? limitter(lastMessageOfRoom?.text, 22)
                  : "Loading..."
                : "Click to join"}
            </p>
          </div>
        </div>

        {/* Date & Time */}
        <div>
          <p className="text-xs text-gray-500">12:00</p>
        </div>

        <label
          htmlFor="leave-room"
          className={`absolute z-10 top-1/2 -translate-y-1/2 right-2 hidden group-hover:inline-flex 
        items-center justify-center w-8 h-8
      text-pink-100 transition-colors duration-150 message-box rounded-full
      hover:message-card
      focus:shadow-outline`}
        >
          <BiDotsHorizontalRounded size={18} />
        </label>
      </motion.div>
    </>
  );
}
