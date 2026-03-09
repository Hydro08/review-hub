import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

import { MobileDashboardFloat } from "../components/MobileDashboard";
import { DarkSearchSvg, LightSearchSvg } from "../assets/images";
import { SidebarDashboardLeft } from "../components/SidebarDashboard";

function DashboardPage() {
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState("decks");
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

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
        )}
      >
        <div className={cn("flex w-[10vw] items-center justify-center")}>
          <button
            onClick={(e) => {
              e.stopPropagation();

              if (innerWidth > 1028) {
                handleLeftDashboardClick();
                console.log(sidebarOpen);
              } else {
                handleDashboardClick();
                console.log(dashboardOpen);
              }
            }}
            className="primary-border h-10 w-12 rounded-lg text-2xl font-bold"
          >
            {dashboardOpen || sidebarOpen ? "x" : "≡"}
          </button>
        </div>
        <div className="flex h-full w-[90vw] items-center justify-center text-2xl font-semibold tracking-widest">
          {titleNav[activeTab]}
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
          "flex min-h-screen flex-col items-center justify-center",
          "w-full lg:w-[79vw]",
          "lg:ml-[20vw]",
        )}
      >
        {activeTab === "decks" && (
          <div className="grid min-h-screen w-[79vw] grid-cols-2 gap-2 p-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            <div className="flex h-[40vh] items-center justify-center bg-black">
              Create New Decks
            </div>
            <div className="flex h-[40vh] items-center justify-center bg-black">
              Decks Under Development
            </div>
            <div className="flex h-[40vh] items-center justify-center bg-black">
              Decks Under Development
            </div>
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
