import { cn } from "../lib/cn";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import supabase from "../lib/supabase";

import {
  lightModeSvg,
  darkModeSvg,
  lightSettingSvg,
  darkSettingSvg,
  LightHomeSvg,
  DarkHomeSvg,
  LightAboutSvg,
  DarkAboutSvg,
  LightDashboardSvg,
  DarkDashboardSvg,
  LightContactSvg,
  DarkContactSvg,
  LightAuthSettingsSvg,
  DarkAuthSettingsSvg,
  LightSignupPng,
  DarkSignupPng,
  LightLoginPng,
  DarkLoginPng,
} from "../assets/images";

function HeaderNav({
  open,
  setOpen,
  theme,
  setTheme,
  settingOpen,
  setSettingOpen,
}) {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const liBase =
    "primary-border rounded-xl text-lg px-3 py-2 text-base font-semibold";
  const authButton =
    "primary-border rounded-xl px-3 py-2 font-bold cursor-pointer gap-2 lg:w-32 h-11 flex justify-center items-center";
  const hoverSet = "hover:shadow-md";
  const primaryTransition = "transition-all duration-300 ease-in";
  const shadowTheme =
    theme === "light" ? "hover:shadow-black" : "hover:shadow-white";

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSettingClick = () => {
    setSettingOpen(!settingOpen);
  };

  const [user, setUser] = useState(null);

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
    <header
      className={cn(
        "primary-b-border sticky top-0 left-0 z-10 flex min-h-[10vh] w-full items-center justify-between px-2",
        primaryTransition,
        theme === "light" ? "light-bg" : "dark-bg",
      )}
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Review Hub</h1>
      </div>

      <button
        className="primary-border h-10 w-10 rounded-lg font-bold md:hidden"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {open ? "X" : "≡"}
      </button>

      <div className="hidden items-center justify-center gap-1 md:flex">
        <button
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
          className={cn(
            "primary-border flex h-10 w-14 cursor-pointer items-center justify-center gap-1 rounded-xl font-semibold",
            "py-1 lg:py-5",
            primaryTransition,
            hoverSet,
            shadowTheme,
            user ? "hidden" : "md:hidden lg:flex",
          )}
        >
          <img
            src={theme === "light" ? lightModeSvg : darkModeSvg}
            alt="light-mode"
          />
          {theme === "light" ? "☀️" : "🌙"}
        </button>
        <ul className="flex items-center justify-center gap-1">
          <li
            onClick={() => {
              scrollToSection("homeSect");
            }}
            className={cn(
              "flex cursor-pointer items-center justify-center gap-2",
              liBase,
              hoverSet,
              primaryTransition,
              shadowTheme,
            )}
          >
            <img
              src={theme === "light" ? LightHomeSvg : DarkHomeSvg}
              alt={theme === "light" ? "Light Home Icon" : "Dark Home Icon"}
            />
            Home
          </li>
          <li
            onClick={() => {
              scrollToSection("aboutSect");
            }}
            className={cn(
              "flex cursor-pointer items-center justify-center gap-2",
              liBase,
              hoverSet,
              primaryTransition,
              shadowTheme,
            )}
          >
            <img
              src={theme === "light" ? LightAboutSvg : DarkAboutSvg}
              alt={theme === "light" ? "Light About Icon" : "Dark About Icon"}
            />
            About
          </li>
          <li
            title={user ? "Go To Dashboard" : "Login First."}
            onClick={() => {
              navigate("/dashboard");
            }}
            className={cn(
              "flex items-center justify-center gap-2",
              user ? "cursor-pointer" : "cursor-not-allowed",
              liBase,
              hoverSet,
              primaryTransition,
              shadowTheme,
            )}
          >
            <img
              src={theme === "light" ? LightDashboardSvg : DarkDashboardSvg}
              alt={
                theme === "light"
                  ? "Light Dashboard Icon"
                  : "Dark Dashboard Icon"
              }
            />
            Dashboard
          </li>
          <li
            onClick={() => {
              scrollToSection("contactSect");
            }}
            className={cn(
              "flex cursor-pointer items-center justify-center gap-2",
              liBase,
              hoverSet,
              primaryTransition,
              shadowTheme,
            )}
          >
            <img
              src={theme === "light" ? LightContactSvg : DarkContactSvg}
              alt={
                theme === "light" ? "Light Contact Icon" : "Dark Contact Icon"
              }
            />
            Contact
          </li>
        </ul>
        <div className="hidden md:flex">
          {user ? (
            <div className="flex items-center justify-center gap-2">
              <Link
                to="/profile"
                className={cn(
                  "flex items-center justify-center gap-2",
                  primaryTransition,
                )}
              >
                <button
                  className={cn(
                    "h-12 w-12 cursor-pointer rounded-[50%] md:hidden lg:block",
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
                  className={cn(
                    "primary-border rounded-lg p-1 py-2 capitalize underline md:hidden lg:block",
                    theme === "light" ? "text-black" : "text-white",
                  )}
                >
                  {user.user_metadata.username}
                </p>
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSettingClick();
                }}
                className={cn(
                  "primary-border cursor-pointer rounded-xl p-2",
                  primaryTransition,
                  hoverSet,
                  shadowTheme,
                )}
              >
                <img
                  src={theme === "light" ? lightSettingSvg : darkSettingSvg}
                  alt="Settings"
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSettingClick();
                }}
                className={cn(
                  "md:flex lg:hidden",
                  authButton,
                  primaryTransition,
                  hoverSet,
                  shadowTheme,
                )}
              >
                <img
                  src={
                    theme === "light"
                      ? LightAuthSettingsSvg
                      : DarkAuthSettingsSvg
                  }
                  alt=""
                />
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className={cn(
                  "md:hidden lg:flex",
                  authButton,
                  primaryTransition,
                  hoverSet,
                  shadowTheme,
                )}
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
                }}
                className={cn(
                  "md:hidden lg:flex",
                  authButton,
                  primaryTransition,
                  hoverSet,
                  shadowTheme,
                )}
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
    </header>
  );
}

export { HeaderNav };
