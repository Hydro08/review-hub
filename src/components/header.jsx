function HeaderNav({ open, setOpen, theme }) {
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div
      className={`w-full h-[10vh] light-b-border flex justify-between items-center p-4 sticky top-0 left-0 z-10 ${theme === "light" ? "light-bg" : "dark-bg"}`}
    >
      <h1 className="font-bold">Review Hub</h1>

      <button
        className="md:hidden w-10 h-10 light-border font-bold rounded-lg"
        onClick={handleClick}
      >
        {open ? "X" : "≡"}
      </button>

      <ul className="hidden md:flex justify-center items-center gap-10">
        <li>Home</li>
        <li>About</li>
        <li>Dashboard</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}

export { HeaderNav };
