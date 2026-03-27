import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/cn";
import { useTheme } from "../context/ThemeContext";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [breakpoint]);
  return isMobile;
}

/**
 * DropdownSheet
 *
 * Props:
 *  isOpen     — boolean
 *  onClose    — () => void
 *  title      — string
 *  options    — { id, label, description?, icon?, subOptions?: [...] }[]
 *  onSelect   — (option, subOption?) => void
 */
export function DropdownSheet({ isOpen, onClose, title, options, onSelect }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const isMobile = useIsMobile();

  const [activeSub, setActiveSub] = useState(null);

  const bg = isLight ? "bg-white text-black" : "bg-[#1a1a2e] text-white";
  const border = isLight ? "border-gray-200" : "border-gray-700";
  const hover = isLight
    ? "hover:bg-gray-100 active:bg-gray-200"
    : "hover:bg-white/10 active:bg-white/15";

  const handleClose = () => {
    onClose();
    setActiveSub(null);
  };

  const handleOptionClick = (option) => {
    if (option.subOptions?.length) {
      setActiveSub(option);
    } else {
      onSelect(option, null);
      handleClose();
    }
  };

  const handleSubOptionClick = (subOption) => {
    onSelect(activeSub, subOption);
    handleClose();
  };

  const displayed = activeSub ? activeSub.subOptions : options;

  /* ─────────────────────────────────────────
     MOBILE — bottom sheet
  ───────────────────────────────────────── */
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            <motion.div
              className={cn(
                "fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl px-5 pt-4 pb-10 shadow-2xl",
                bg,
                "border-t",
                border,
              )}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              {/* Drag handle */}
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-400/60" />

              {/* Header */}
              <div className="mb-4 flex items-center gap-3">
                {activeSub && (
                  <button
                    onClick={() => setActiveSub(null)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-lg transition-all",
                      hover,
                    )}
                    aria-label="Go back"
                  >
                    ←
                  </button>
                )}
                <h2 className="text-lg font-bold">
                  {activeSub ? activeSub.label : title}
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                {displayed.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() =>
                      activeSub
                        ? handleSubOptionClick(opt)
                        : handleOptionClick(opt)
                    }
                    className={cn(
                      "flex items-center gap-4 rounded-xl border p-4 text-left transition-all",
                      hover,
                      border,
                    )}
                  >
                    {opt.icon && (
                      <span className="text-2xl leading-none">{opt.icon}</span>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold">{opt.label}</p>
                      {opt.description && (
                        <p className="mt-0.5 text-sm opacity-55">
                          {opt.description}
                        </p>
                      )}
                    </div>
                    {opt.subOptions?.length && (
                      <span className="text-lg opacity-40">›</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  /* ─────────────────────────────────────────
     DESKTOP — dropdown
  ───────────────────────────────────────── */
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={handleClose} />

          <motion.div
            className={cn(
              "absolute top-full left-1/2 z-50 mt-2 min-w-[230px]",
              "-translate-x-1/2 rounded-xl p-2 shadow-xl",
              bg,
              "border",
              border,
            )}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {activeSub && (
              <button
                onClick={() => setActiveSub(null)}
                className={cn(
                  "mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
                  hover,
                )}
              >
                ← Back
              </button>
            )}

            <p className="mb-1 px-3 text-[11px] font-semibold tracking-wider uppercase opacity-40">
              {activeSub ? activeSub.label : title}
            </p>

            {displayed.map((opt) => (
              <button
                key={opt.id}
                onClick={() =>
                  activeSub ? handleSubOptionClick(opt) : handleOptionClick(opt)
                }
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all",
                  hover,
                )}
              >
                {opt.icon && (
                  <span className="text-lg leading-none">{opt.icon}</span>
                )}
                <div className="flex-1">
                  <p className="text-sm font-semibold">{opt.label}</p>
                  {opt.description && (
                    <p className="text-xs opacity-50">{opt.description}</p>
                  )}
                </div>
                {opt.subOptions?.length && (
                  <span className="text-sm opacity-40">›</span>
                )}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
