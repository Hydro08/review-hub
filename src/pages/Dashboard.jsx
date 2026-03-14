import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import supabase from "../lib/supabase";

import { MobileDashboardFloat } from "../components/MobileDashboard";
import { DeckOptionMenuChoices } from "../components/DeckOptionMenu";
import { SidebarDashboardLeft } from "../components/SidebarDashboard";
import { DeckDescription } from "../components/DeckDescription";
import { LoadingDots } from "../components/Loading";

import {
  DarkAddDecksSvg,
  DarkSearchSvg,
  LightAddDecksSvg,
  LightSearchSvg,
  DarkModeSvg,
  LightModeSvg,
  LightUnfavoritePng,
  DarkUnfavoritePng,
  LightFavoritedPng,
  DarkFavoritedPng,
  LightShareSvg,
  DarkShareSvg,
} from "../assets/images";

function DashboardPage() {
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState("decks");
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favourite, setFavourite] = useState({});

  const isLight = theme === "light";
  const primaryTransition = "transition-all duration-300 ease-in";

  const descRef = useRef(null);

  const titleNav = {
    decks: "My Decks",
    favourites: "Favourites",
    settings: "Settings",
  };

  const getProgress = (deck) => {
    if (!deck.card_count || deck.card_count === 0) return 0;
    return Math.round((deck.learned_count / deck.card_count) * 100);
  };

  const getCardLabel = (count) => {
    const n = count ?? 0;
    return `${n} ${n === 1 ? "card" : "cards"}`;
  };

  const handleDashboardClick = () => setDashboardOpen(!dashboardOpen);
  const handleLeftDashboardClick = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handler = () => {
      if (dashboardOpen) setDashboardOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  });

  useEffect(() => {
    const handler = () => {
      if (sidebarOpen) setSidebarOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  });

  useEffect(() => {
    document.body.style.overflowY = dashboardOpen ? "hidden" : "auto";
  }, [dashboardOpen]);

  useEffect(() => {
    document.body.style.overflowY = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  const handleFavourite = async (deckId) => {
    const newValue = !favourite[deckId];
    setFavourite((prev) => ({ ...prev, [deckId]: newValue }));

    await supabase
      .from("decks")
      .update({ is_favorite: newValue })
      .eq("id", deckId);
  };

  useEffect(() => {
    const fetchDecks = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("decks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setDecks(data);
        const initialFavourite = {};
        data.forEach((deck) => {
          initialFavourite[deck.id] = deck.is_favorite;
        });
        setFavourite(initialFavourite);
      }
      setIsLoading(false);
    };

    fetchDecks();

    const channel = supabase
      .channel("decks-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "decks" },
        () => fetchDecks(),
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <main
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        primaryTransition,
        isLight ? "light-bg text-black" : "dark-bg text-white",
      )}
    >
      <MobileDashboardFloat
        dashboardOpen={dashboardOpen}
        setDashboardOpen={setDashboardOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <SidebarDashboardLeft
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div
        className={cn(
          "primary-b-border sticky top-0 left-0 z-10 flex items-center justify-center p-2",
          "min-h-[10vh] w-full lg:min-h-[15vh]",
          isLight ? "light-bg" : "dark-bg",
          primaryTransition,
        )}
      >
        <div className="flex w-[10vw] items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.innerWidth > 1028
                ? handleLeftDashboardClick()
                : handleDashboardClick();
            }}
            className="primary-border h-10 w-12 cursor-pointer rounded-lg text-2xl font-bold"
          >
            {dashboardOpen || sidebarOpen ? "X" : "≡"}
          </button>
        </div>

        <div className="flex h-full w-[75vw] items-center justify-center text-2xl font-semibold tracking-widest">
          {titleNav[activeTab]}
        </div>

        <div className="flex h-full w-[15vw] items-center justify-center">
          <button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className={cn(
              "primary-border flex h-10 w-16 cursor-pointer items-center justify-center gap-1 rounded-xl font-semibold",
              "py-1 lg:py-5",
            )}
          >
            <img
              src={isLight ? LightModeSvg : DarkModeSvg}
              alt="theme-toggle"
            />
            {isLight ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "relative flex min-h-[10vh] w-full items-center justify-center gap-2 p-2",
          activeTab === "settings" ? "hidden" : "flex",
        )}
      >
        <img
          src={isLight ? LightSearchSvg : DarkSearchSvg}
          alt="search icon"
          className="absolute top-[50%] left-3 translate-y-[-50%]"
        />
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search Decks..."
          className={cn(
            "primary-border w-full rounded-xl p-2 pl-10",
            isLight ? "placeholder-black" : "placeholder-white",
          )}
        />

        <button
          onClick={() => setSearch("")}
          className={cn(
            "h-10 cursor-pointer rounded-lg text-xl font-bold",
            "w-10 lg:w-12",
            isLight ? "bg-red-400" : "bg-red-600",
            search ? "block" : "hidden",
          )}
        >
          X
        </button>
      </div>

      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        {activeTab === "decks" && (
          <div className="grid min-h-screen w-full auto-rows-min grid-cols-2 gap-2 p-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            <Link
              to="/create-deck"
              className="flex h-52 flex-col items-center justify-center gap-2 rounded-lg"
            >
              <img
                src={isLight ? LightAddDecksSvg : DarkAddDecksSvg}
                alt="create deck"
                className="h-14 w-14 lg:h-16 lg:w-16"
              />
              <p
                className={cn(
                  "text-center font-semibold",
                  "text-xl lg:text-2xl",
                )}
              >
                Create New Decks
              </p>
            </Link>

            {isLoading ? (
              <span className="col-span-full flex items-center justify-center gap-1">
                Loading decks <LoadingDots />
              </span>
            ) : decks.length === 0 ? (
              <p className="col-span-full text-center opacity-50">
                No decks yet. Create one!
              </p>
            ) : (
              decks
                .filter((deck) =>
                  deck.title.toLowerCase().includes(search.toLowerCase()),
                )
                .map((deck) => (
                  <div
                    key={deck.id}
                    className="primary-border flex h-auto flex-col items-start justify-start gap-2 rounded-lg p-2"
                  >
                    <div className="flex w-full items-center justify-center py-1">
                      <div className="w-[80%]">
                        <p className="text-center text-lg font-bold">
                          {deck.title}
                        </p>
                      </div>

                      <div className="flex min-h-[5vh] w-[20%] items-center justify-center">
                        <DeckOptionMenuChoices
                          deckId={deck.id}
                          onDelete={() =>
                            setDecks(decks.filter((d) => d.id !== deck.id))
                          }
                        />
                      </div>
                    </div>

                    <p className="w-full text-center text-sm">
                      {deck.category}
                    </p>

                    {deck.description && (
                      <DeckDescription description={deck.description} />
                    )}

                    <p className="w-full text-center text-xs">
                      {getCardLabel(deck.card_count)}
                    </p>

                    <div className="w-full px-2">
                      <div className="mb-1 flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{getProgress(deck)}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-600">
                        <div
                          className="h-full rounded-full bg-purple-500 transition-all duration-500"
                          style={{ width: `${getProgress(deck)}%` }}
                        />
                      </div>
                    </div>

                    <p className="w-full text-center text-xs">
                      {deck.last_opened
                        ? `Last opened: ${formatDistanceToNow(new Date(deck.last_opened), { addSuffix: true })}`
                        : "Never opened"}
                    </p>

                    <div className="flex w-full items-center justify-center">
                      <button
                        onClick={() => handleFavourite(deck.id)}
                        className="cursor-pointer"
                      >
                        <img
                          src={
                            favourite[deck.id]
                              ? isLight
                                ? LightFavoritedPng
                                : DarkFavoritedPng
                              : isLight
                                ? LightUnfavoritePng
                                : DarkUnfavoritePng
                          }
                          alt="favourite icon"
                          className="h-5 w-5"
                        />
                      </button>
                      <p className="w-full text-center text-xs">
                        {deck.is_public ? "🌐 Public" : "🔒 Private"}
                      </p>
                      <button className="cursor-pointer">
                        <img
                          src={isLight ? LightShareSvg : DarkShareSvg}
                          alt="Share Icon"
                        />
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {activeTab === "favourites" && (
          <p>Favourites Content "Under Development"</p>
        )}

        {activeTab === "settings" && (
          <p>Settings Content "Under Development"</p>
        )}
      </div>
    </main>
  );
}

export default DashboardPage;
