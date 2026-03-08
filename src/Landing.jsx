import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./lib/cn";

import emailjs from "@emailjs/browser";

import { HeaderNav } from "./components/Header";
import { MobileMenu } from "./components/MobileMenu";
import { SettingMenu } from "./components/SettingMenu";
import { useTheme } from "./context/ThemeContext";
import { LoadingDots } from "./components/Loading";

import {
  LightEmailSvg,
  DarkEmailSvg,
  LightSendSvg,
  DarkSendSvg,
  LightGithubPng,
  DarkGithubPng,
  LightFacebookPng,
  DarkFacebookPng,
} from "./assets/images";

import supabase from "./lib/supabase";
import "./App.css";

const HOME_TEXTS = [
  "Stop re-reading and wasting hours on notes that never stick. With interactive flashcards designed for active recall and spaced repetition, learning becomes faster, easier, and more effective.",
  "Turn your lessons into bite-sized cards that challenge your memory, not your patience. Review smarter, track your progress, and actually remember what you study—whether it's for exams, skills, or daily learning.",
  "Study less. Retain more. Because learning shouldn't feel like starting from zero every time.",
];

const FEATURES = [
  {
    label: "Decks & Flashcards",
    desc: "Create and organize decks with text or image flashcards.",
  },
  {
    label: "Edit / Delete Decks & Flashcards",
    desc: "Update or remove entire decks or individual flashcards anytime.",
  },
  { label: "Search / Filter Decks", desc: "Quickly find the deck you need." },
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
];

const CONTACT_LINKS = [
  {
    href: "https://mail.google.com/mail/?view=cm&to=darwinsumait38@gmail.com",
    lightSrc: LightEmailSvg,
    darkSrc: DarkEmailSvg,
    alt: "email-logo",
    label: "darwinsumait38@gmail.com",
  },
  {
    href: "https://github.com/hydro08",
    lightSrc: LightGithubPng,
    darkSrc: DarkGithubPng,
    alt: "github-logo",
    label: "github.com/hydro08",
  },
  {
    href: "https://facebook.com/hydro0708",
    lightSrc: LightFacebookPng,
    darkSrc: DarkFacebookPng,
    alt: "facebook-logo",
    label: "facebook.com/hydro0708",
  },
];

const FORM_FIELDS = [
  { key: "name", label: "NAME", type: "text", placeholder: "Your name" },
  {
    key: "email",
    label: "EMAIL",
    type: "email",
    placeholder: "your@email.com",
  },
];

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

const ud = () => {
  alert("Under Development :D");
};

