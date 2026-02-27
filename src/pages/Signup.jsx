import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/cn";

import supabase from "../lib/supabase";

import lightModeSvg from "../assets/light-mode.svg";
import darkModeSvg from "../assets/dark-mode.svg";
import lightVisiSvg from "../assets/light-visi.svg";
import darkVisiSvg from "../assets/dark-visi.svg";
import lightVisiHideSvg from "../assets/light-visi-hide.svg";
import darkVisiHideSvg from "../assets/dark-visi-hide.svg";

function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const { theme, setTheme } = useTheme();
  const themeBg =
    theme === "light" ? "light-bg text-black" : "dark-bg text-white";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [otpCode, setOtpCode] = useState(false);

  const signupHandle = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      console.log(error.message);
      return;
    }

    setShowOtpModal(true);
  };

  const handleVerify = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "signup",
    });

    if (error) {
      console.log(error.message);
      return;
    }

    navigate("/home");
  };

  const signupClick = () => {
    alert("Under Development Pa bro!!!");
  };

  const [showOtpModal, setShowOtpModal] = useState(false);

  return (
    <main className={cn("min-h-screen w-full", themeBg)}>
      <header className="primary-b-border flex h-[10vh] items-center justify-center">
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
      <section className="primary-b-border relative flex h-[100vh] w-full items-center justify-center p-4">
        <form
          onSubmit={signupHandle}
          className="flex h-full w-full flex-col items-center justify-center"
        >
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={cn(
                "primary-border rounded-xl p-2 font-bold",
                "w-[90%] md:w-full",
                theme === "light" ? "placeholder-black" : "placeholder-white",
              )}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "primary-border rounded-xl p-2 font-bold",
                "w-[90%] md:w-full",
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
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input Password"
                className={cn(
                  "primary-border rounded-xl p-2 font-bold",
                  "w-[85%] lg:w-[95%]",
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
                id="confirm-password"
                name="confirm-password"
                type={showConfPass ? "text" : "password"}
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="Confirm Password"
                className={cn(
                  "primary-border rounded-xl p-2 font-bold",
                  "w-[85%] lg:w-[95%]",
                  theme === "light" ? "placeholder-black" : "placeholder-white",
                )}
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
        <div>
          {showOtpModal && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                />
                <button>Verify</button>
              </div>
            </div>
          )}
        </div>
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
