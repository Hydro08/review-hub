import { useRef, useEffect } from "react";

function DeckDescription({ description }) {
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
      title={description}
      ref={ref}
      className="w-full cursor-text overflow-x-auto px-2 text-center text-xs whitespace-nowrap italic opacity-60"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {description}
    </p>
  );
}

export { DeckDescription };
