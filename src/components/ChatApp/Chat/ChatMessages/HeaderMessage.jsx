import React from "react";
import c from "classnames";
import { IoCall } from "react-icons/io5";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { useRoom } from "../../../../hooks";
import ProfilePicture from "../../ProfilePicture";

export default function HeaderMessage() {
  const { actualRoom } = useRoom();

  return (
    <div className="px-3 h-14 flex justify-between items-center shadow">
      {actualRoom?.id && (
        <>
          <div className="flex space-x-4 justify-center items-center">
            <ProfilePicture
              src={actualRoom?.picture}
              name={actualRoom?.name}
              width="w-10"
              isOnline={actualRoom?.isJoined}
            />
            <div className="space-y-1">
              <h1 className="font-bold text-sm">{actualRoom?.name}</h1>
              <p className="text-xs text-gray-500">
                {actualRoom?.isJoined ? "Online" : "Not joined"}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-sm btn-square">
              <IoCall size={18} />
            </button>
            <button className="btn btn-sm btn-square">
              <BsFillCameraVideoFill size={18} />
            </button>
          </div>
        </>
      )}
      {!actualRoom?.id && <div className="text-sm">Empty rooms</div>}
    </div>
  );
}
