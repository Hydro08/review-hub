import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

import {
  LightDashboardSvg,
  DarkDashboardSvg,
  LightModeSvg,
  DarkModeSvg,
} from "../assets/images";
import supabase from "../lib/supabase";

function EditDeckPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const isLight = theme === "light";
  const primaryTransition = "transition-all duration-300 ease-in";
  const inputBase = cn(
    "primary-border w-[80%] rounded-lg p-2 font-semibold",
    isLight ? "placeholder-black" : "placeholder-white",
  );

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
        setDescription(data.description ?? "");
        setIsPublic(data.is_public);
      }
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

        <div className="flex w-[75vw] items-center justify-center">
          <h1 className="text-2xl font-bold lg:text-4xl">Edit Deck</h1>
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

      <section className="primary-b-border grid min-h-[60vh] w-full flex-1 grid-cols-1 gap-1 lg:grid-cols-2">
        <div className="flex min-h-[20vh] w-full flex-col items-center justify-center gap-2 p-2">
          <div className="flex w-full items-start justify-start">
            <label htmlFor="category" className="text-xl">
              Category
            </label>
          </div>
          <div className="flex w-full">
            <input
              id="category"
              type="text"
              placeholder="e.g. Math, Science..."
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputBase}
            />
          </div>
        </div>

        <div className="flex min-h-[20vh] w-full flex-col items-center justify-center gap-2 p-2">
          <div className="flex w-full items-start justify-start">
            <label htmlFor="title" className="text-xl">
              Title
            </label>
          </div>
          <div className="flex w-full">
            <input
              id="title"
              type="text"
              placeholder="Input title..."
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputBase}
            />
          </div>
        </div>

        <div className="flex min-h-[20vh] w-full flex-col items-center justify-center gap-2 p-2">
          <div className="flex w-full items-start justify-start">
            <label htmlFor="description" className="text-xl">
              Description (Optional)
            </label>
          </div>
          <div className="flex w-full">
            <textarea
              id="description"
              placeholder="Enter Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputBase}
            />
          </div>
        </div>

        <div className="flex min-h-[20vh] w-full flex-col items-center justify-center gap-2 p-2">
          <div className="flex w-full items-start justify-start">
            <label className="text-xl">Privacy</label>
          </div>
          <div className="flex w-full gap-2">
            <input
              type="radio"
              id="public"
              name="privacy"
              value="public"
              checked={isPublic}
              onChange={() => setIsPublic(true)}
              className="cursor-pointer"
            />
            <label htmlFor="public" className="cursor-pointer font-bold">
              Public
            </label>
          </div>
          <div className="flex w-full gap-2">
            <input
              type="radio"
              id="private"
              name="privacy"
              value="private"
              checked={!isPublic}
              onChange={() => setIsPublic(false)}
              className="cursor-pointer"
            />
            <label htmlFor="private" className="cursor-pointer font-bold">
              Private
            </label>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EditDeckPage;
