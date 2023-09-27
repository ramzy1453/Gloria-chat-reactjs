import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    console.log(headers.getSetCookie());
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  const response = await baseQuery(args, api, extraOptions);

  if (response?.error?.data?.message === "Missing or invalid token") {
    const refreshTokenResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );

    console.log(refreshTokenResult);
  }
  // console.log(response?.error?.data?.message);
  // if (response.error.data.error) {
  //   console.log("sending refresh token");
  //   // send refresh token to get new access token
  //   const refreshTokenResult = await baseQuery(
  //     "/auth/refresh-token",
  //     api,
  //     extraOptions
  //   );
  //   console.log(refreshTokenResult);
  //   // if (refreshResult?.data) {
  //   //   const user = api.getState().auth.user;
  //   //   // store the new token
  //   //   api.dispatch(setCredentials({ ...refreshResult.data, user }));
  //   //   // retry the original query with new access token
  //   //   result = await baseQuery(args, api, extraOptions);
  //   // }
  // }

  return response;
};

const api = createApi({
  reducerPath: "GloriaApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "DELETE",
      }),
    }),
    refreshToken: builder.mutation({
      query: () => "auth/refresh-token",
    }),
    getRooms: builder.query({
      query: () => "room",
    }),
    getFirstRoom: builder.mutation({
      query: () => "room/first",
    }),
    getJoinedRooms: builder.query({
      query: () => "user/joined-rooms",
    }),
    getCreatedRooms: builder.query({
      query: () => "user/created-rooms",
    }),
    getMessagesByRoom: builder.query({
      query: (roomId) => `message/${roomId}`,
    }),
    getLastMessageByRoom: builder.query({
      query: (roomId) => `message/${roomId}/last-message`,
    }),

    isUserInRoom: builder.query({
      query: (roomId) => `user/is-in-room/${roomId}`,
    }),
    joinRoom: builder.mutation({
      query: (roomId) => ({
        url: `room/join/${roomId}`,
        method: "POST",
      }),
    }),
    leaveRoom: builder.mutation({
      query: (roomId) => ({
        url: `room/leave/${roomId}`,
        method: "POST",
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ roomId, text }) => ({
        url: `message/${roomId}`,
        method: "POST",
        body: { text },
      }),
    }),
  }),
});

export default api;
