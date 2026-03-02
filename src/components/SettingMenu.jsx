import { cn } from "../lib/cn";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  const setSettingHandle = () => {
    setSettingOpen(!settingOpen);
  };

  const ud = () => {
    alert("Under Development!!!");
  };

  return (
    <>
      <div
        className={cn(
          "primary-border fixed top-[10vh] right-0 z-10 flex h-[30vh] w-[10vw] flex-col items-center justify-center gap-4 rounded-lg p-2 opacity-0 transition-all duration-200 ease-in",
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
          onClick={() => ud()}
          className="primary-border flex cursor-pointer items-center justify-center gap-1 rounded-lg p-1 font-bold"
        >
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
            "primary-border flex cursor-pointer items-center justify-center gap-2 rounded-lg p-1 font-bold",
            theme === "light" ? "bg-red-400" : "bg-red-600",
          )}
        >
          <img
            src={theme === "light" ? lightLogoutSvg : darkLogoutSvg}
            alt=""
          />
          {isLoading ? "Loading..." : "Log Out"}
        </button>
      </div>
    </>
  );
}

export { SettingMenu };
