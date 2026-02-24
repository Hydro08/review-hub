import lightModeSvg from "../assets/light-mode.svg";
import darkModeSvg from "../assets/dark-mode.svg";
function MobileMenu({ menuOpen, theme, setTheme }) {
  return (
    <>
      <div
        className={`md:hidden h-[60vh] w-full flex flex-col justify-center light-b-border absolute left-0 transition-all duration-500 ${menuOpen ? "top-0" : "top-[-70vh]"} ${theme === "light" ? "light-bg" : "dark-bg"}`}
      >
        <div className="w-full h-[60%] flex justify-center items-center">
          <ul className="flex flex-col justify-center items-center gap-5">
            <li className="light-border p-2 rounded-lg font-bold">HOME</li>
            <li className="light-border p-2 rounded-lg font-bold">ABOUT</li>
            <li className="light-border p-2 rounded-lg font-bold">DASHBOARD</li>
            <li className="light-border p-2 rounded-lg font-bold">CONTACT</li>
          </ul>
        </div>
        <div className="w-full h-[20%] flex justify-center items-center">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-30 h-15 light-border rounded-xl font-bold flex justify-center items-center gap-1"
          >
            <img
              src={theme === "light" ? lightModeSvg : darkModeSvg}
              alt="light-mode"
            />
            {theme === "light" ? "Light" : "Dark"}
          </button>
        </div>
        <div className="w-full h-[20%] flex justify-center items-center gap-10">
          <button className="w-30 h-15 light-border rounded-xl font-bold">
            Login
          </button>
          <button className="w-30 h-15 light-border rounded-xl font-bold">
            Signup
          </button>
        </div>
      </div>
    </>
  );
}
export { MobileMenu };
