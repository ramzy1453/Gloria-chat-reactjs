import { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/chat";
import Error from "./pages/404";
import { useAuth, useRoom } from "./hooks";
import api from "./store/api";

export default function Routes() {
  const { auth } = useAuth();
  const { actualRoom, setActualRoom } = useRoom();
  const [getFirstRoom, { isError }] = api.useGetFirstRoomMutation();
  const navigate = useNavigate();
  useEffect(() => {
    const nextPage = async () => {
      if (auth?.accessToken) {
        const { data: room } = await getFirstRoom();
        if (isError) {
          navigate("chat/");
        }
        setActualRoom(room);
        navigate(`chat/${room?.id}`);
      } else {
        navigate("/");
      }
    };
    nextPage();
  }, [auth?.accessToken]);

  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/chat/:roomId",
      element: <Chat />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);
  return routes;
}
