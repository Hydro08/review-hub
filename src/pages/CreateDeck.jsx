import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import supabase from "../lib/supabase";
import {
  LightModeSvg,
  DarkModeSvg,
  LightDashboardSvg,
  DarkDashboardSvg,
  LightCreateFolderPng,
  DarkCreateFolderPng,
  LightCancelSvg,
  DarkCancelSvg,
} from "../assets/images";

import { LoadingDots } from "../components/Loading";

function CreateDeckPage() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    success: true,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const isLight = theme === "light";
  const primaryTransition = "transition-all duration-300 ease-in";
  const inputBase = cn(
    "primary-border w-[80%] rounded-lg p-2 font-semibold",
    isLight ? "placeholder-black" : "placeholder-white",
  );

  const showToast = (success, message) => {
    setToast({ show: true, success, message });
    setTimeout(
      () => setToast({ show: false, success: true, message: "" }),
      3000,
    );
  };

  const handleCreate = async () => {
    if (!title.trim() || !category.trim()) {
      showToast(false, "❌ Title and Category are required.");
      return;
    }

    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("decks").insert({
        user_id: user.id,
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        is_public: isPublic,
      });

      if (error) {
        showToast(false, "❌ Something went wrong. Please try again.");
      } else {
        showToast(true, "✅ Deck created successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      showToast(false, "❌ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className={cn(
        "relative min-h-screen w-full",
        isLight ? "light-bg black-text" : "dark-bg text-white",
        primaryTransition,
      )}
    >
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "fixed right-5 bottom-5 z-50 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-lg",
              toast.success ? "bg-green-500" : "bg-red-500",
            )}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

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
          <h1 className="text-2xl font-bold lg:text-4xl">Create New Deck</h1>
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

      <footer className="flex min-h-[20vh] w-full items-center justify-center">
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => navigate("/dashboard")}
            className="primary-border flex h-10 w-28 cursor-pointer items-center justify-center gap-2 rounded-lg font-bold"
          >
            <img
              src={isLight ? LightCancelSvg : DarkCancelSvg}
              alt={isLight ? "Light Cancel Icon" : "Dark Cancel Icon"}
            />{" "}
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={isLoading}
            className={cn(
              "primary-border flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg font-bold",
              isLight ? "dark-bg text-white" : "light-bg text-black",
              isLoading ? "w-40" : "w-30",
            )}
          >
            <img
              src={isLight ? DarkCreateFolderPng : LightCreateFolderPng}
              alt="create-deck-icon"
            />
            {isLoading ? (
              <span className="flex items-center justify-center gap-1">
                Creating <LoadingDots />
              </span>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </footer>
    </main>
  );
}

export default CreateDeckPage;
