import lightModeSvg from "../assets/light-mode.svg";
import darkModeSvg from "../assets/dark-mode.svg";
import { useNavigate } from "react-router-dom";
// import { cn } from "../lib/cn";
function MobileMenu({ menuOpen, setOpen, theme, setTheme }) {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const setOpenHandle = () => {
    setOpen(!menuOpen);
  };

  return (
    <>
      <div
        className={`primary-b-border fixed left-0 z-10 flex h-[60vh] w-full flex-col justify-center transition-all duration-300 ease-linear md:hidden ${menuOpen ? "top-[10vh]" : "top-[-70vh]"} ${theme === "light" ? "light-bg" : "dark-bg"}`}
      >
        <div className="flex h-[60%] w-full items-center justify-center">
          <ul className="flex flex-col items-center justify-center gap-5">
            <li
              onClick={() => {
                scrollToSection("homeSect");
                setOpenHandle();
              }}
              className="primary-border rounded-lg px-4 py-2 font-bold"
            >
              HOME
            </li>
            <li
              onClick={() => {
                scrollToSection("aboutSect");
                setOpenHandle();
              }}
              className="primary-border rounded-lg px-4 py-2 font-bold"
            >
              ABOUT
            </li>
            <li
              onClick={() => {
                scrollToSection("dashboardSect");
                setOpenHandle();
              }}
              className="primary-border rounded-lg px-4 py-2 font-bold"
            >
              DASHBOARD
            </li>
            <li
              onClick={() => {
                scrollToSection("contactSect");
                setOpenHandle();
              }}
              className="primary-border rounded-lg px-4 py-2 font-bold"
            >
              CONTACT
            </li>
          </ul>
        </div>
        <div className="flex h-[20%] w-full items-center justify-center">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="primary-border flex h-15 w-30 items-center justify-center gap-1 rounded-xl font-bold"
          >
            <img
              src={theme === "light" ? lightModeSvg : darkModeSvg}
              alt="light-mode"
            />
            {theme === "light" ? "☀️" : "🌙"}
          </button>
        </div>
        <div className="flex h-[20%] w-full items-center justify-center gap-10">
          <button
            onClick={() => {
              navigate("/login");
              setOpenHandle();
            }}
            className="primary-border h-15 w-30 rounded-xl font-bold"
          >
            Log In
          </button>
          <button className="primary-border h-15 w-30 rounded-xl font-bold">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
export { MobileMenu };
