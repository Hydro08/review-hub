import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

import supabase from "../lib/supabase";

import {
  LightDashboardSvg,
  DarkDashboardSvg,
  LightModeSvg,
  DarkModeSvg,
} from "../assets/images";
import { LoadingDots } from "../components/Loading";
import { ScrollableText } from "../components/ScrollableText";

function FlashcardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const primaryTransition = "transition-all duration-300 ease-in";

  useEffect(() => {
    const fetchDeck = async () => {
      const { data, error } = await supabase
        .from("decks")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setTitle(data.title);
        setCategory(data.category);
      }
      setIsLoading(false);
    };

    fetchDeck();
  }, [id]);

  return (
    <main
      className={cn(
        "min-h-screen w-full",
        isLight ? "light-bg text-black" : "dark-bg text-white",
        primaryTransition,
      )}
    >
      <header
        className={cn(
          "primary-b-border flex min-h-[15vh] w-full items-center justify-center p-1",
          isLight ? "light-bg text-black" : "dark-bg text-white",
          primaryTransition,
        )}
      >
        <div className="flex h-full w-[10vw] items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="primary-border cursor-pointer rounded-lg p-2"
            title="Back to Dashboard"
            aria-label="Go Back"
          >
            <img
              src={isLight ? LightDashboardSvg : DarkDashboardSvg}
              alt={isLight ? "Light Dashboard Icon" : "Dark Dashboard Icon"}
            />
          </button>
        </div>

        <div className="flex w-[75vw] items-center justify-center px-2">
          <h1 className="w-full text-2xl font-bold lg:text-4xl">
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                Loading <LoadingDots />
              </span>
            ) : (
              <ScrollableText text={title} />
            )}
          </h1>
        </div>

        <div className="flex h-full w-[15vw] items-center justify-center">
          <button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className={cn(
              "primary-border flex h-10 w-16 cursor-pointer items-center justify-center gap-1 rounded-xl font-semibold",
              "py-1 lg:py-5",
            )}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={isLight ? "light-img" : "dark-img"}
                src={isLight ? LightModeSvg : DarkModeSvg}
                alt="theme-toggle"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={isLight ? "sun" : "moon"}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isLight ? "☀️" : "🌙"}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      <section className={cn("min-h-screen w-full px-2 py-6")}>
        <div className="flex w-full items-center justify-center py-6">
          <h1>
            <ScrollableText text={category} className="text-2xl" />
          </h1>
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <button className="primary-border h-12 w-48">Create Flashcard</button>
          <button className="primary-border h-12 w-44">Select Category (Dropdown)</button>
          <button className="primary-border h-12 w-24">
            Refresh Flashcard
          </button>
        </div>
      </section>
    </main>
  );
}

export default FlashcardPage;