function App() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [sendHovered, setSendHovered] = useState(false);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ show: false, success: true });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isLight = theme === "light";
  const primaryTransition = "transition-all duration-300 ease-in";
  const themeBg = isLight ? "light-bg text-black" : "dark-bg text-white";
  const buttonBase = "h-12 rounded-lg primary-border opacity-80 font-bold";
  const hoverText = isLight ? "hover:text-black" : "hover:text-white";
  const shadowTheme = isLight ? "shadow-black" : "shadow-white";

  const inputClass = cn(
    "rounded-lg primary-border bg-transparent px-4 py-3 text-sm transition-colors focus:primary-border focus:outline-none font-semibold",
    isLight
      ? "placeholder:text-black text-black"
      : "placeholder:text-white text-white",
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        document.body.style.overflow = "unset";
        if (!user) setSettingOpen(false);
      } else {
        setSettingOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

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

  useEffect(() => {
    const handler = () => {
      if (menuOpen) setMenuOpen(false);
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  useEffect(() => {
    const handler = () => {
      if (settingOpen) setSettingOpen(false);
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  });

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
        { ...formData, time: new Date().toLocaleString() },
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

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      alert("Log in or Sign up first.");
      navigate("/login");
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
              ? "✅ Message sent successfully!"
              : "❌ Please fill in all fields."}
          </motion.div>
        )}
      </AnimatePresence>
      <section
        id="homeSect"
        className={cn(
          "relative flex min-h-screen w-full scroll-mt-[10vh] flex-col items-center justify-center gap-6 py-10 text-center",
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
          Learn It. Keep It.
        </motion.h1>

        <div className="flex w-full flex-col items-center justify-center gap-2 px-4 md:gap-6 md:px-8">
          {HOME_TEXTS.map((text, i) => (
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

        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
          <motion.button
            variants={btnVariants}
            initial="popOut"
            whileInView="popIn"
            transition={{ duration: 0.2 }}
            onClick={handleGetStarted}
            aria-label="Get Started with Review Hub"
            className={cn(
              buttonBase,
              "w-40 hover:shadow-md sm:w-60 md:w-40 md:cursor-pointer",
              menuOpen ? "pointer-events-none" : "pointer-events-auto",
              theme === "light" ? "dark-bg text-white" : "light-bg text-black",
              primaryTransition,
              shadowTheme,
            )}
          >
            Get Started
          </motion.button>

          <motion.button
            onClick={ud}
            variants={btnVariants}
            initial="popOut"
            whileInView="popIn"
            transition={{ duration: 0.2 }}
            aria-label="Demo with Review Hub"
            className={cn(
              buttonBase,
              "w-40 hover:shadow-md sm:w-60 md:w-40 md:cursor-pointer",
              menuOpen ? "pointer-events-none" : "pointer-events-auto",
              primaryTransition,
              shadowTheme,
            )}
          >
            Feed
          </motion.button>

          <motion.button
            onClick={ud}
            variants={btnVariants}
            initial="popOut"
            whileInView="popIn"
            transition={{ duration: 0.2 }}
            aria-label="Demo with Review Hub"
            className={cn(
              buttonBase,
              "w-40 hover:shadow-md sm:w-60 md:w-40 md:cursor-pointer",
              menuOpen ? "pointer-events-none" : "pointer-events-auto",
              primaryTransition,
              shadowTheme,
            )}
          >
            Try Demo
          </motion.button>
        </div>

        <motion.p
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className="text-sm font-bold transition-all ease-linear md:text-lg lg:text-xl"
        >
          No credit card required. Learn at your own pace.
        </motion.p>
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
          {FEATURES.map(({ label, desc }, i) => (
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
            {CONTACT_LINKS.map(({ href, lightSrc, darkSrc, alt, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
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
                  <img src={isLight ? lightSrc : darkSrc} alt={alt} />
                </span>
                {label}
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {FORM_FIELDS.map(({ key, label, type, placeholder }, i) => (
              <motion.div
                key={key}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                transition={{ duration: 0.4, delay: (i + 1) * 0.1 }}
                className="flex flex-col gap-1"
              >
                <label className="text-xs font-bold tracking-widest">
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className={inputClass}
                />
              </motion.div>
            ))}

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
                  ? isLight
                    ? "dark-bg text-white"
                    : "light-bg text-black"
                  : "",
              )}
            >
              {sending ? (
                <span className="flex items-center justify-center gap-1">
                  Sending <LoadingDots />
                </span>
              ) : (
                "SEND MESSAGE"
              )}
              <img
                src={
                  sendHovered
                    ? isLight
                      ? DarkSendSvg
                      : LightSendSvg
                    : isLight
                      ? LightSendSvg
                      : DarkSendSvg
                }
                alt="Send-Icon"
              />
            </motion.button>
          </div>
        </div>
      </section>

      <footer
        className={cn(
          "flex min-h-[10vh] w-full flex-col items-center justify-center font-bold",
          primaryTransition,
          isLight ? "light-bg" : "dark-bg",
        )}
      >
        <p>
          &copy; {new Date().getFullYear()} Review Hub. All rights reserved.
        </p>
        <p className="text-base">
          Icons by{" "}
          <a href="https://flaticon.com" target="_blank" className="underline">
            Flaticon
          </a>
        </p>
      </footer>
    </main>
  );
}

export default App;
