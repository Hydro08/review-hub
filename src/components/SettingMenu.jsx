import { cn } from "../lib/cn";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import supabase from "../lib/supabase";

import lightModeSvg from "../assets/light-mode.svg";
import darkModeSvg from "../assets/dark-mode.svg";
import lightSettingSvg from "../assets/light-settings.svg";
import darkSettingSvg from "../assets/dark-settings.svg";
import lightLogoutSvg from "../assets/light-logout.svg";
import darkLogoutSvg from "../assets/dark-logout.svg";

function SettingMenu({ settingOpen, setSettingOpen }) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const setSettingHandle = () => {
    setSettingOpen(!settingOpen);
  };

  const buttonSettings =
    "primary-border flex cursor-pointer items-center justify-center gap-2 rounded-lg p-1 font-bold";
  const hoverSet = "hover:shadow-md";
  const primaryTransition = "transition-all duration-300 ease-in";
  const shadowTheme =
    theme === "light" ? "hover:shadow-black" : "hover:shadow-white";

  const ud = () => {
    alert("Under Development :D");
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {user ? (
        <div
          className={cn(
            "primary-border fixed top-[12vh] right-0 z-10 flex flex-col items-center justify-center gap-4 rounded-lg p-2 opacity-0 transition-all duration-200 ease-in",
            "md:w-[25%] lg:w-[15%]",
            "md:h-[40vh] lg:h-[30vh]",
            settingOpen
              ? "pointer-events-none md:pointer-events-auto md:opacity-100"
              : "md:pointer-events-none md:opacity-0",
            theme === "light" ? "light-bg" : "dark-bg",
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                ud();
              }}
              className={cn(
                "h-12 w-12 cursor-pointer rounded-[50%] md:block lg:hidden",
                theme === "light"
                  ? "dark-bg text-white"
                  : "light-bg text-black",
                hoverSet,
                primaryTransition,
                shadowTheme,
              )}
            >
              Prof
            </button>
            <p
              onClick={() => {
                ud();
              }}
              className={cn(
                "primary-border rounded-lg p-1 capitalize underline md:block lg:hidden",
                theme === "light" ? "text-black" : "text-white",
              )}
            >
              {user?.user_metadata?.username}
            </p>
          </div>
          <button
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
            className="primary-border flex cursor-pointer items-center justify-center gap-2 rounded-lg p-1"
          >
            <img src={theme === "light" ? lightModeSvg : darkModeSvg} alt="" />
            {theme === "light" ? "☀️" : "🌙"}
          </button>

          <button onClick={() => ud()} className={cn(buttonSettings)}>
            <img
              src={theme === "light" ? lightSettingSvg : darkSettingSvg}
              alt={theme === "light" ? "Light Setting" : "Dark Setting"}
            />
            Settings
          </button>

          <button
            onClick={async () => {
              setIsLoading(true);
              await supabase.auth.signOut();
              setIsLoading(false);
              navigate("/");
              setSettingHandle();
            }}
            className={cn(
              buttonSettings,
              theme === "light" ? "bg-red-400" : "bg-red-600",
            )}
          >
            <img
              src={theme === "light" ? lightLogoutSvg : darkLogoutSvg}
              alt={theme === "light" ? "Light Log out" : "Dark Log out"}
            />
            {isLoading ? "Loading..." : "Log Out"}
          </button>
        </div>
      ) : (
        <div
          className={cn(
            "primary-border fixed top-[10vh] right-0 z-10 flex min-h-[35vh] w-[20%] flex-col items-center justify-center gap-4 rounded-lg p-2 opacity-0 transition-all duration-200 ease-in",
            settingOpen
              ? "pointer-events-none md:pointer-events-auto md:opacity-100"
              : "md:pointer-events-none md:opacity-0",
            theme === "light" ? "light-bg" : "dark-bg",
          )}
        >
          <button
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
            className="primary-border flex cursor-pointer items-center justify-center gap-2 rounded-lg p-1"
          >
            <img src={theme === "light" ? lightModeSvg : darkModeSvg} alt="" />
            {theme === "light" ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => {
              navigate("/login");
              setOpenHandle();
            }}
            className="primary-border h-15 w-30 rounded-xl font-bold"
          >
            Log In
          </button>
          <button
            onClick={() => {
              navigate("./signup");
              setOpenHandle();
            }}
            className="primary-border h-15 w-30 rounded-xl font-bold"
          >
            Sign Up
          </button>
        </div>
      )}
    </>
  );
}

export { SettingMenu };
