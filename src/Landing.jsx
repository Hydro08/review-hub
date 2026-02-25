import { useState, useEffect } from "react";
import { HeaderNav } from "./components/header";
import { MobileMenu } from "./components/MobileMenu";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const testClick = () => {
    alert("test");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflowY = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center relative ${theme === "dark" ? "dark-bg text-white" : "light-bg text-black"} `}
    >
      <HeaderNav
        open={menuOpen}
        setOpen={setMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />

      <section
        className={`h-[90vh] w-full flex flex-col justify-center items-center relative gap-2 text-center px-2 md:px-10 transition-all duration-200 ease-linear ${theme === "dark" ? "dark-bg text-white" : "light-bg text-black"}`}
      >
        <MobileMenu menuOpen={menuOpen} theme={theme} setTheme={setTheme} />
        <h1 className="font-bold text-3xl md:text-6xl tracking-tight mb-5 transition-all duration-300 ease-linear">
          Learn It. Keep It.
        </h1>
        <p className="font-bold">
          Stop re-reading and wasting hours on notes that never stick. With
          interactive flashcards designed for active recall and spaced
          repetition, learning becomes faster, easier, and more effective.
        </p>
        <p className="font-bold">
          Turn your lessons into bite-sized cards that challenge your memory,
          not your patience. Review smarter, track your progress, and actually
          remember what you study—whether it’s for exams, skills, or daily
          learning.
        </p>
        <p className="font-bold">
          Study less. Retain more. Because learning shouldn’t feel like starting
          from zero every time.
        </p>
        <div className="w-full h-[17vh] flex flex-col justify-center items-center gap-1 md:flex-row gap:10">
          <button
            onClick={() => {
              testClick();
            }}
            aria-lab
            el="Get Started with Mind Mesh"
            className={`w-40 sm:w-60 h-16 md:w-40 h-12 rounded-lg font-bold md:cursor-pointer transition-all duration-300 ease-linear ${theme === "light" ? "dark-bg text-white" : "light-bg"} ${menuOpen ? "pointer-events-none" : "pointer-events-auto"}`}
          >
            Get Started
          </button>
          <button className="w-40 sm:w-60 h-16 md:w-40 h-12 primary-border rounded-lg opacity-80 font-bold md:cursor-pointer transition-all duration-300 ease-linear">
            Try Demo
          </button>
        </div>
        <p className="text-sm font-bold">
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
