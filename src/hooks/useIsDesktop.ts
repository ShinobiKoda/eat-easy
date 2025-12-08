import { useEffect, useState } from "react";

/**
 * Simple hook to detect whether the viewport is at or above a breakpoint.
 * Default breakpoint is 768px (typical md). Returns `true` for desktop.
 */
export default function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= breakpoint;
  });

  useEffect(() => {
    function onResize() {
      setIsDesktop(window.innerWidth >= breakpoint);
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isDesktop;
}
