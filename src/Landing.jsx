import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "./lib/cn";

import { HeaderNav } from "./components/Header";
import { MobileMenu } from "./components/MobileMenu";
import { SettingMenu } from "./components/SettingMenu";

import { useTheme } from "./context/ThemeContext";

import supabase from "./lib/supabase";

import "./App.css";

function App() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState(null);

  const testClick = () => {
    alert("test");
  };

  const buttonBase = "h-12 rounded-lg primary-border opacity-80 font-bold";

  const primaryTransition = "transition-all duration-300 ease-in";
  const hoverSet = "hover:shadow-md";
  const shadowTheme = theme === "light" ? "shadow-black" : "shadow-white";

  const sectionVariants = {
    hidden: { opacity: 0, x: -300 },
    show: { opacity: 1, x: 0 },
  };

  const btnVariants = {
    popOut: { opacity: 0, scale: 0.5 },
    popIn: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        document.body.style.overflow = "unset";
      } else if (window.innerWidth <= 768) {
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
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflowY = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <main
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center",
        theme === "dark" ? "dark-bg text-white" : "light-bg text-black",
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
          theme === "dark" ? "dark-bg text-white" : "light-bg text-black",
        )}
      >
        <div className="flex h-[10%] w-full items-center justify-center">
          <motion.h1
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className={cn(
              "font-bold tracking-tight transition-all ease-linear",
              "text-3xl md:text-4xl lg:text-5xl",
            )}
          >
            Learn It. Keep It.
          </motion.h1>
        </div>

        <div
          className={cn(
            "flex h-[40%] w-full flex-col items-center justify-center",
            "gap-2 px-4 md:gap-6 md:px-8",
          )}
        >
          <motion.p
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className={cn(
              "font-bold transition-all ease-linear",
              "text-sm md:text-lg lg:text-xl",
            )}
          >
            Stop re-reading and wasting hours on notes that never stick. With
            interactive flashcards designed for active recall and spaced
            repetition, learning becomes faster, easier, and more effective.
          </motion.p>

          <motion.p
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className={cn(
              "font-bold transition-all ease-linear",
              "text-sm md:text-lg lg:text-xl",
            )}
          >
            Turn your lessons into bite-sized cards that challenge your memory,
            not your patience. Review smarter, track your progress, and actually
            remember what you study—whether it's for exams, skills, or daily
            learning.
          </motion.p>

          <motion.p
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className={cn(
              "font-bold transition-all ease-linear",
              "text-sm md:text-lg lg:text-xl",
            )}
          >
            Study less. Retain more. Because learning shouldn't feel like
            starting from zero every time.
          </motion.p>
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
            onClick={testClick}
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
            className={cn(
              "font-bold transition-all ease-linear",
              "text-sm md:text-lg lg:text-xl",
            )}
          >
            No credit card required. Learn at your own pace.
          </motion.p>
        </div>
      </section>

      <section
        id="aboutSect"
        className={cn(
          "flex h-[90vh] w-full scroll-mt-[10vh] flex-col items-center justify-center gap-4 text-center",
          primaryTransition,
          theme === "dark" ? "dark-bg text-white" : "light-bg text-black",
        )}
      >
        <motion.h1
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className={cn(
            "font-bold tracking-tight transition-all ease-linear",
            "text-2xl md:text-4xl lg:text-5xl",
          )}
        >
          Organize, Share, Collaborate
        </motion.h1>
        <motion.p
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className={cn(
            "font-medium transition-all ease-linear",
            "text-sm md:text-lg lg:text-xl",
          )}
        >
          Review-Hub is a platform designed to help users create, manage, and
          share their content effortlessly. Whether you’re reviewing, studying,
          or collaborating, Review-Hub makes it simple and interactive.
        </motion.p>
        <motion.ul
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className={cn(
            "flex list-inside flex-col gap-2 p-2 font-bold tracking-tight transition-all ease-linear",
            "text-2xl md:text-4xl lg:text-5xl",
          )}
        >
          Features:
          <motion.li
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className={cn(
              "list-disc text-left font-medium transition-all ease-linear",
              "text-sm md:text-lg lg:text-xl",
            )}
          >
            <strong>Decks & Flashcards</strong> — Create and organize decks with
            text or image flashcards.
          </motion.li>
          <motion.li
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className={cn(
              "list-disc text-left font-medium transition-all ease-linear",
              "text-sm md:text-lg lg:text-xl",
            )}
          >
            <strong> Edit / Delete Decks & Flashcards</strong> — Update or
            remove entire decks or individual flashcards anytime.
          </motion.li>
          <motion.li
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className={cn(
              "list-disc text-left font-medium transition-all ease-linear",
              "text-sm md:text-lg lg:text-xl",
            )}
          >
            <strong> Search / Filter Decks </strong>— Quickly find the deck you
            need.
          </motion.li>
          <motion.li
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className={cn(
              "list-disc text-left font-medium transition-all ease-linear",
              "text-sm md:text-lg lg:text-xl",
            )}
          >
            <strong> Progress Tracking / Stats</strong> — Keep track of reviewed
            flashcards and your activity.
          </motion.li>
          <motion.li
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5 }}
            className={cn(
              "list-disc text-left font-medium transition-all ease-linear",
              "text-sm md:text-lg lg:text-xl",
            )}
          >
            <strong>Chat Feature (Coming Soon)</strong> — Collaborate and
            discuss with other users in real-time.
          </motion.li>
        </motion.ul>
        <motion.h1
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className={cn(
            "font-bold tracking-tight transition-all ease-linear",
            "text-2xl md:text-4xl lg:text-5xl",
          )}
        >
          Goal:
        </motion.h1>
        <motion.p
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className={cn(
            "font-semibold transition-all ease-linear",
            "text-sm md:text-lg lg:text-xl",
          )}
        >
          Our goal is to provide a user-friendly space where managing, sharing,
          and collaborating on content is simple and fun.
        </motion.p>
      </section>

      <section
        id="contactSect"
        className={cn(
          "flex h-[90vh] w-full scroll-mt-[10vh]",
          primaryTransition,
          theme === "dark" ? "dark-bg text-white" : "light-bg text-black",
        )}
      >
        <h1>Working</h1>
      </section>

      <footer className="flex h-[10vh] w-full items-center justify-center font-bold">
        <p>
          &copy; {new Date().getFullYear()} Review Hub. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default App;
