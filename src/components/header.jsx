import lightModeSvg from "../assets/light-mode.svg";
import darkModeSvg from "../assets/dark-mode.svg";
function HeaderNav({ open, setOpen, theme, setTheme }) {
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div
      className={`primary-b-border sticky top-0 left-0 z-10 flex h-[10vh] w-full items-center justify-between p-4 transition-all duration-300 ease-linear ${theme === "light" ? "light-bg" : "dark-bg"}`}
    >
      <div className="w-[60%]">
        <h1 className="text-2xl font-bold tracking-tight">Review Hub</h1>
      </div>

      <button
        className="primary-border h-10 w-10 rounded-lg font-bold md:hidden"
        onClick={handleClick}
      >
        {open ? "X" : "≡"}
      </button>

      <div className="hidden items-center justify-center gap-5 md:flex">
        <button
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
          className="primary-border flex h-10 w-23 cursor-pointer items-center justify-center gap-1 rounded-xl font-semibold"
        >
          <img
            src={theme === "light" ? lightModeSvg : darkModeSvg}
            alt="light-mode"
          />
          {theme === "light" ? "light" : "dark"}
        </button>
        <ul className="flex items-center justify-center gap-5">
          <li className="primary-border cursor-pointer rounded-xl px-3 py-2 font-semibold">
            Home
          </li>
          <li className="primary-border cursor-pointer rounded-xl px-3 py-2 font-semibold">
            About
          </li>
          <li className="primary-border cursor-pointer rounded-xl px-3 py-2 font-semibold">
            Dashboard
          </li>
          <li className="primary-border cursor-pointer rounded-xl px-3 py-2 font-semibold">
            Contact
          </li>
        </ul>
        <div className="">
          <button>Log In</button>
          <button>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export { HeaderNav };
