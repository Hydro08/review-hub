import { cn } from "../lib/cn";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

function ModalConfirmation({ onCancel, onConfirm }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.div
      key="modal"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "primary-border fixed top-[50%] left-[50%] z-[100] min-h-[30vh] -translate-x-[50%] -translate-y-[50%] rounded-lg p-2",
        "w-[70vw] lg:w-[30vw]",
        isLight ? "light-bg text-black" : "dark-bg text-white",
      )}
    >
      <h1 className="text-center text-2xl">
        Are you sure to delete this deck?
      </h1>
      <div
        className={cn(
          "flex items-center justify-center gap-5",
          "mt-20 lg:mt-20",
        )}
      >
        <button
          onClick={onCancel}
          className={cn(
            "h-12 w-24 cursor-pointer rounded-lg font-bold",
            isLight ? "bg-red-200" : "bg-red-600",
          )}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={cn(
            "h-12 w-24 cursor-pointer rounded-lg font-bold",
            isLight ? "bg-green-200" : "bg-green-600",
          )}
        >
          Confirm
        </button>
      </div>
    </motion.div>
  );
}

export { ModalConfirmation };
