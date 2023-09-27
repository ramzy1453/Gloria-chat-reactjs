import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

export default function useRoom() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const setAuth = (auth) => {
    dispatch(authActions.setAuth(auth));
  };
  const removeAuth = () => {
    dispatch(authActions.removeAuth());
  };
  return {
    auth,
    setAuth,
    removeAuth,
  };
}
