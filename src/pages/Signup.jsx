import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [resendError, setResendError] = useState("");
  const [countDown, setCountDown] = useState(0);
  const { theme, setTheme } = useTheme();
  const themeBg =
    theme === "light" ? "light-bg text-black" : "dark-bg text-white";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const signupHandle = async (e) => {
    e.preventDefault();

    if (passwordHandle()) return;

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      setIsLoading(false);
      alert(error.message);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      username,
      email,
    });

    if (profileError) {
      console.log("Profile error:", profileError.message);
    }

    setIsLoading(false);
    setShowOtpModal(true);
  };

  const passwordHandle = () => {
    if (password !== confPassword) {
      alert("Password doesn't match");
      return true;
    }
    return false;
  };

  const handleVerify = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "signup",
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/login");
  };

  const resendOtp = async () => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      setResendError("For security purposes, you can only request this after ");
      setCountDown(60);

      const interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setResendError("");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return;
    }

    setCanResend(false);
    setResendError("");
    setCountDown(60);

    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const [showOtpModal, setShowOtpModal] = useState(false);

  return (
    <main
      className={cn(
        "min-h-screen w-full transition-all duration-300 ease-linear",
        themeBg,
      )}
    >
      <header className="primary-b-border flex h-[10vh] items-center justify-center">
        <div
          className={cn(
            "flex h-full items-center justify-center",
            "w-[55%] md:w-[80%]",
          )}
        >
          <h1
            className={cn(
              "cursor-pointer font-bold tracking-wide",
              "text-2xl md:text-3xl lg:text-4xl",
            )}
          >
            Review Hub
          </h1>
        </div>
        <div
          className={cn(
            "flex h-full items-center justify-end gap-5 px-6",
            "w-[40%] md:w-[30%] lg:w-[20%]",
          )}
        >
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
              "primary-border flex h-10 w-18 items-center justify-center gap-1 rounded-lg font-bold",
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
              "primary-border h-10 w-10 cursor-pointer rounded-lg font-bold",
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
            <Link to="/login" className="text-lg font-bold underline">
              Already have an account?
            </Link>
          </div>

          <div className="flex h-[10%] items-center justify-center">
            <button
              type="submit"
              className={cn(
                "primary-border w-30 rounded-lg p-2 font-bold",
                "cursor-auto md:cursor-pointer",
                "md:w-50",
              )}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div>
          {showOtpModal && (
            <div
              className={cn(
                "primary-border absolute top-[50%] left-[50%] flex h-[50vh] w-[70%] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center gap-4 rounded-lg p-6 shadow-lg",
                themeBg,
              )}
            >
              <h1 className="text-4xl">OTP</h1>
              <span className="text-sm">(One Time Pin)</span>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="primary-border h-10 w-full rounded-lg p-2 text-center font-bold"
                aria-label="OTP Input"
              />
              <button
                onClick={resendOtp}
                disabled={!canResend}
                className="primary-border rounded-lg p-2 font-bold"
              >
                {canResend ? "Resend OTP" : `Resend in ${countDown}s`}
              </button>
              {resendError && (
                <p className="text-sm text-red-500">
                  {resendError}
                  {countDown}s.
                </p>
              )}
              <button
                onClick={handleVerify}
                className="primary-border rounded-lg p-2 font-bold"
              >
                Verify
              </button>
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
