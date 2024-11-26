import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Home, Task } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks/:tasksId" element={<Task />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default App;
