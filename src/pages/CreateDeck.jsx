import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";
import { useNavigate } from "react-router-dom";

function CreateDeckPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const isLight = theme === "light";

  return (
    <main
      className={cn(
        "min-h-screen w-full",
        isLight ? "light-bg black-text" : "dark-bg text-white",
      )}
    >
      <h1>Test</h1>
      <button onClick={() => navigate(-1)}>Back button</button>
    </main>
  );
}

export default CreateDeckPage;
