import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/cn";

import lightVisiSvg from "../assets/light-visi.svg";
import darkVisiSvg from "../assets/dark-visi.svg";
import lightVisiHideSvg from "../assets/light-visi-hide.svg";
import darkVisiHideSvg from "../assets/dark-visi-hide.svg";

function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const { theme } = useTheme();
  const themeBg =
    theme === "light" ? "light-bg text-black" : "dark-bg text-white";

  const signupClick = () => {
    alert("Under Development Pa bro!!!");
  };

  return (
    <main className={cn("min-h-screen w-full", themeBg)}>
      <header className="primary-b-border flex h-[10vh] w-full items-center justify-center">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-3xl font-bold tracking-wide"
        >
          Review Hub
        </h1>
      </header>
      <section className="primary-b-border flex h-[100vh] w-full items-center justify-center p-4">
        <form className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-[10%] w-full flex-col items-center justify-center">
            <h2 className="text-3xl font-bold">Sign Up</h2>
            <p className="text-center font-semibold">
              Join us today and start your journey
            </p>
          </div>

          <fieldset className="flex h-[25%] w-full flex-col justify-center gap-2 border-none">
            <label htmlFor="username" className="text-lg font-bold">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Input Username"
              className="primary-border w-[90%] rounded-xl p-2 font-bold lg:w-full"
              required
            />
          </fieldset>

          <fieldset className="flex h-[25%] w-full flex-col justify-center gap-2 border-none">
            <label htmlFor="email" className="text-lg font-bold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Input Email"
              className="primary-border w-[90%] rounded-xl p-2 font-bold lg:w-full"
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
                className="primary-border w-[85%] rounded-xl p-2 font-bold lg:w-[95%]"
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
                  alt={showPassword ? "Hide password" : "Show password"}
                />
              </button>
            </div>
          </fieldset>

          <fieldset className="flex h-[25%] w-full flex-col justify-center gap-2 border-none">
            <label htmlFor="confirm-password" className="text-lg font-bold">
              Confirm Password
            </label>
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => setConfPassword(e.target.value)}
                id="confirm-password"
                name="confirm-password"
                type={showConfPass ? "text" : "password"}
                value={confPassword}
                placeholder="Confirm Password"
                className="primary-border w-[85%] rounded-xl p-2 font-bold lg:w-[95%]"
                required
              />
              <button
                onClick={() => setShowConfPass(!showConfPass)}
                type="button"
                className={cn(
                  "primary-border flex h-10 w-10 items-center justify-center rounded-lg",
                  "cursor-auto md:cursor-pointer",
                )}
                aria-label={
                  showPassword
                    ? "Hide Confirm Password"
                    : "Show Confirm Password"
                }
              >
                <img
                  src={
                    theme === "dark"
                      ? !showConfPass
                        ? darkVisiSvg
                        : darkVisiHideSvg
                      : !showConfPass
                        ? lightVisiSvg
                        : lightVisiHideSvg
                  }
                  alt={
                    showConfPass
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                />
              </button>
            </div>
          </fieldset>

          <div className="flex h-[10%] items-center justify-center">
            <a href="/login" className="text-lg font-bold underline">
              Already have an account?
            </a>
          </div>

          <div className="flex h-[10%] items-center justify-center">
            <button
              onClick={() => signupClick()}
              type="submit"
              className={cn(
                "primary-border w-30 rounded-lg p-2 font-bold",
                "cursor-auto md:cursor-pointer",
                "md:w-50",
              )}
            >
              Sign Up
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

export default SignupPage;
