import { useEffect, useState } from "react";

const useMediaQuery = () => {
  const breakpointsConfig = {
    isXs: "(max-width: 639px)",
    isSm: "(min-width: 640px)",
    isMd: "(min-width: 768px)",
    isLg: "(min-width: 1024px)",
    isXl: "(min-width: 1280px)",
    is2xl: "(min-width: 1536px)",
  };

  const [breakpoints, setBreakpoints] = useState({});

  useEffect(() => {
    const updateBreakpoints = () => {
      const updatedBreakpoints = {};
      Object.keys(breakpointsConfig).forEach((breakpoint) => {
        updatedBreakpoints[breakpoint] = window.matchMedia(
          breakpointsConfig[breakpoint]
        ).matches;
      });

      setBreakpoints((prevBreakpoints) => {
        if (
          JSON.stringify(prevBreakpoints) !== JSON.stringify(updatedBreakpoints)
        ) {
          return updatedBreakpoints;
        }
        return prevBreakpoints;
      });
    };
    window.addEventListener("resize", updateBreakpoints);

    updateBreakpoints();

    return () => {
      window.removeEventListener("resize", updateBreakpoints);
    };
  }, []);

  const onBreakpoint = (breakpoint, callback) => {
    if (breakpoints[`is${breakpoint[0].toUpperCase()}${breakpoint.slice(1)}`]) {
      callback();
    }
  };
  return { ...breakpoints, onBreakpoint };
};

export default useMediaQuery;
