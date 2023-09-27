import { useEffect } from "react";
import api from "../../../../store/api";
import { useAuth } from "../../../../hooks";
import ProfilePicture from "../../ProfilePicture";

export default function ProfileModal({ closeModal }) {
  const joinedRooms = api.useGetJoinedRoomsQuery();
  const createdRooms = api.useGetCreatedRoomsQuery();
  const { auth } = useAuth();
  useEffect(() => {
    console.log("profile first");
    return () => console.log("profile salem bay");
  }, []);
  return (
    <>
      <input type="checkbox" id="profile-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <ProfilePicture src={auth?.picture} name={auth?.username} />
            <p className="py-2">{auth?.username}</p>
          </div>
          <div className="flex flex-col flex-start space-y-2 mx-4 my-2">
            {/* Joined  */}
            <div className="flex items-center justify-between">
              <span className="text-md">Joined</span>
              <span className="text-sm opacity-75">
                {new Date().toUTCString()}
              </span>
            </div>
            <div className="divider"></div>

            <span>Joined Rooms</span>
            <div className="divider"></div>

            {/* lists of joined servers */}
            <div className="shadow">
              <div className="flex flex-col px-4 space-y-4">
                {joinedRooms.isLoading &&
                  Array(4)
                    .fill()
                    .map((_, i) => (
                      <span
                        key={`loading-${i}`}
                        className="loading loading-spinner loading-lg"
                      />
                    ))}
              </div>
              {!joinedRooms.isLoading &&
                joinedRooms?.data?.map((room) => (
                  <div
                    key={room?.id}
                    className="flex items-center justify-between py-2 px-4 overflow-y-scroll shadow"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <ProfilePicture
                        width="w-8"
                        src={room?.picture}
                        name={room?.name}
                      />
                      <span className="text-sm">{room.name}</span>
                    </div>
                    <span className="text-xs opacity-75">
                      {new Date().toUTCString()}
                    </span>
                  </div>
                ))}
            </div>
            <div className="divider"></div>

            <span>Created Rooms</span>
            <div className="divider"></div>

            {/* lists of joined servers */}
            <div className="shadow">
              <div className="flex flex-col px-4 space-y-4">
                {createdRooms.isLoading &&
                  Array(4)
                    .fill()
                    .map((_, i) => (
                      <span
                        key={`loading-${i}`}
                        className="loading loading-spinner loading-lg"
                      />
                    ))}
              </div>
              {!createdRooms.isLoading &&
                createdRooms?.data?.map((room) => (
                  <div
                    key={room?.id}
                    className="flex items-center justify-between py-2 px-4 overflow-y-scroll shadow"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <ProfilePicture
                        src={room?.picture}
                        name={room?.name}
                        width="w-8"
                      />
                      <span className="text-sm">{room?.name}</span>
                    </div>
                    <span className="text-xs opacity-75">
                      {new Date().toUTCString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <label
          className="modal-backdrop cursor-pointer"
          htmlFor="profile-modal"
          onClick={closeModal}
        >
          Close
        </label>
      </div>
    </>
  );
}
