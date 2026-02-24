import { useState } from "react";
import { HeaderTest } from "./components/header";
import "./App.css";

function App() {
  return (
    <>
      <div className="min-h-screen w-full bg-orange-500">
        <HeaderTest />
      </div>
    </>
  );
}

export default App;
