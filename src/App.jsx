import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
