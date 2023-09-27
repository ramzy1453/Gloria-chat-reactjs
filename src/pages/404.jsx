import { useEffect } from "react";
import "../assets/styles/404.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiReturnArrow } from "react-icons/gi";

export default function Error() {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    if (location.state?.from === "404") {
      return navigate("/");
    }
    return navigate(-1, { state: { from: "404" } });
  };
  useEffect(() => {
    const createStar = () => {
      let right = Math.random() * 500;
      const top = Math.random() * window.innerHeight;
      const star = document.createElement("div");
      star.classList.add("star-404");
      document.body.appendChild(star);

      const runStar = () => {
        if (right >= window.innerWidth) {
          star.remove();
        }
        right += 3;
        star.style.right = `${right}px`;
      };

      setInterval(runStar, 10);
      star.style.top = `${top}px`;
    };

    setInterval(createStar, 250);

    return () => {
      const allStars = document.querySelectorAll(".star");
      allStars.forEach((star) => {
        star.remove();
      });
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center py-14 px-6 bg-gradient">
      <div className="flex flex-col items-center space-y-4 justify-center">
        <h1 className="text-6xl">404</h1>
        <h2 className="text-4xl">Page not found</h2>
      </div>
      <div className="astronaut-404">
        <img src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png" />
      </div>
      <Link
        className="absolute top-0 left-0 m-4 btn btn-info btn-circle"
        onClick={goBack}
      >
        <GiReturnArrow size={24} color="white" />
      </Link>
    </div>
  );
}
