import { useEffect } from "react";
import IncomingMessage from "./IncomingMessage";
import CreateServerModal from "./CreateServerModal";
import Search from "../../Search";
import api from "../../../../store/api";
import { Facebook as FbContentLoader } from "react-content-loader";
import ws from "../../../../utils/socket.io";
import { toast } from "react-hot-toast";
import { useAuth, useRoom } from "../../../../hooks";
export default function ChatSidebar() {
  const { data: rooms, isLoading, error, refetch } = api.useGetRoomsQuery();
  const { actualRoom } = useRoom();
  const { auth } = useAuth();

  useEffect(() => {
    ws.onRoomCreated(() => {
      refetch();
    });
    ws.onRoomDeleted(() => {
      refetch();
    });
    ws.onRoomLeft(() => {
      refetch();
    });

    ws.onRoomJoined((room) => {
      if (room?.username !== auth?.username) {
        refetch();
      }
      if (room?.id === actualRoom?.id) {
        toast.success(`${room.username} joined the room ${room.name} !`, {
          position: "top-right",
        });
      }
    });

    return () => {
      ws.offRoomCreated();
      ws.offRoomJoined();
      ws.offRoomDeleted();
      ws.offRoomLeft();
    };
  }, [rooms, actualRoom?.id]);
  return (
    <>
      <div className="py-3 px-4">
        <Search />
      </div>
      <div className="flex-1 overflow-y-scroll">
        {isLoading && !rooms && !error
          ? Array(4)
              .fill()
              .map((_, i) => (
                <FbContentLoader className="py-3 px-4" key={i + "p"} />
              ))
          : rooms?.map((room) => <IncomingMessage key={room.id} {...room} />)}
      </div>
      <div className="py-3 px-4">
        <label
          className="btn btn-block message-box border-none"
          htmlFor="create-server-modal"
        >
          add room
        </label>
      </div>
      <CreateServerModal />
    </>
  );
}
