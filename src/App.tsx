import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Analytics } from "@vercel/analytics/react";
import { Home, Task } from "./pages";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
