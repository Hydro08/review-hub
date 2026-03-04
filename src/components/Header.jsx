import { cn } from "../lib/cn";
import { useNavigate, Link } from "react-router-dom";

import supabase from "../lib/supabase";

import { useEffect, useState } from "react";

import lightModeSvg from "../assets/light-mode.svg";
import darkModeSvg from "../assets/dark-mode.svg";
import lightSettingSvg from "../assets/light-settings.svg";
import darkSettingSvg from "../assets/dark-settings.svg";

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

  const liBase = "primary-border  rounded-xl px-3 py-2 text-base font-semibold";
  const liTxtSize = "md:text-sm lg:text-lg";
  const authButton =
    "primary-border rounded-xl px-3 py-1.5 lg:py-2.5 font-bold cursor-pointer";
  const hoverSet = "hover:shadow-md";
  const primaryTransition = "transition-all duration-300 ease-in";
  const shadowTheme =
    theme === "light" ? "hover:shadow-black" : "hover:shadow-white";

  const ud = () => {
    alert("Under Development :D");
  };

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
        "primary-b-border sticky top-0 left-0 z-10 flex h-[10vh] w-full items-center justify-between px-2",
        primaryTransition,
        theme === "light" ? "light-bg" : "dark-bg",
      )}
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Review Hub</h1>
      </div>

      <button
        className="primary-border h-10 w-10 rounded-lg font-bold md:hidden"
        onClick={handleClick}
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
            "py-1 lg:py-5.5",
            primaryTransition,
            hoverSet,
            shadowTheme,
            user ? "hidden" : "flex",
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
              "cursor-pointer",
              liBase,
              liTxtSize,
              hoverSet,
              primaryTransition,
              shadowTheme,
            )}
          >
            Home
          </li>
          <li
            onClick={() => {
              scrollToSection("aboutSect");
            }}
            className={cn(
              "cursor-pointer",
              liBase,
              liTxtSize,
              hoverSet,
              primaryTransition,
              shadowTheme,
            )}
          >
            About
          </li>
          <li
            title={user ? "Go To Dashboard" : "Login First."}
            onClick={() => {
              navigate("/dashboard");
            }}
            className={cn(
              user ? "cursor-pointer" : "cursor-not-allowed",
              liBase,
              liTxtSize,
              hoverSet,
              primaryTransition,
              shadowTheme,
            )}
          >
            Dashboard
          </li>
          <li
            onClick={() => {
              scrollToSection("contactSect");
            }}
            className={cn(
              "cursor-pointer",
              liBase,
              liTxtSize,
              hoverSet,
              primaryTransition,
              shadowTheme,
            )}
          >
            Contact
          </li>
        </ul>
        <div className="hidden md:flex">
          {user ? (
            <Link
              className={cn(
                "ml-2 flex items-center justify-center gap-2",
                primaryTransition,
              )}
            >
              <button
                onClick={() => {
                  ud();
                }}
                className={cn(
                  "h-12 w-12 cursor-pointer rounded-[50%]",
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
                  "primary-border rounded-lg p-1 capitalize underline",
                  theme === "light" ? "text-black" : "text-white",
                )}
              >
                {user.user_metadata.username}
              </p>
              <button
                onClick={handleSettingClick}
                className={cn(
                  "primary-border cursor-pointer rounded-lg p-2",
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
            </Link>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className={cn(
                  authButton,
                  primaryTransition,
                  hoverSet,
                  shadowTheme,
                )}
              >
                Log In
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className={cn(
                  authButton,
                  primaryTransition,
                  hoverSet,
                  shadowTheme,
                )}
              >
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
