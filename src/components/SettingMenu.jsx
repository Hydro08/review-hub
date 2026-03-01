import { cn } from "../lib/cn";
import { useTheme } from "../context/ThemeContext";

function SettingMenu({ settingOpen }) {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={cn(
          "primary-border fixed top-[10vh] right-0 z-10 h-[30vh] transition-all duration-500 ease-in",
          //   duty tom
          "hidden md:flex",
          settingOpen
            ? "pointer-events-auto opacity-100 md:flex md:w-[20%] lg:w-[15%]"
            : "pointer-events-none opacity-0",
          theme === "light" ? "light-bg" : "dark-bg",
        )}
      >
        <h1 className="cursor-pointer">Settings</h1>
      </div>
    </>
  );
}

export { SettingMenu };
