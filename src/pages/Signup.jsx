import { useState, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "../lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingDots } from "../components/Loading";

import supabase from "../lib/supabase";

import lightModeSvg from "../assets/light-mode.svg";
import darkModeSvg from "../assets/dark-mode.svg";
import lightVisiSvg from "../assets/light-visi.svg";
import darkVisiSvg from "../assets/dark-visi.svg";
import lightVisiHideSvg from "../assets/light-visi-hide.svg";
import darkVisiHideSvg from "../assets/dark-visi-hide.svg";

function SignupPage() {
  const navigate = useNavigate();
  const inputs = useRef([]);
  const { theme, setTheme } = useTheme();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [otp, setOtp] = useState(Array(8).fill(""));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [countDown, setCountDown] = useState(0);
  const [resendError, setResendError] = useState("");
  const [toast, setToast] = useState({
    show: false,
    success: true,
    message: "",
  });

  const isLight = theme === "light";
  const themeBg = isLight ? "light-bg text-black" : "dark-bg text-white";
  const primaryTransition = "transition-all duration-300 ease-in";

  const showToast = (success, message = "") => {
    setToast({ show: true, success, message });
    setTimeout(
      () => setToast({ show: false, success: true, message: "" }),
      3000,
    );
  };

  const startCountdown = (onComplete) => {
    setCountDown(60);
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const signupHandle = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      showToast(false, "Password do not match.");
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) {
      setIsLoading(false);
      showToast(false);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      username,
      email,
    });

    if (profileError) console.error("Profile error:", profileError.message);

    setIsLoading(false);
    showToast(true);
    setShowOtpModal(true);
  };

  const handleVerify = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp.join(""),
      type: "signup",
    });

    if (error) {
      showToast(false);
      return;
    }
    navigate("/login");
  };

  const resendOtp = async () => {
    const { error } = await supabase.auth.resend({ type: "signup", email });

    if (error) {
      setResendError("For security purposes, you can only request this after ");
      startCountdown(() => setResendError(""));
      return;
    }

    setCanResend(false);
    setResendError("");
    startCountdown(() => setCanResend(true));
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 7) inputs.current[index + 1].focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").slice(0, 8).split("");
    const newOtp = Array(8).fill("");
    pasted.forEach((char, i) => (newOtp[i] = char));
    setOtp(newOtp);
    inputs.current[Math.min(pasted.length, 7)].focus();
  };

  const visiSrc = (show) =>
    isLight
      ? show
        ? lightVisiHideSvg
        : lightVisiSvg
      : show
        ? darkVisiHideSvg
        : darkVisiSvg;

  const inputBase = cn(
    "primary-border rounded-xl p-2 font-bold w-[90%] md:w-full",
    isLight ? "placeholder-black" : "placeholder-white",
  );

  const passwordInputBase = cn(
    "primary-border rounded-xl p-2 font-bold w-[85%] lg:w-[95%]",
    isLight ? "placeholder-black" : "placeholder-white",
  );

  return (
    <main className={cn("min-h-screen w-full", themeBg, primaryTransition)}>
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
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className={cn(
              "primary-border flex h-10 w-18 items-center justify-center gap-1 rounded-lg font-bold",
              "cursor-auto md:cursor-pointer",
            )}
          >
            <img src={isLight ? lightModeSvg : darkModeSvg} alt="theme" />
            {isLight ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => navigate("/")}
            className={cn(
              "primary-border h-10 w-10 cursor-pointer rounded-lg font-bold",
              isLight ? "bg-red-400" : "bg-red-600",
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
              className={inputBase}
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
              className={inputBase}
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
                className={passwordInputBase}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(
                  "primary-border flex h-10 w-10 items-center justify-center rounded-lg",
                  "cursor-auto md:cursor-pointer",
                )}
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
                <img src={visiSrc(showPassword)} alt="" />
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
                className={passwordInputBase}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfPass(!showConfPass)}
                className={cn(
                  "primary-border flex h-10 w-10 items-center justify-center rounded-lg",
                  "cursor-auto md:cursor-pointer",
                )}
                aria-label={
                  showConfPass
                    ? "Hide Confirm Password"
                    : "Show Confirm Password"
                }
              >
                <img src={visiSrc(showConfPass)} alt="" />
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
                showOtpModal ? "pointer-events-none" : "pointer-events-auto",
              )}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-1">
                  Loading <LoadingDots />
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        {showOtpModal && (
          <div
            className={cn(
              "primary-border absolute top-[50%] left-[50%] flex h-[50vh] w-[70%] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center gap-4 rounded-lg p-6 shadow-lg",
              themeBg,
            )}
          >
            <h1 className="text-4xl">OTP</h1>
            <span className="text-sm">(One Time Pin)</span>
            <div className="flex flex-wrap justify-center gap-1">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  onPaste={handlePaste}
                  className={cn(
                    "primary-border h-12 rounded-lg text-center text-xl font-bold",
                    "w-8 md:w-10",
                  )}
                />
              ))}
            </div>
            <button
              onClick={resendOtp}
              disabled={!canResend}
              className="primary-b-border cursor-pointer p-2 font-bold"
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
              className="primary-border cursor-pointer rounded-lg p-2 font-bold"
            >
              Verify
            </button>
          </div>
        )}

        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(
                "fixed right-5 bottom-5 z-50 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-lg",
                toast.success ? "bg-green-500" : "bg-red-500",
              )}
            >
              {toast.success
                ? "✅ Account created! Check your email for OTP."
                : `❌ ${toast.message}`}
            </motion.div>
          )}
        </AnimatePresence>
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
