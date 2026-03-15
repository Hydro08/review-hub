import { useNavigate, Link } from "react-router-dom";
import { cn } from "../lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

import supabase from "../lib/supabase";

import {
  LightModeSvg,
  DarkModeSvg,
  LightSettingSvg,
  DarkSettingSvg,
  LightLogoutSvg,
  DarkLogoutSvg,
  LightHomeSvg,
  DarkHomeSvg,
  LightAboutSvg,
  DarkAboutSvg,
  LightDashboardSvg,
  DarkDashboardSvg,
  LightContactSvg,
  DarkContactSvg,
  LightSignupPng,
  DarkSignupPng,
  LightLoginPng,
  DarkLoginPng,
} from "../assets/images";

import { useEffect, useState } from "react";

function MobileMenu({ menuOpen, setOpen }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  const isLight = theme === "light";

  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const setOpenHandle = () => {
    setOpen(!menuOpen);
  };

  const ud = () => {
    alert("under development :D");
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
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "primary-b-border fixed left-0 z-10 flex w-full flex-col justify-center transition-all duration-300 ease-linear md:hidden",
          menuOpen
            ? "pointer-events-auto top-[10vh] opacity-100"
            : "pointer-events-none top-[-80vh] opacity-0",
          theme === "light" ? "light-bg" : "dark-bg",
          user ? "h-[70vh]" : "h-[60vh]",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-center",
            user ? "h-[50%]" : "h-[60%]",
          )}
        >
          <ul className="flex flex-col items-center justify-center gap-5">
            <li
              onClick={() => {
                scrollToSection("homeSect");
                setOpenHandle();
              }}
              className="primary-border mt-2 flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-bold"
            >
              <img
                src={theme === "light" ? LightHomeSvg : DarkHomeSvg}
                alt={theme === "light" ? "Light Home Icon" : "Dark Home Icon"}
              />
              HOME
            </li>
            <li
              onClick={() => {
                scrollToSection("aboutSect");
                setOpenHandle();
              }}
              className="primary-border flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-bold"
            >
              <img
                src={theme === "light" ? LightAboutSvg : DarkAboutSvg}
                alt={theme === "light" ? "Light About Icon" : "Dark About Icon"}
              />
              ABOUT
            </li>
            <li
              onClick={() => {
                navigate("/dashboard");
                setOpenHandle();
              }}
              className="primary-border flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-bold"
            >
              <img
                src={theme === "light" ? LightDashboardSvg : DarkDashboardSvg}
                alt={
                  theme === "light"
                    ? "Light Dashboard Icon"
                    : "Dark Dashboard Icon"
                }
              />
              DASHBOARD
            </li>
            <li
              onClick={() => {
                scrollToSection("contactSect");
                setOpenHandle();
              }}
              className="primary-border flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-bold"
            >
              <img
                src={theme === "light" ? LightContactSvg : DarkContactSvg}
                alt={
                  theme === "light" ? "Light Contact Icon" : "Dark Contact Icon"
                }
              />
              CONTACT
            </li>
          </ul>
        </div>
        <div className="flex h-[15%] w-full items-center justify-center">
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
        </div>
        <div
          className={cn(
            "flex w-full items-center justify-center",
            user ? "h-[35%]" : "h-[25%]",
          )}
        >
          {user ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <Link
                to="/profile"
                className="flex items-center justify-center gap-2"
              >
                <button
                  className={cn(
                    "h-12 w-12 rounded-[50%]",
                    theme === "light"
                      ? "dark-bg text-white"
                      : "light-bg text-black",
                  )}
                >
                  Prof
                </button>
                <p className="capitalize underline">
                  {user.user_metadata.username}
                </p>
              </Link>
              <div className="flex flex-col items-center justify-center gap-2">
                <button
                  onClick={ud}
                  className="primary-border flex w-30 items-center justify-center gap-2 rounded-lg p-2 font-bold"
                >
                  <img
                    src={theme === "light" ? LightSettingSvg : DarkSettingSvg}
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
                    setOpenHandle();
                  }}
                  className={cn(
                    "primary-border flex items-center justify-center gap-2 rounded-lg p-2 font-bold",
                    theme === "light" ? "bg-red-400" : "bg-red-600",
                    isLoading ? "w-34" : "w-30",
                  )}
                >
                  <img
                    src={theme === "light" ? LightLogoutSvg : DarkLogoutSvg}
                    alt={theme === "light" ? "Light Logout" : "Dark Logout"}
                  />
                  {isLoading ? "Loading..." : "Log Out"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-10">
              <button
                onClick={() => {
                  navigate("/login");
                  setOpenHandle();
                }}
                className="primary-border flex h-15 w-30 items-center justify-center gap-2 rounded-xl font-bold"
              >
                <img
                  src={theme === "light" ? LightLoginPng : DarkLoginPng}
                  alt=""
                />
                Log In
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setOpenHandle();
                }}
                className="primary-border flex h-15 w-30 items-center justify-center gap-2 rounded-xl font-bold"
              >
                <img
                  src={theme === "light" ? LightSignupPng : DarkSignupPng}
                  alt=""
                />
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export { MobileMenu };
