import { useState, useEffect } from "react";
import { HeaderNav } from "./components/header";
import { MobileMenu } from "./components/MobileMenu";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflowY = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center ${theme === "dark" ? "dark-bg text-white" : "light-bg text-black"} `}
    >
      <HeaderNav
        open={menuOpen}
        setOpen={setMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />
      <section
        className={`h-[90vh] w-full flex flex-col justify-center items-center relative gap-5 p-10 text-center transition-all duration-300 ease-linear ${theme === "dark" ? "dark-bg text-white" : "light-bg text-black"}`}
      >
        <MobileMenu menuOpen={menuOpen} theme={theme} setTheme={setTheme} />
        <h1>Learn It. Keep It.</h1>
        <p>
          Stop re-reading and wasting hours on notes that never stick. With
          interactive flashcards designed for active recall and spaced
          repetition, learning becomes faster, easier, and more effective.
        </p>
        <p>
          Turn your lessons into bite-sized cards that challenge your memory,
          not your patience. Review smarter, track your progress, and actually
          remember what you study—whether it’s for exams, skills, or daily
          learning.
        </p>
        <p>
          Study less. Retain more. Because learning shouldn’t feel like starting
          from zero every time.
        </p>
        <div className="w-full h-[10vh] flex justify-center items-center gap-10">
          <button
            aria-label="Get Started with Mind Mesh"
            className={`w-40 h-12 rounded-xl font-semibold md:cursor-pointer transition-all duration-300 ease-linear ${theme === "light" ? "dark-bg text-white" : "light-bg"}`}
          >
            Get Started
          </button>
          <button className="w-40 h-12 primary-border rounded-xl opacity-80 font-semibold md:cursor-pointer">
            Try Demo
          </button>
        </div>
        <p className="text-sm mt-4">
          No credit card required. Learn at your own pace.
        </p>
      </section>
      <section
        className={`h-[90vh] w-full flex transition-all duration-300 ease-linear ${theme === "dark" ? "dark-bg text-white" : "light-bg text-black"}`}
      >
        <h1>Test Two</h1>
      </section>
    </div>
  );
}

export default App;
