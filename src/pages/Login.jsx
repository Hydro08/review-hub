import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/cn";

function LoginPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const themeBg =
    theme === "light" ? "light-bg text-black" : "dark-bg text-white";

  return (
    <main
      className={cn(
        "flex h-screen w-screen flex-col items-center justify-center",
        themeBg,
      )}
    >
      <header className="primary-b-border flex h-[10vh] w-full items-center justify-center">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-3xl font-bold tracking-wide"
        >
          Review Hub
        </h1>
      </header>

      <section className="primary-b-border flex h-[80vh] w-full items-center justify-center p-4">
        <form className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-[10%] w-full flex-col items-center justify-center">
            <h2 className="text-3xl font-bold">Log In</h2>
            <p className="text-center">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <fieldset className="flex h-[25%] w-full flex-col justify-center gap-2 border-none">
            <label htmlFor="username" className="text-lg font-bold">
              Username / Email
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Input Username"
              className="primary-border w-[90%] rounded-xl p-2 font-bold lg:w-full"
            />
          </fieldset>

          <fieldset className="flex h-[25%] w-full flex-col justify-center gap-2 border-none">
            <label htmlFor="password" className="text-lg font-bold">
              Password
            </label>
            <div className="flex items-center gap-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Input Password"
                className="primary-border w-[85%] rounded-xl p-2 font-bold lg:w-[95%]"
              />
              <button
                type="button"
                className="primary-border h-10 w-10 rounded-lg"
              >
                Eye
              </button>
            </div>
          </fieldset>

          <div className="mb-5 flex h-[10%] w-full items-center justify-start gap-2 md:cursor-pointer">
            <input id="remember" type="checkbox" name="remember" />
            <label htmlFor="remember" className="font-bold">
              Remember Me
            </label>
          </div>

          <div className="flex h-[10%] items-center justify-center">
            <a href="/forgot-password" className="text-lg font-bold underline">
              Forgot Password
            </a>
          </div>

          <div className="flex h-[10%] items-center justify-center">
            <a href="/register" className="text-lg font-bold underline">
              Don't have an account?
            </a>
          </div>

          <div className="flex h-[10%] items-center justify-center">
            <button
              type="submit"
              className={cn(
                "primary-border w-30 rounded-lg p-2 font-bold",
                "cursor-auto md:cursor-pointer",
                "md:w-50",
              )}
            >
              Log In
            </button>
          </div>
        </form>
      </section>

      <footer className="flex h-[10vh] w-full items-center justify-center font-bold">
        <p>
          &copy; {new Date().getFullYear()} Review Hub. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default LoginPage;
