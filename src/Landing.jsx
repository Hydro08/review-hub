import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "./lib/cn";
import emailjs from "@emailjs/browser";

import { HeaderNav } from "./components/Header";
import { MobileMenu } from "./components/MobileMenu";
import { SettingMenu } from "./components/SettingMenu";

import { useTheme } from "./context/ThemeContext";

import LightEmailSvg from "./assets/light-email.svg";
import DarkEmailSvg from "./assets/dark-email.svg";
import LightSendSvg from "./assets/light-send.svg";
import DarkSendSvg from "./assets/dark-send.svg";
import LightGithubPng from "./assets/light-github.png";
import DarkGithubPng from "./assets/dark-github.png";
import LightFacebookPng from "./assets/light-facebook.png";
import DarkFacebookPng from "./assets/dark-facebook.png";

import supabase from "./lib/supabase";

import "./App.css";

function App() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [sendHovered, setSendHovered] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ show: false, success: true });

  const primaryTransition = "transition-all duration-300 ease-in";
  const themeBg =
    theme === "dark" ? "dark-bg text-white" : "light-bg text-black";
  const buttonBase = "h-12 rounded-lg primary-border opacity-80 font-bold";
  const hoverSet = "hover:shadow-md";
  const shadowTheme = theme === "light" ? "shadow-black" : "shadow-white";
  const inputClass = cn(
    "rounded-lg primary-border bg-transparent px-4 py-3 text-sm transition-colors focus:primary-border focus:outline-none",
    theme === "light"
      ? "placeholder:text-black text-black font-semibold"
      : "placeholder:text-white text-white font-semibold",
  );

  const hoverText = theme === "dark" ? "hover:text-white" : "hover:text-black";

  const sectionVariants = {
    hidden: { opacity: 0, x: -300 },
    show: { opacity: 1, x: 0 },
  };

  const btnVariants = {
    popOut: { opacity: 0, scale: 0.5 },
    popIn: { opacity: 1, scale: 1 },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        document.body.style.overflow = "unset";
      } else {
        setSettingOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflowY = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const showToast = (success) => {
    setToast({ show: true, success });
    setTimeout(() => setToast({ show: false, success: true }), 3000);
  };

  const handleSend = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      showToast(false);
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          time: new Date().toLocaleString(),
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      showToast(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      showToast(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <main
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center",
        themeBg,
      )}
    >
      <HeaderNav
        open={menuOpen}
        setOpen={setMenuOpen}
        theme={theme}
        setTheme={setTheme}
        settingOpen={settingOpen}
        setSettingOpen={setSettingOpen}
      />

      <MobileMenu
        menuOpen={menuOpen}
        setOpen={setMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />

      <SettingMenu settingOpen={settingOpen} setSettingOpen={setSettingOpen} />

      <section
        id="homeSect"
        className={cn(
          "relative flex h-[100vh] w-full scroll-mt-[10vh] flex-col items-center justify-center gap-4 text-center",
          primaryTransition,
          themeBg,
        )}
      >
        <div className="flex h-[10%] w-full items-center justify-center">
          <motion.h1
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight transition-all ease-linear md:text-4xl lg:text-5xl"
          >
            Learn It. Keep It.
          </motion.h1>
        </div>

        <div className="flex h-[40%] w-full flex-col items-center justify-center gap-2 px-4 md:gap-6 md:px-8">
          {[
            "Stop re-reading and wasting hours on notes that never stick. With interactive flashcards designed for active recall and spaced repetition, learning becomes faster, easier, and more effective.",
            "Turn your lessons into bite-sized cards that challenge your memory, not your patience. Review smarter, track your progress, and actually remember what you study—whether it's for exams, skills, or daily learning.",
            "Study less. Retain more. Because learning shouldn't feel like starting from zero every time.",
          ].map((text, i) => (
            <motion.p
              key={i}
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.5 }}
              className="text-sm font-bold transition-all ease-linear md:text-lg lg:text-xl"
            >
              {text}
            </motion.p>
          ))}
        </div>

        <div className="flex h-[30%] w-full flex-col items-center justify-center gap-2 md:flex-row">
          <motion.button
            variants={btnVariants}
            initial="popOut"
            whileInView="popIn"
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (user) {
                navigate("/dashboard");
              } else {
                alert("Log in or Sign up first.");
                navigate("/login");
              }
            }}
            aria-label="Get Started with Review Hub"
            className={cn(
              buttonBase,
              "w-40 sm:w-60 md:w-40 md:cursor-pointer",
              menuOpen ? "pointer-events-none" : "pointer-events-auto",
              primaryTransition,
              hoverSet,
              shadowTheme,
            )}
          >
            Get Started
          </motion.button>

          <motion.button
            variants={btnVariants}
            initial="popOut"
            whileInView="popIn"
            transition={{ duration: 0.2 }}
            aria-label="Demo with Review Hub"
            className={cn(
              buttonBase,
              "w-40 sm:w-60 md:w-40 md:cursor-pointer",
              menuOpen ? "pointer-events-none" : "pointer-events-auto",
              primaryTransition,
              hoverSet,
              shadowTheme,
            )}
          >
            Try Demo
          </motion.button>
        </div>

        <div className="h-[20%] w-full">
          <motion.p
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className="text-sm font-bold transition-all ease-linear md:text-lg lg:text-xl"
          >
            No credit card required. Learn at your own pace.
          </motion.p>
        </div>
      </section>

      <section
        id="aboutSect"
        className={cn(
          "flex min-h-[90vh] w-full scroll-mt-[10vh] flex-col items-center justify-center gap-2 p-2 text-center",
          primaryTransition,
          themeBg,
        )}
      >
        <motion.h1
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight transition-all ease-linear md:text-4xl lg:text-5xl"
        >
          Organize, Share, Collaborate
        </motion.h1>

        <motion.p
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className="text-sm font-medium transition-all ease-linear md:text-lg lg:text-xl"
        >
          Review-Hub is a platform designed to help users create, manage, and
          share their content effortlessly. Whether you're reviewing, studying,
          or collaborating, Review-Hub makes it simple and interactive.
        </motion.p>

        <motion.ul
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className="flex list-inside flex-col gap-2 p-2 text-3xl font-bold tracking-tight transition-all ease-linear md:text-4xl lg:text-5xl"
        >
          Features:
          {[
            {
              label: "Decks & Flashcards",
              desc: "Create and organize decks with text or image flashcards.",
            },
            {
              label: "Edit / Delete Decks & Flashcards",
              desc: "Update or remove entire decks or individual flashcards anytime.",
            },
            {
              label: "Search / Filter Decks",
              desc: "Quickly find the deck you need.",
            },
            {
              label: "Progress Tracking / Stats",
              desc: "Keep track of reviewed flashcards and your activity.",
            },
            {
              label: "Image & Text Support",
              desc: "Users can add either text or images for more interactive and visual flashcards.",
            },
            {
              label: "Favorites / Bookmark Decks",
              desc: "Mark important flashcards or decks for quick access later.",
            },
            {
              label: "Chat Feature (Coming Soon)",
              desc: "Collaborate and discuss with other users in real-time.",
            },
          ].map(({ label, desc }, i) => (
            <motion.li
              key={i}
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.5 }}
              className="list-disc text-left text-sm font-medium transition-all ease-linear md:text-lg lg:text-xl"
            >
              <strong>{label}</strong> — {desc}
            </motion.li>
          ))}
        </motion.ul>

        <motion.h1
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight transition-all ease-linear md:text-4xl lg:text-5xl"
        >
          Our Goal
        </motion.h1>

        <motion.p
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold transition-all ease-linear md:text-lg lg:text-xl"
        >
          Our goal is to provide a user-friendly space where organizing,
          sharing, and collaborating on content is simple, efficient, and
          enjoyable.
        </motion.p>
      </section>

      <section
        id="contactSect"
        className={cn(
          "flex min-h-[100vh] w-full scroll-mt-[10vh] items-center justify-center",
          primaryTransition,
          themeBg,
        )}
      >
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "fixed top-20 right-4 z-50 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-lg",
              toast.success ? "bg-green-500" : "bg-red-500",
            )}
          >
            {toast.success
              ? "✅ Message sent successfully!"
              : "❌ Please fill in all fields."}
          </motion.div>
        )}

        <div
          className="flex w-full max-w-xl flex-col gap-8 px-8 py-16 md:px-12"
          id="contact"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-2 text-center text-3xl font-semibold md:text-4xl lg:text-5xl">
              Get In Touch
            </h3>
            <p className="primary-text text-center text-sm">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {[
              {
                href: "https://mail.google.com/mail/?view=cm&to=darwinsumait38@gmail.com",
                lightSrc: LightEmailSvg,
                darkSrc: DarkEmailSvg,
                alt: "email-logo",
                label: "darwinsumait38@gmail.com",
                target: "_blank",
              },
              {
                href: "https://github.com/hydro08",
                lightSrc: LightGithubPng,
                darkSrc: DarkGithubPng,
                alt: "github-logo",
                label: "github.com/hydro08",
                target: "_blank",
              },
              {
                href: "https://facebook.com/hydro0708",
                lightSrc: LightFacebookPng,
                darkSrc: DarkFacebookPng,
                alt: "facebook-logo",
                label: "facebook.com/hydro0708",
                target: "_blank",
              },
            ].map(({ href, lightSrc, darkSrc, alt, label, target }, i) => (
              <motion.a
                key={i}
                href={href}
                target={target}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={cn(
                  "primary-text flex items-center gap-3 transition-colors",
                  hoverText,
                )}
              >
                <span>
                  <img src={theme === "light" ? lightSrc : darkSrc} alt={alt} />
                </span>
                {label}
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col gap-1"
            >
              <label className="text-xs font-bold tracking-widest">NAME</label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={inputClass}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col gap-1"
            >
              <label className="text-xs font-bold tracking-widest">EMAIL</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={inputClass}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col gap-1"
            >
              <label className="text-xs font-bold tracking-widest">
                MESSAGE
              </label>
              <textarea
                placeholder="Your message..."
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={cn(inputClass, "resize-none")}
              />
            </motion.div>

            <motion.button
              variants={btnVariants}
              initial="popOut"
              whileInView="popIn"
              transition={{ duration: 0.3, delay: 0.4 }}
              onClick={handleSend}
              disabled={sending}
              onMouseEnter={() => setSendHovered(true)}
              onMouseLeave={() => setSendHovered(false)}
              className={cn(
                "primary-border flex cursor-pointer items-center justify-center gap-1 self-start rounded-lg px-6 py-3 text-sm font-semibold tracking-widest transition-all disabled:opacity-50",
                sendHovered
                  ? theme === "light"
                    ? "dark-bg text-white"
                    : "light-bg text-black"
                  : "",
              )}
            >
              {sending ? "SENDING..." : "SEND MESSAGE"}
              <img
                src={
                  sendHovered
                    ? theme === "light"
                      ? DarkSendSvg
                      : LightSendSvg
                    : theme === "light"
                      ? LightSendSvg
                      : DarkSendSvg
                }
                alt="Send-Icon"
              />
            </motion.button>
          </div>
        </div>
      </section>

      <motion.footer
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.5 }}
        className="flex h-[10vh] w-full items-center justify-center font-bold"
      >
        <p>
          &copy; {new Date().getFullYear()} Review Hub. All rights reserved.
        </p>
      </motion.footer>
    </main>
  );
}

export default App;
