import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/cn";

import lightModeSvg from "../assets/light-mode.svg";
import darkModeSvg from "../assets/dark-mode.svg";
import lightVisiSvg from "../assets/light-visi.svg";
import darkVisiSvg from "../assets/dark-visi.svg";
import lightVisiHideSvg from "../assets/light-visi-hide.svg";
import darkVisiHideSvg from "../assets/dark-visi-hide.svg";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { theme, setTheme } = useTheme();
  const themeBg =
    theme === "light" ? "light-bg text-black" : "dark-bg text-white";

  const loginClick = () => {
    alert("Under Development pa bro!!!");
  };

  return (
    <main
      className={cn(
        "h-screen w-screen transition-all duration-300 ease-in",
        themeBg,
      )}
    >
      <header className="primary-b-border flex h-[10vh] items-center justify-center transition-all duration-300 ease-in">
        <div
          className={cn(
            "flex h-full items-center justify-center",
            "w-[60%] md:w-[80%]",
          )}
        >
          <h1
            onClick={() => navigate("/")}
            className="cursor-pointer text-3xl font-bold tracking-wide"
          >
            Review Hub
          </h1>
        </div>
        <div
          className={cn(
            "flex h-full items-center justify-end gap-10 px-6",
            "w-[40%] md:w-[30%] lg:w-[20%]",
          )}
        >
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
              "primary-border flex h-10 w-16 items-center justify-center gap-1 rounded-lg font-bold",
              "cursor-auto md:cursor-pointer",
            )}
          >
            <img
              src={theme === "light" ? lightModeSvg : darkModeSvg}
              alt="light-mode"
            />
            {theme === "light" ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => navigate("/")}
            className={cn(
              "primary-border h-10 w-10 rounded-lg font-bold",
              theme === "light" ? "bg-red-400" : "bg-red-600",
            )}
          >
            X
          </button>
        </div>
      </header>

      <section className="primary-b-border flex h-[80vh] w-full items-center justify-center p-4 transition-all duration-300 ease-in">
        <form className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-[10%] w-full flex-col items-center justify-center">
            <h2 className="text-3xl font-bold">Log In</h2>
            <p className="text-center font-semibold">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <fieldset className="flex h-[25%] w-full flex-col justify-center gap-2 border-none">
            <label htmlFor="username" className="text-lg font-bold">
              Username / Email
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Input Username or Email"
              className={cn(
                "primary-border rounded-xl p-2 font-bold",
                "w-[95%] lg:w-full",
                theme === "light" ? "placeholder-black" : "placeholder-white",
              )}
              required
            />
          </fieldset>

          <fieldset className="flex h-[25%] w-full flex-col justify-center gap-2 border-none">
            <label htmlFor="password" className="text-lg font-bold">
              Password
            </label>
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Input Password"
                className={cn(
                  "primary-border w-[85%] rounded-xl p-2 font-bold lg:w-[95%]",
                  theme === "light" ? "placeholder-black" : "placeholder-white",
                )}
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className={cn(
                  "primary-border flex h-10 w-10 items-center justify-center rounded-lg",
                  "cursor-auto md:cursor-pointer",
                )}
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
                <img
                  src={
                    theme === "dark"
                      ? !showPassword
                        ? darkVisiSvg
                        : darkVisiHideSvg
                      : !showPassword
                        ? lightVisiSvg
                        : lightVisiHideSvg
                  }
                  alt=""
                />
              </button>
            </div>
          </fieldset>

          <div
            className={cn(
              "mb-5 flex h-[10%] w-full items-center justify-start gap-2",
            )}
          >
            <input
              id="remember"
              type="checkbox"
              name="remember"
              className={cn("h-5 w-5", "cursor-auto md:cursor-pointer")}
              required
            />
            <label
              htmlFor="remember"
              className={cn("font-bold", "cursor-auto md:cursor-pointer")}
            >
              Remember Me
            </label>
          </div>

          <div className="flex h-[10%] items-center justify-center">
            <a href="/forgot-password" className="text-lg font-bold underline">
              Forgot Password
            </a>
          </div>

          <div className="flex h-[10%] items-center justify-center">
            <a href="/signup" className="text-lg font-bold underline">
              Don't have an account?
            </a>
          </div>

          <div className="flex h-[10%] items-center justify-center">
            <button
              onClick={() => loginClick()}
              type="submit"
              className={cn(
                "primary-border w-30 rounded-lg p-2 font-bold",
                "cursor-auto md:cursor-pointer",
                "md:w-50",
              )}
            >
              Log In
            </button>
          </div>
        </form>
      </section>

      <footer className="flex h-[10vh] w-full items-center justify-center font-bold">
        <p>
          &copy; {new Date().getFullYear()} Review Hub. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default LoginPage;
