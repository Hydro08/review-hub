import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

import { MobileDashboardFloat } from "../components/MobileDashboard";

function DashboardPage() {
  const { theme } = useTheme();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("decks");
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const navigate = useNavigate();
  const isLight = theme === "light";
  const primaryTransition = "transition-all duration-300 ease-in";
  const handleDashboardClick = () => {
    setDashboardOpen(!dashboardOpen);
  };

  const navItems = [
    { label: "Home", type: "link", to: "/" },
    { label: "Feed", type: "link", to: "/feed" },
    { label: "Explore People", type: "link", to: "/explore" },
    { label: "My Decks", type: "tab", tab: "decks" },
    { label: "Favourites", type: "tab", tab: "favourites" },
    { label: "Settings", type: "tab", tab: "settings" },
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <main
      className={cn(
        "relative min-h-screen w-full",
        isLight ? "light-bg text-black" : "dark-bg text-white",
        primaryTransition,
      )}
    >
      <MobileDashboardFloat
        dashboardOpen={dashboardOpen}
        setDashboardOpen={setDashboardOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="primary-b-border relative flex min-h-[20vh] w-full items-center justify-center">
        <div className="flex w-[20vw] items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDashboardClick();
            }}
            className="primary-border h-10 w-12 rounded-lg text-2xl font-bold"
          >
            {dashboardOpen ? "x" : "≡"}
          </button>
        </div>
        <div className="flex h-full w-[80vw] items-center justify-center text-2xl font-semibold tracking-widest">
          My Decks
        </div>
      </div>

      <div
        className={cn(
          "primary-r-border fixed top-0 left-0 hidden h-screen w-[20vw] flex-col justify-between lg:flex",
          isLight ? "light-bg" : "dark-bg",
        )}
      >
        <div className="flex min-h-[15%] w-full items-center justify-center border-b border-gray-600">
          <Link
            to="/profile"
            className="flex items-center justify-center gap-2"
          >
            <img
              src="#"
              alt=""
              className={cn(
                "h-[50px] w-[50px] rounded-[50%]",
                isLight ? "dark-bg" : "light-bg",
              )}
            />
            <p className="underline">{user?.user_metadata?.username}</p>
          </Link>
        </div>
        <div className="flex w-full flex-1 flex-col justify-center gap-1 p-2">
          {navItems.map(({ label, type, to, tab }) => (
            <div
              key={label}
              className="flex w-full cursor-pointer items-center gap-2"
              onClick={() => type === "tab" && setActiveTab(tab)}
            >
              <div className="flex w-[10%] items-center justify-center">
                <div
                  className={cn(
                    "h-10 w-[5px] rounded-lg",
                    type === "tab" && activeTab === tab
                      ? "bg-white"
                      : "bg-gray-500",
                  )}
                />
              </div>
              <div className="flex w-[80%] items-center py-3">
                {type === "link" ? (
                  <Link to={to} className="text-xl">
                    {label}
                  </Link>
                ) : (
                  <p className="text-xl">{label}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex min-h-[15%] w-full items-center justify-center border-t border-gray-600 p-2">
          <button
            onClick={async () => {
              setIsLoading(true);
              await supabase.auth.signOut();
              setIsLoading(false);
              navigate("/");
            }}
            className="primary-border h-10 w-30 cursor-pointer rounded-lg bg-red-600 font-bold"
          >
            {isLoading ? "Loading..." : "Log Out"}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "flex min-h-screen flex-col items-center justify-center",
          "w-full lg:w-[80vw]",
          "lg:ml-[20vw]",
        )}
      >
        {activeTab === "decks" && <p>My Decks Content "Under Development"</p>}
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
