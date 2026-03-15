import { cn } from "../lib/cn";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function DeckOptionMenuChoices({ deckId, onDelete, onEdit }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [optionOpen, setOptionOpen] = useState(false);

  const primaryTransition = "transition-all duration-300 ease-in";

  useEffect(() => {
    const handler = () => {
      if (optionOpen) setOptionOpen(false);
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  });

  return (
    <div className={cn("relative")}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOptionOpen(!optionOpen);
        }}
        className={cn(
          "primary-border h-10 w-10 cursor-pointer rounded-lg text-base font-bold lg:w-12 lg:text-2xl",
        )}
      >
        {optionOpen ? "X" : "⋮"}
      </button>

      <AnimatePresence>
        {optionOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "primary-border absolute top-[6vh] right-0 z-50 rounded-lg p-1",
              "w-36 lg:w-45",
              isLight ? "light-bg" : "dark-bg",
            )}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className={cn(
                "w-full cursor-pointer rounded p-2 text-left text-sm font-bold",
                "lg:hover:bg-gray-700 lg:hover:opacity-100",
                primaryTransition,
              )}
            >
              Edit
            </button>
            <button
              className={cn(
                "w-full cursor-pointer rounded p-2 text-left text-sm font-bold",
                "lg:hover:bg-gray-700 lg:hover:opacity-100",
                primaryTransition,
              )}
            >
              Change Background
            </button>
            <button
              onClick={onDelete}
              className={cn(
                "w-full cursor-pointer rounded p-2 text-left text-sm font-bold text-red-400",
                "lg:hover:bg-gray-700 lg:hover:opacity-100",
                primaryTransition,
              )}
            >
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { DeckOptionMenuChoices };
