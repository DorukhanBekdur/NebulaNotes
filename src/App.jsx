import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl p-6 shadow-2xl bg-gray-700 rounded-lg">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;