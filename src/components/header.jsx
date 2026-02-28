import lightModeSvg from "../assets/light-mode.svg";
import darkModeSvg from "../assets/dark-mode.svg";
import { cn } from "../lib/cn";
import { useNavigate } from "react-router-dom";

import supabase from "../lib/supabase";

import { useEffect, useState } from "react";

function HeaderNav({ open, setOpen, theme, setTheme }) {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const liBase =
    "primary-border cursor-pointer rounded-xl px-3 py-2 text-base font-semibold transition-all duration-300 ease-in md:text-sm lg:text-lg hover:shadow-md hover:shadow-white";

  const authBase =
    "primary-border rounded-xl px-3 py-1.5 lg:py-2.5 font-bold transition-all duration-300 ease-in hover:shadow-md hover:shadow-white cursor-pointer";

  const shadowTheme =
    theme === "light" ? "hover:shadow-black" : "hover:shadow-white";

  const handleClick = () => {
    setOpen(!open);
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
        "primary-b-border sticky top-0 left-0 z-10 flex h-[10vh] w-full items-center justify-between px-2 transition-all duration-300 ease-in",
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
            "primary-border flex h-10 w-14 cursor-pointer items-center justify-center gap-1 rounded-xl py-1 font-semibold transition-all duration-300 ease-in hover:shadow-md md:text-sm lg:py-5.5",
            shadowTheme,
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
            className={cn(liBase, shadowTheme)}
          >
            Home
          </li>
          <li
            onClick={() => {
              scrollToSection("aboutSect");
            }}
            className={cn(liBase, shadowTheme)}
          >
            About
          </li>
          <li
            onClick={() => {
              scrollToSection("dashboardSect");
            }}
            className={cn(liBase, shadowTheme)}
          >
            Dashboard
          </li>
          <li
            onClick={() => {
              scrollToSection("contactSect");
            }}
            className={cn(liBase, shadowTheme)}
          >
            Contact
          </li>
        </ul>
        <div>
          {user ? (
            <div className="ml-2 flex items-center justify-center gap-2">
              <button className="h-12 w-12 rounded-[50%] bg-black">Prof</button>
              <p>{user.user_metadata.username}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className={cn(authBase, shadowTheme)}
              >
                Log In
              </button>
              <button className={cn(authBase, shadowTheme)}>Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { HeaderNav };
