import { Link } from "react-router-dom";
import { cn } from "../lib/cn";
import { useTheme } from "../context/ThemeContext";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import supabase from "../lib/supabase";

import {
  lightModeSvg,
  darkModeSvg,
  LightForgotPng,
  DarkForgotPng,
  LightSendSvg,
  DarkSendSvg,
} from "../assets/images";

function ForgotPasswordPage() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";
  const primaryTransition = "transition-all duration-300 ease-in";
  const inputBase = cn(
    "primary-border min-h-[40px] rounded-lg px-3 font-semibold",
    "w-full md:w-[60%]",
    isLight ? "placeholder-black" : "placeholder-white",
  );

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(8).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    success: true,
    message: "",
  });
  const inputs = useRef([]);

  const showToast = (success, message) => {
    setToast({ show: true, success, message });
    setTimeout(
      () => setToast({ show: false, success: true, message: "" }),
      3000,
    );
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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .single();

    if (fetchError || !data) {
      showToast(false, "Email not found.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setIsLoading(false);
    if (error) {
      showToast(false, error.message);
      return;
    }
    showToast(true, "OTP sent! Check your email.");
    setStep(2);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp.join(""),
      type: "recovery",
    });

    setIsLoading(false);
    if (error) {
      showToast(false, "Invalid OTP code.");
      return;
    }
    showToast(true, "OTP verified!");
    setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast(false, "Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setIsLoading(false);
    if (error) {
      showToast(false, error.message);
      return;
    }
    showToast(true, "Password updated successfully!");
    setTimeout(() => (window.location.href = "/login"), 1500);
  };

  return (
    <main
      className={cn(
        "min-h-screen w-full",
        isLight ? "light-bg text-black" : "dark-bg text-white",
        primaryTransition,
      )}
    >
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 300 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "fixed right-5 bottom-5 z-50 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-lg",
              toast.success ? "bg-green-500" : "bg-red-500",
            )}
          >
            {toast.success ? "✅" : "❌"} {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
      <header className="primary-b-border flex min-h-[15vh] items-center justify-center px-2">
        <div className="w-[10vw]">
          <Link to="/login">
            <p className={cn("underline", "text-base md:text-xl lg:text-2xl")}>
              Login
            </p>
          </Link>
        </div>
        <div className="flex w-[80vw] items-center justify-center">
          <h1 className={cn("text-xl lg:text-3xl")}>Review Hub</h1>
        </div>
        <div>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
              "primary-border flex w-18 items-center justify-center gap-1 rounded-lg font-bold",
              "h-8 lg:h-10",
              "cursor-auto md:cursor-pointer",
            )}
          >
            <img src={isLight ? lightModeSvg : darkModeSvg} alt="theme" />
            {isLight ? "☀️" : "🌙"}
          </button>
        </div>
      </header>
      <section className="min-h-[85vh] w-full">
        <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-5 px-4">
          <img src={isLight ? LightForgotPng : DarkForgotPng} alt="" />
          <h1 className={cn("font-bold", "text-xl lg:text-2xl")}>
            {step === 1 && "Forgot Password"}
            {step === 2 && "Enter OTP Code"}
            {step === 3 && "Reset Password"}
          </h1>
          <p className="text-center font-semibold">
            {step === 1 &&
              "Please enter your email address to reset your password."}
            {step === 2 && `Enter the 8-digit code sent to ${email}`}
            {step === 3 && "Enter your new password."}
          </p>
        </div>

        <div className="flex min-h-[45vh] w-full flex-col items-stretch md:flex-row">
          <div
            className={cn(
              "primary-b-border md:primary-r-border md:primary-b-0 flex flex-col items-center justify-center gap-2 px-4 transition-all duration-500",
              "w-full py-6 md:py-0",
              step === 1
                ? "md:w-full"
                : step === 2
                  ? "md:w-[50%]"
                  : "md:w-[30%]",
            )}
          >
            {step === 1 ? (
              <form
                onSubmit={handleSendOtp}
                className="flex w-full flex-col items-center justify-center gap-2"
              >
                <div className={cn("flex items-center", "w-full md:w-[60%]")}>
                  <label className="text-2xl font-bold tracking-widest">
                    Email
                  </label>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={inputBase}
                  required
                />
                <button
                  type="submit"
                  className="primary-border flex items-center justify-center gap-2 rounded-lg px-6 py-2"
                >
                  {isLoading ? "Sending..." : "Continue"}
                  <img src={isLight ? LightSendSvg : DarkSendSvg} alt="send" />
                </button>
              </form>
            ) : (
              <p className="text-center font-semibold break-all opacity-50">
                {email}
              </p>
            )}
          </div>

          {step >= 2 && (
            <div
              className={cn(
                "primary-b-border md:primary-r-border flex flex-col items-center justify-center gap-4 px-4 transition-all duration-500",
                "w-full py-6 md:py-0",
                step === 2 ? "md:w-[50%]" : "md:w-[30%]",
              )}
            >
              {step === 2 ? (
                <form
                  onSubmit={handleVerifyOtp}
                  className="flex w-full flex-col items-center justify-center gap-4"
                >
                  <div>
                    <h1 className="text-base md:text-xl lg:text-2xl">
                      Enter your OTP
                    </h1>
                  </div>
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
                        className="primary-border h-12 w-10 rounded-lg text-center text-xl font-bold"
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="primary-border flex items-center justify-center gap-2 rounded-lg px-6 py-2"
                  >
                    {isLoading ? "Verifying..." : "Verify"}
                  </button>
                </form>
              ) : (
                <p className="text-center font-semibold opacity-50">
                  ✓ Verified
                </p>
              )}
            </div>
          )}

          {step >= 3 && (
            <div className="flex w-full flex-col items-center justify-center gap-2 px-4 py-6 transition-all duration-500 md:w-[40%] md:py-0">
              <form
                onSubmit={handleResetPassword}
                className="flex w-full flex-col items-center justify-center gap-2"
              >
                <div className="flex w-full items-center">
                  <label className="font-bold tracking-widest">
                    New Password
                  </label>
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={inputBase}
                  required
                />
                <div className="flex w-full items-center">
                  <label className="font-bold tracking-widest">
                    Confirm Password
                  </label>
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className={inputBase}
                  required
                />
                <button
                  type="submit"
                  className="primary-border flex items-center justify-center gap-2 rounded-lg px-6 py-2"
                >
                  {isLoading ? "Updating..." : "Reset Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default ForgotPasswordPage;
