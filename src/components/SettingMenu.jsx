import { cn } from "../lib/cn";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import supabase from "../lib/supabase";

import {
  LightModeSvg,
  DarkModeSvg,
  LightSettingSvg,
  DarkSettingSvg,
  LightLogoutSvg,
  DarkLogoutSvg,
  LightSignupPng,
  DarkSignupPng,
  LightLoginPng,
  DarkLoginPng,
} from "../assets/images";
import { LoadingDots } from "./Loading";

function SettingMenu({ settingOpen, setSettingOpen }) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const setSettingHandle = () => {
    setSettingOpen(!settingOpen);
  };

  const isLight = theme === "light";

  const buttonSettings =
    "primary-border flex cursor-pointer items-center justify-center gap-2 rounded-lg p-1 font-bold";
  const authButton =
    "primary-border flex h-15 w-30 items-center justify-center gap-2 rounded-xl font-bold cursor-pointer";
  const hoverSet = "hover:shadow-md";
  const primaryTransition = "transition-all duration-300 ease-in";
  const shadowTheme = isLight ? "hover:shadow-black" : "hover:shadow-white";

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
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={cn(
            "primary-border fixed top-[12vh] right-0 z-10 hidden flex-col items-center justify-center gap-4 rounded-lg p-2 opacity-0 transition-all duration-200 ease-in md:flex",
            "md:w-[25%] lg:w-[15%]",
            "md:h-[40vh] lg:h-[30vh]",
            settingOpen
              ? "pointer-events-none md:pointer-events-auto md:opacity-100"
              : "md:pointer-events-none md:opacity-0",
            isLight ? "light-bg" : "dark-bg",
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                ud();
              }}
              className={cn(
                "h-12 w-12 cursor-pointer rounded-[50%] md:block lg:hidden",
                isLight ? "dark-bg text-white" : "light-bg text-black",
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
                isLight ? "text-black" : "text-white",
              )}
            >
              {user?.user_metadata?.username}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTheme(isLight ? "dark" : "light");
            }}
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

          <button onClick={() => ud()} className={cn(buttonSettings)}>
            <img
              src={isLight ? LightSettingSvg : DarkSettingSvg}
              alt={isLight ? "Light Setting" : "Dark Setting"}
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
              isLight ? "bg-red-400" : "bg-red-600",
            )}
          >
            <img
              src={isLight ? LightLogoutSvg : DarkLogoutSvg}
              alt="Logout Icon"
            />
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                Loading <LoadingDots />
              </span>
            ) : (
              "Log Out"
            )}
          </button>
        </div>
      ) : (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={cn(
            "primary-border fixed top-[10vh] right-0 z-10 flex min-h-[35vh] w-[20%] flex-col items-center justify-center gap-4 rounded-lg p-2 opacity-0 transition-all duration-200 ease-in",
            settingOpen
              ? "pointer-events-none md:pointer-events-auto md:opacity-100"
              : "md:pointer-events-none md:opacity-0",
            isLight ? "light-bg" : "dark-bg",
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTheme(isLight ? "dark" : "light");
            }}
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
          <button
            onClick={() => {
              navigate("/login");
              setOpenHandle();
            }}
            className={cn(authButton, hoverSet, primaryTransition, shadowTheme)}
          >
            <img src={isLight ? LightLoginPng : DarkLoginPng} alt="" />
            Log In
          </button>
          <button
            onClick={() => {
              navigate("./signup");
              setOpenHandle();
            }}
            className={cn(authButton, hoverSet, primaryTransition, shadowTheme)}
          >
            <img src={isLight ? LightSignupPng : DarkSignupPng} alt="" />
            Sign Up
          </button>
        </div>
      )}
    </>
  );
}

export { SettingMenu };
