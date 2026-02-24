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
    const saveTheme = localStorage.getItem("theme");
    if (saveTheme) {
      setTheme(saveTheme);
    }
  }, []);

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
      <HeaderNav open={menuOpen} setOpen={setMenuOpen} theme={theme} />
      <section
        className={`h-[90vh] w-full flex relative ${theme === "dark" ? "dark-bg text-white" : "light-bg text-black"}`}
      >
        <MobileMenu menuOpen={menuOpen} theme={theme} setTheme={setTheme} />
        <h1>Test</h1>
      </section>
      <section className="h-[90vh] w-full flex">
        <h1>Test Two</h1>
      </section>
    </div>
  );
}

export default App;
