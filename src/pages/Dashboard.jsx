import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MobileDashboardFloat } from "../components/MobileDashboard";
import {
  DarkAddDecksSvg,
  DarkSearchSvg,
  LightAddDecksSvg,
  LightSearchSvg,
  darkModeSvg,
  lightModeSvg,
} from "../assets/images";
import { SidebarDashboardLeft } from "../components/SidebarDashboard";

function DashboardPage() {
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState("decks");
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [decks] = useState([]);

  const isLight = theme === "light";
  const primaryTransition = "transition-all duration-300 ease-in";

  const handleDashboardClick = () => {
    setDashboardOpen(!dashboardOpen);
  };
  const handleLeftDashboardClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const titleNav = {
    decks: "My Decks",
    favourites: "Favourites",
    settings: "Settings",
  };

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
          "primary-b-border sticky top-0 left-0 z-10 flex items-center justify-center",
          "w-full",
          "min-h-[10vh] lg:min-h-[15vh]",
          isLight ? "light-bg" : "dark-bg",
          primaryTransition,
        )}
      >
        <div className={cn("flex w-[10vw] items-center justify-center")}>
          <button
            onClick={(e) => {
              e.stopPropagation();

              if (window.innerWidth > 1028) {
                handleLeftDashboardClick();
              } else {
                handleDashboardClick();
              }
            }}
            className="primary-border h-10 w-12 rounded-lg text-2xl font-bold"
          >
            {dashboardOpen || sidebarOpen ? "x" : "≡"}
          </button>
        </div>
        <div className="flex h-full w-[75vw] items-center justify-center text-2xl font-semibold tracking-widest">
          {titleNav[activeTab]}
        </div>
        <div className="flex h-full w-[15vw] items-center justify-center">
          <button
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
            className={cn(
              "primary-border flex h-10 w-16 cursor-pointer items-center justify-center gap-1 rounded-xl font-semibold",
              "py-1 lg:py-5",
            )}
          >
            <img
              src={theme === "light" ? lightModeSvg : darkModeSvg}
              alt="light-mode"
            />
            {theme === "light" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "relative flex min-h-[10vh] items-center justify-center gap-2 p-2",
          "w-full",
          activeTab === "settings" ? "hidden" : "flex",
        )}
      >
        <img
          src={isLight ? LightSearchSvg : DarkSearchSvg}
          alt={isLight ? "Light Search Icon" : "Dark Search Icon"}
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

      <div
        className={cn(
          "flex min-h-screen w-full flex-col items-center justify-center",
        )}
      >
        {activeTab === "decks" && (
          <div className="grid min-h-screen w-full grid-cols-2 gap-2 p-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            <Link
              to="/create-deck"
              className="primary-border flex h-[40vh] flex-col items-center justify-center gap-2 rounded-lg"
            >
              <img
                src={isLight ? LightAddDecksSvg : DarkAddDecksSvg}
                alt=""
                className="h-16 w-16"
              />
              <p className="text-center text-2xl font-semibold">
                Create New Decks
              </p>
            </Link>
            {decks.map((deck) => (
              <div
                key={deck.id}
                className="primary-border flex h-[40vh] items-center justify-center rounded-lg"
              >
                <p className="text-center">{deck.title}</p>
              </div>
            ))}
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
