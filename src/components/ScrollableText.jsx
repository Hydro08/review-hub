import { useRef, useEffect } from "react";
import { cn } from "../lib/cn";

function ScrollableText({ text, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  return (
    <p
      ref={ref}
      className={cn(
        "w-full cursor-text overflow-x-auto px-2 text-center whitespace-nowrap opacity-100",
        className,
      )}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {text}
    </p>
  );
}

export { ScrollableText };
