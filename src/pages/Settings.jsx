import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition transform hover:scale-110"
        >
          ⬅️
        </button>
        <h1 className="text-3xl font-bold mb-2 text-center">⚙️ Settings</h1>
        <p className="mb-6 text-center text-gray-400">
          Adjust your preferences and manage your account settings.
        </p>
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            <label className="text-lg">Dark Mode</label>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-lg ${darkMode ? "bg-green-600" : "bg-gray-600"}`}
            >
              {darkMode ? "Enabled ✅" : "Disabled ❌"}
            </button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <label className="text-lg">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            >
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center">Account Settings</h2>
        <div className="flex justify-center">
          <button className="px-4 py-2 bg-red-600 rounded-lg">🚪 Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
