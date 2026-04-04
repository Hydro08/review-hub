import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

import supabase from "../lib/supabase";
import { DropdownSheet } from "../components/DropdownSheet";

import {
  LightDashboardSvg,
  DarkDashboardSvg,
  LightModeSvg,
  DarkModeSvg,
  LightDropdownPng,
  DarkDropdownPng,
  LightCreateFlashcardPng,
  DarkCreateFlashcardPng,
  LightBooksFcPng,
  DarkBooksFcPng,
} from "../assets/images";
import { LoadingDots } from "../components/Loading";
import { ScrollableText } from "../components/ScrollableText";

const STUDY_MODE_OPTIONS = [
  {
    id: "freedom",
    label: "Freedom Mode",
    icon: "🕊️",
    description: "No timer — answer at your own pace",
    subOptions: null,
  },
  {
    id: "challenge",
    label: "Challenge Mode",
    icon: "⚡",
    description: "Race against the clock",
    subOptions: [
      {
        id: "easy",
        label: "Easy",
        icon: "🟢",
        description: "1 minute per card",
        timerSeconds: 60,
      },
      {
        id: "medium",
        label: "Medium",
        icon: "🟡",
        description: "30 seconds per card",
        timerSeconds: 30,
      },
      {
        id: "hard",
        label: "Hard",
        icon: "🔴",
        description: "15 seconds per card",
        timerSeconds: 15,
      },
    ],
  },
];

function FlashcardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const [openDropdown, setOpenDropdown] = useState(null);

  const [categoryOptions, setCategoryOptions] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const [learnedCount, setLearnedCount] = useState(0);
  const [cardCount, setCardCount] = useState(0);

  const [isNavigating, setIsNavigating] = useState(false);

  const progress =
    cardCount === 0 ? 0 : Math.round((learnedCount / cardCount) * 100);

  const primaryTransition = "transition-all duration-300 ease-in";

  const ud = () => {
    alert("under development pasinsya!!!");
  };

  useEffect(() => {
    setIsNavigating(false);
    setIsLoading(true);

    const fetchDeck = async () => {
      const { data: deck, error: deckError } = await supabase
        .from("decks")
        .select("*")
        .eq("id", id)
        .single();

      if (!deckError) {
        setTitle(deck.title);
        setCategory(deck.category);
        setCardCount(deck.card_count ?? 0);
        setLearnedCount(deck.learned_count ?? 0);

        if (deck.category) {
          setSelectedCategory({
            id: deck.category,
            label: deck.category,
            icon: "🗂️",
          });
        }
      }

      if (!deckError) {
        const { data: allDecks } = await supabase
          .from("decks")
          .select("category")
          .eq("user_id", deck.user_id);

        if (allDecks) {
          const unique = [
            ...new Set(allDecks.map((d) => d.category).filter(Boolean)),
          ];
          setCategoryOptions(
            unique.map((cat) => ({ id: cat, label: cat, icon: "🗂️" })),
          );
        }
      }

      setIsLoading(false);
    };

    fetchDeck();
  }, [id]);

  const handleCategorySelect = async (option) => {
    setOpenDropdown(null);
    setIsNavigating(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("decks")
      .select("id")
      .eq("user_id", user.id)
      .eq("category", option.label)
      .limit(1);

    if (data && data.length > 0) {
      navigate(`/flashcard/${data[0].id}`);
    } else {
      setIsNavigating(false);
    }
  };

  const handleStudyModeSelect = (mode, difficulty) => {
    if (difficulty) {
      setSelectedMode({ type: "challenge", difficulty });
    } else {
      setSelectedMode({ type: "freedom" });
    }
  };

  const categoryLabel = selectedCategory
    ? selectedCategory.label
    : "Select Category";

  const studyModeLabel = selectedMode
    ? selectedMode.type === "freedom"
      ? "Freedom Mode"
      : `Challenge · ${selectedMode.difficulty.label}`
    : "Study Mode";

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
            onClick={() => navigate("/dashboard")}
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
            {isLoading || isNavigating ? (
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
        <div className="flex w-full items-center justify-center p-6">
          <h1 className="max-w-[80vw]">
            <ScrollableText text={category} className="text-2xl" />
          </h1>
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <div className="flex w-[30%] items-center justify-center">
            <button
              className={cn(
                "primary-border flex h-15 w-54 cursor-pointer items-center justify-center rounded-lg px-2 text-left",
                "gap-1 md:gap-3 lg:gap-4",
                "text-sm md:text-base",
                isLight ? "font-extrabold" : "font-base",
              )}
              onClick={() => ud()}
            >
              Create Flashcard
              <img
                src={isLight ? LightCreateFlashcardPng : DarkCreateFlashcardPng}
                alt="Create Flashcard Image"
                className="w-[20px] md:w-[24px]"
              />
            </button>
          </div>

          <div className="relative flex w-[30%] items-center justify-center">
            <button
              onClick={() =>
                setOpenDropdown((prev) =>
                  prev === "category" ? null : "category",
                )
              }
              className={cn(
                "primary-border flex h-15 cursor-pointer items-center justify-center rounded-lg px-2 text-left",
                "w-30 md:w-54",
                "gap-2 md:gap-3 lg:gap-4",
                "text-sm md:text-base",
                isLight ? "font-extrabold" : "font-base",
                openDropdown === "category" && "ring-2 ring-offset-1",
              )}
            >
              <span className="truncate"> {categoryLabel}</span>
              <motion.img
                src={isLight ? LightDropdownPng : DarkDropdownPng}
                alt="Dropdown"
                className="w-[18px] md:w-[24px]"
                animate={{ rotate: openDropdown === "category" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>

            <DropdownSheet
              isOpen={openDropdown === "category"}
              onClose={() => setOpenDropdown(null)}
              title="Select Category"
              options={
                categoryOptions.length
                  ? categoryOptions
                  : [{ id: "__all__", label: "All Cards", icon: "📋" }]
              }
              onSelect={handleCategorySelect}
            />
          </div>

          <div className="relative flex w-[30%] items-center justify-center">
            <button
              onClick={() =>
                setOpenDropdown((prev) => (prev === "study" ? null : "study"))
              }
              className={cn(
                "primary-border flex h-15 w-44 cursor-pointer items-center justify-center rounded-lg px-2 text-left",
                "gap-2 md:gap-3 lg:gap-4",
                "text-sm md:text-base",
                isLight ? "font-extrabold" : "font-base",
                openDropdown === "study" && "ring-2 ring-offset-1",
              )}
            >
              {studyModeLabel}
              <motion.img
                src={isLight ? LightDropdownPng : DarkDropdownPng}
                alt="Dropdown"
                className="w-[18px] md:w-[24px]"
                animate={{ rotate: openDropdown === "study" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>

            <DropdownSheet
              isOpen={openDropdown === "study"}
              onClose={() => setOpenDropdown(null)}
              title="Study Mode"
              options={STUDY_MODE_OPTIONS}
              onSelect={handleStudyModeSelect}
            />
          </div>
        </div>

        <div className="flex h-[75vh] w-full flex-col items-center justify-center">
          <h1 className="text-base md:text-xl lg:text-xl">
            Study Mode: {studyModeLabel}
          </h1>
          <h1 className="text-base md:text-xl lg:text-xl">{cardCount} Cards</h1>
          <div className="h-3 w-64 overflow-hidden rounded-full bg-gray-400 md:h-4">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-base opacity-60 md:text-xl lg:text-xl">
            {learnedCount === 0
              ? "It has not been studied"
              : `${progress}%`}{" "}
          </p>
          <img src={isLight ? LightBooksFcPng : DarkBooksFcPng} alt="" />
          <button
            onClick={() => ud()}
            className={cn(
              "w-40 cursor-pointer rounded-lg",
              "h-10 md:h-15",
              isLight ? "dark-bg text-white" : "light-bg font-bold text-black",
            )}
          >
            Start Review
          </button>
        </div>
      </section>
    </main>
  );
}

export default FlashcardPage;
