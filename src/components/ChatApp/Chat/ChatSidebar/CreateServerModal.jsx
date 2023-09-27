import { useFormik } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import websocket from "../../../../utils/socket.io";
import { useAuth } from "../../../../hooks";

const validationSchema = Yup.object({
  room: Yup.string().required("Room name is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
});

export default function CreateServerModal() {
  const { auth } = useAuth();
  const closeButtonRef = useRef();

  const closeModal = () => {
    closeButtonRef.current.click();
  };

  const formik = useFormik({
    initialValues: {
      room: "",
      description: "",
      image: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: async ({ room, description, image }) => {
      websocket.createRoom(room, description, auth?.accessToken, image);
      closeModal();
    },
    validate: async (values) => {},
  });

  return (
    <>
      <input
        type="checkbox"
        id="create-server-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box py-10 shadow-xl flex flex-col space-y-6 justify-center items-center">
          <h3 className="text-2xl font-bold text-center">Create new room</h3>
          <form
            encType="multipart/form-data"
            className="flex flex-col space-y-4"
            onSubmit={formik.handleSubmit}
          >
            <input
              type="text"
              name="room"
              placeholder="ROOM NAME"
              className="input input-md input-bordered w-full max-w-xs focus:outline-none"
              value={formik.values.room}
              onChange={formik.handleChange}
            />
            <input
              name="description"
              type="text"
              placeholder="DESCRIPTION"
              className="input input-md input-bordered w-full max-w-xs focus:outline-none"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <input
              type="file"
              accept="image/*"
              name="image"
              className="file-input input-bordered file-input-md w-full max-w-xs focus:outline-none"
              onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
            />
            <button type="submit" className="btn btn-neutral btn-block">
              Create
            </button>
          </form>
        </div>

        <label
          ref={closeButtonRef}
          className="modal-backdrop"
          htmlFor="create-server-modal"
        >
          Close
        </label>
      </div>
    </>
  );
}
