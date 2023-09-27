import c from "classnames";
import ProfilePicture from "../../ProfilePicture";

export default function MessageBox({
  text,
  createdAt,
  delivered = true,
  isMine = false,
  user,
}) {
  return (
    <div
      className={c("chat p-2 space-y-2", {
        "chat-start": !isMine,
        "chat-end": isMine,
      })}
    >
      <div
        className={c("chat-image avatar", {
          "mr-2": !isMine,
          "ml-2": isMine,
          placeholder: !user?.picture,
        })}
      >
        <div
          className={c("w-10 rounded-full", {
            "bg-neutral-focus text-neutral-content": !!user?.picture,
          })}
        >
          {user?.picture ? (
            <img src={user?.picture} />
          ) : (
            <span>{user?.username?.charAt(0).toUpperCase()}</span>
          )}
        </div>
      </div>
      <div className="chat-header space-x-3 text-xs">
        <span>{user.username}</span>
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble text-sm min-h-[2.4rem] flex items-center justify-center message-box">
        {text}
      </div>
      <div className="chat-footer text-xs opacity-50">Delivered</div>
    </div>
  );
}
