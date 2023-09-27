import { SiGnuprivacyguard } from "react-icons/si";
import { SlLogin } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
export default function RegsiterSwitcher() {
  const { pathname } = useLocation();
  const Icon = pathname === "/register" ? SiGnuprivacyguard : SlLogin;
  return (
    <div className="absolute top-0 left-0 m-4">
      <Link
        to={pathname === "/register" ? "/" : "/register"}
        className="btn btn-circle btn-info"
      >
        <Icon color="white" size={20} />
      </Link>
    </div>
  );
}
