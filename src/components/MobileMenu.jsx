import { useNavigate, Link } from "react-router-dom";
import { cn } from "../lib/cn";

import supabase from "../lib/supabase";

import lightModeSvg from "../assets/light-mode.svg";
import lightSettingSvg from "../assets/light-settings.svg";
import lightLogoutSvg from "../assets/light-logout.svg";

import darkModeSvg from "../assets/dark-mode.svg";
import darkSettingSvg from "../assets/dark-settings.svg";
import darkLogoutSvg from "../assets/dark-logout.svg";

import { useEffect, useState } from "react";

function MobileMenu({ menuOpen, setOpen, theme, setTheme }) {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const setOpenHandle = () => {
    setOpen(!menuOpen);
  };

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        className={cn(
          "primary-b-border fixed left-0 z-10 flex w-full flex-col justify-center transition-all duration-300 ease-linear md:hidden",
          menuOpen ? "top-[10vh]" : "top-[-80vh]",
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
              className="primary-border rounded-lg px-4 py-2 font-bold"
            >
              HOME
            </li>
            <li
              onClick={() => {
                scrollToSection("aboutSect");
                setOpenHandle();
              }}
              className="primary-border rounded-lg px-4 py-2 font-bold"
            >
              ABOUT
            </li>
            <li
              onClick={() => {
                navigate("/dashboard");
                setOpenHandle();
              }}
              className="primary-border rounded-lg px-4 py-2 font-bold"
            >
              DASHBOARD
            </li>
            <li
              onClick={() => {
                scrollToSection("contactSect");
                setOpenHandle();
              }}
              className="primary-border rounded-lg px-4 py-2 font-bold"
            >
              CONTACT
            </li>
          </ul>
        </div>
        <div className="flex h-[15%] w-full items-center justify-center">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="primary-border flex w-30 items-center justify-center gap-1 rounded-xl p-3 font-bold"
          >
            <img
              src={theme === "light" ? lightModeSvg : darkModeSvg}
              alt="light-mode"
            />
            {theme === "light" ? "☀️" : "🌙"}
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
                // to="/profile"
                className="flex items-center justify-center gap-2"
              >
                <button
                  onClick={() => ud()}
                  className={cn(
                    "h-12 w-12 rounded-[50%]",
                    theme === "light"
                      ? "dark-bg text-white"
                      : "light-bg text-black",
                  )}
                >
                  Prof
                </button>
                <p onClick={() => ud()} className="capitalize underline">
                  {user.user_metadata.username}
                </p>
              </Link>
              <div className="flex flex-col items-center justify-center gap-2">
                <button
                  onClick={() => ud()}
                  className="primary-border flex w-30 items-center justify-center gap-2 rounded-lg p-2 font-bold"
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
                    setOpenHandle();
                  }}
                  className={cn(
                    "primary-border flex items-center justify-center gap-2 rounded-lg p-2 font-bold",
                    theme === "light" ? "bg-red-400" : "bg-red-600",
                    isLoading ? "w-34" : "w-30",
                  )}
                >
                  <img
                    src={theme === "light" ? lightLogoutSvg : darkLogoutSvg}
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
        </div>
      </div>
    </>
  );
}
export { MobileMenu };
