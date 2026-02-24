import lightModeSvg from "../assets/light-mode.svg";
import darkModeSvg from "../assets/dark-mode.svg";
function HeaderNav({ open, setOpen, theme, setTheme }) {
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div
      className={`w-full h-[10vh] primary-b-border flex justify-between items-center p-4 sticky top-0 left-0 z-10 transition-all duration-300 ease-linear ${theme === "light" ? "light-bg" : "dark-bg"}`}
    >
      <div className="w-[40%]">
        <h1 className="font-bold">Review Hub</h1>
      </div>

      <button
        className="md:hidden w-10 h-10 primary-border font-bold rounded-lg"
        onClick={handleClick}
      >
        {open ? "X" : "≡"}
      </button>

      <div className="hidden md:flex justify-center items-center gap-5">
        <button
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
          className="w-23 h-10 primary-border rounded-xl font-semibold flex justify-center items-center gap-1 cursor-pointer"
        >
          <img
            src={theme === "light" ? lightModeSvg : darkModeSvg}
            alt="light-mode"
          />
          {theme === "light" ? "light" : "dark"}
        </button>
        <ul className="flex justify-center items-center gap-5">
          <li className="primary-border rounded-xl py-2 px-3 font-semibold cursor-pointer">
            Home
          </li>
          <li className="primary-border rounded-xl py-2 px-3 font-semibold cursor-pointer">
            About
          </li>
          <li className="primary-border rounded-xl py-2 px-3 font-semibold cursor-pointer">
            Dashboard
          </li>
          <li className="primary-border rounded-xl py-2 px-3 font-semibold cursor-pointer">
            Contact
          </li>
        </ul>
      </div>
    </div>
  );
}

export { HeaderNav };
