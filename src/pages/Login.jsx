import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";

function LoginPage() {
  const { theme } = useTheme();
  const themeBg =
    theme === "light" ? "light-bg text-black" : "dark-bg text-white";
  return (
    <>
      <div
        className={cn(
          "flex h-screen w-screen flex-col items-center justify-center",
          themeBg,
        )}
      >
        <div className="primary-b-border flex h-[10vh] w-full items-center justify-center">
          <h1 className="text-3xl font-bold tracking-wide">Log In</h1>
        </div>
        <form
          action=""
          className="flex h-[80vh] w-full flex-col items-center justify-center p-4"
        >
          <div className="items-left flex h-full w-full flex-col justify-center gap-2">
            <label htmlFor="">Username</label>
            <input
              type="text"
              placeholder="Input Username"
              className="primary-border w-[90%] rounded-xl p-2 font-bold"
            />
          </div>
          <div className="items-left flex h-full w-full flex-col justify-center gap-2">
            <label htmlFor="">Password</label>
            <div>
              {" "}
              {/* Last touch */}
              <input
                type="password"
                placeholder="Input Password"
                className="primary-border w-[85%] rounded-xl p-2 font-bold"
              />
              <button>Eye</button>
            </div>
          </div>
        </form>
        <div className="h-[10vh] w-full bg-orange-300">
          <h1>Test</h1>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
