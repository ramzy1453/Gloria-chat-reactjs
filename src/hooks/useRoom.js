import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../store/room";

export default function useRoom() {
  const dispatch = useDispatch();
  const actualRoom = useSelector((state) => state.room);

  const setActualRoom = (room) => {
    dispatch(roomActions.setActualRoom(room));
  };
  const removeActualRoom = () => {
    dispatch(roomActions.removeActualRoom());
  };
  return {
    actualRoom,
    setActualRoom,
    removeActualRoom,
  };
}
