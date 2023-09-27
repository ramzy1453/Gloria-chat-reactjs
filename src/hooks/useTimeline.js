import { useAnimationControls } from "framer-motion";
import { useCallback, useEffect } from "react";

export default function useTimeline(timelines) {
  const controls = useAnimationControls();
  useEffect(() => {
    const sequence = async () => {
      for (const timeline of timelines) {
        await controls.start(timeline);
      }
    };
    sequence();
    return () => {
      controls.stop();
    };
  }, []);

  return controls;
}
