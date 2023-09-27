import io from "socket.io-client";
export class SocketIO {
  constructor({ url }) {
    this.socket = io(url);
    this.events = [
      "connect",
      "create-room",
      "update-room",
      "delete-room",
      "join-room",
      "leave-room",
      "create-message",
      "update-message",
      "delete-message",
    ];
  }

  init() {
    this.events.forEach((event) => {
      this.socket.on(event, () => {
        console.log(event);
      });
    });
  }

  offAll() {
    this.events.forEach((event) => {
      this.socket.off(event);
    });
  }

  createRoom(name, description, accessToken, image) {
    this.socket.emit("create-room", name, description, accessToken, image);
  }

  updateRoom(roomId, name, accessToken) {
    this.socket.emit("update-room", roomId, name, accessToken);
  }

  deleteRoom(roomId, accessToken) {
    this.socket.emit("delete-room", roomId, accessToken);
  }

  joinRoom(roomId, accessToken) {
    this.socket.emit("join-room", roomId, accessToken);
  }

  leaveRoom(roomId, accessToken) {
    this.socket.emit("leave-room", roomId, accessToken);
  }

  createMessage(text, accessToken, roomId) {
    this.socket.emit("create-message", text, accessToken, roomId);
  }

  updateMessage(messageId, text, accessToken, roomId) {
    this.socket.emit("update-message", messageId, text, accessToken, roomId);
  }

  deleteMessage(messageId, accessToken, roomId) {
    this.socket.emit("delete-message", messageId, accessToken, roomId);
  }

  onConnect(callback) {
    this.socket.on("connect", callback);
  }
  offConnect(callback) {
    this.socket.off("connect", callback);
  }

  onRoomCreated(callback) {
    this.socket.on("create-room", callback);
  }
  offRoomCreated(callback) {
    this.socket.off("create-room", callback);
  }

  onRoomUpdated(callback) {
    this.socket.on("update-room", callback);
  }

  offRoomUpdated(callback) {
    this.socket.off("update-room", callback);
  }

  onRoomDeleted(callback) {
    this.socket.on("delete-room", callback);
  }

  offRoomDeleted(callback) {
    this.socket.off("delete-room", callback);
  }

  onRoomJoined(callback) {
    this.socket.on("join-room", callback);
  }

  offRoomJoined(callback) {
    this.socket.off("join-room", callback);
  }

  onRoomLeft(callback) {
    this.socket.on("leave-room", callback);
  }

  offRoomLeft(callback) {
    this.socket.off("leave-room", callback);
  }

  onMessageCreated(callback) {
    this.socket.on("create-message", callback);
  }

  offMessageCreated(callback) {
    this.socket.off("create-message", callback);
  }

  onMessageUpdated(callback) {
    this.socket.on("update-message", callback);
  }

  offMessageUpdated(callback) {
    this.socket.off("update-message", callback);
  }

  onMessageDeleted(callback) {
    this.socket.on("delete-message", callback);
  }

  offMessageDeleted(callback) {
    this.socket.off("delete-message", callback);
  }
}

export default new SocketIO({
  url: "http://localhost:8000",
});
