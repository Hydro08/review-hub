import { useState } from "react";
import { useEffect } from "react";
import { HeaderNav } from "./components/header";
import { MobileMenu } from "./components/MobileMenu";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.style.overflowY = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center ${theme === "dark" ? "dark-bg text-white" : "light-bg text-black"} `}
    >
      <HeaderNav open={menuOpen} setOpen={setMenuOpen} theme={theme} />
      <section className="min-h-screen w-full flex relative">
        <MobileMenu menuOpen={menuOpen} theme={theme} setTheme={setTheme} />
      </section>
    </div>
  );
}

export default App;
