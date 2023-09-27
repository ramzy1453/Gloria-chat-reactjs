import { useAuth } from "../../hooks";
import c from "classnames";

export default function ProfilePicture({
  isOnline = true,
  width = "w-20",
  src,
  name,
}) {
  const { auth } = useAuth();

  if (src) {
    return (
      <div className={c("avatar", { online: isOnline })}>
        <div className={c("rounded-full", width)}>
          <img src={src} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
          <span>{name?.charAt(0).toUpperCase()}</span>
        </div>
      </div>
    );
  }
}
