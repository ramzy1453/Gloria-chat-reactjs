import React, { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { useAuth } from "../../../../hooks";
import ProfileModal from "./ProfileModal";
import api from "../../../../store/api";
import { toast } from "react-hot-toast";
import ProfilePicture from "../../ProfilePicture";

export default function ChatPannel() {
  const { removeAuth, auth } = useAuth();
  const [logout, { isLoading }] = api.useLogoutMutation();
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleLogout = async () => {
    await logout();
    removeAuth();
    toast.success("Logout successfully");
  };
  return (
    <>
      {modal && <ProfileModal closeModal={closeModal} />}
      {isLoading && (
        <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      <div className="flex flex-col items-center gap-6">
        <label
          htmlFor="profile-modal"
          className="btn btn-circle border"
          onClick={showModal}
        >
          <ProfilePicture
            src={auth?.picture}
            name={auth?.username}
            width="w-10"
          />
        </label>

        <button className="btn btn-sm border-white btn-square hover:bg-white hover:text-black">
          <TbLogout className="w-10" onClick={handleLogout} />
        </button>
      </div>
    </>
  );
}
