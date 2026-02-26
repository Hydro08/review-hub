import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "./lib/cn";
import { HeaderNav } from "./components/Header";
import { MobileMenu } from "./components/MobileMenu";
import { useTheme } from "./context/ThemeContext";

import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const testClick = () => {
    alert("test");
  };

  const buttonBase =
    "h-12 w-40 rounded-lg font-bold transition-all duration-300 ease-in sm:w-60 md:w-40 md:cursor-pointer";

  const sectionVariants = {
    hidden: { opacity: 0, x: -300 },
    show: { opacity: 1, x: 0 },
  };

  const btnVariants = {
    popOut: { opacity: 0, scale: 0.5 },
    popIn: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflowY = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <div
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
      />

      <section
        id="homeSect"
        className={cn(
          "relative flex h-[90vh] w-full scroll-mt-[10vh] flex-col items-center justify-center gap-2 px-2 text-center transition-all duration-200 ease-in md:px-10",
          theme === "dark" ? "dark-bg text-white" : "light-bg text-black",
        )}
      >
        <MobileMenu
          menuOpen={menuOpen}
          setOpen={setMenuOpen}
          theme={theme}
          setTheme={setTheme}
        />

        <motion.h1
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className="mb-5 text-3xl font-bold tracking-tight md:text-6xl"
        >
          Learn It. Keep It.
        </motion.h1>

        <motion.p
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5 }}
          className="font-bold"
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
          className="font-bold"
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
          className="font-bold"
        >
          Study less. Retain more. Because learning shouldn't feel like starting
          from zero every time.
        </motion.p>

        <div className="flex h-[17vh] w-full flex-col items-center justify-center gap-2 md:flex-row">
          <motion.button
            variants={btnVariants}
            initial="popOut"
            whileInView="popIn"
            transition={{ duration: 0.2 }}
            onClick={testClick}
            aria-label="Get Started with Review Hub"
            className={cn(
              buttonBase,
              theme === "light" ? "dark-bg text-white" : "light-bg",
              menuOpen ? "pointer-events-none" : "pointer-events-auto",
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
              "primary-border opacity-80",
              menuOpen ? "pointer-events-none" : "pointer-events-auto",
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
          className="text-sm font-bold"
        >
          No credit card required. Learn at your own pace.
        </motion.p>
      </section>
      <section
        id="aboutSect"
        className={`flex h-[90vh] w-full scroll-mt-[10vh] transition-all duration-300 ease-in ${theme === "dark" ? "dark-bg text-white" : "light-bg text-black"}`}
      >
        <h1>Test Two</h1>
      </section>
      <section
        id="dashboardSect"
        className={`flex h-[90vh] w-full scroll-mt-[10vh] transition-all duration-300 ease-in ${theme === "dark" ? "dark-bg text-white" : "light-bg text-black"}`}
      >
        <h1>Test Three</h1>
      </section>
      <section
        id="contactSect"
        className={`flex h-[90vh] w-full scroll-mt-[10vh] transition-all duration-300 ease-in ${theme === "dark" ? "dark-bg text-white" : "light-bg text-black"}`}
      >
        <h1>Test Four</h1>
      </section>
    </div>
  );
}

export default App;
