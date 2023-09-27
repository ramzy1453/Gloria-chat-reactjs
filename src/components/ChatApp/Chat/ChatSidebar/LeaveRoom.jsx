import { useRef } from "react";
import { useRoom, useAuth } from "../../../../hooks";
import ws from "../../../../utils/socket.io";

export default function LeaveRoom({ isAdmin }) {
  const { actualRoom } = useRoom();
  const { auth } = useAuth();
  const closeButtonRef = useRef();

  const leaveRoom = () => {
    ws.leaveRoom(actualRoom?.id, auth?.accessToken);
    closeModal();
  };
  const deleteRoom = () => {
    ws.deleteRoom(actualRoom?.id, auth?.accessToken);
    closeModal();
  };

  const closeModal = () => {
    closeButtonRef.current.click();
  };
  return (
    <>
      <input type="checkbox" id="leave-room" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p className="text-center mb-4 text-xl font-bold">
            Think twice before doing anythig
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={leaveRoom}
              className="btn btn-warning hover:bg-[#e2a92e] text-white"
            >
              Leave Room
            </button>
            {isAdmin && (
              <button
                onClick={deleteRoom}
                className="btn btn-error hover:bg-red-500 text-white"
              >
                Delete Room
              </button>
            )}
          </div>
        </div>
        <label
          ref={closeButtonRef}
          className="modal-backdrop"
          htmlFor="leave-room"
        >
          Close
        </label>
      </div>
    </>
  );
}
