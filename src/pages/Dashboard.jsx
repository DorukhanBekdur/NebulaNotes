import { Link } from "react-router-dom";
import { useState } from "react";
import useNoteStore from "../store/useNoteStore";
import logo from "../assets/logo.png";

function Dashboard() {
  const { notes, deleteNote } = useNoteStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Arama kriterine göre notları filtrele
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img src={logo} alt="NebulaNotes Logo" className="w-50 h-50 mr-2" />
          <h1 className="text-4xl font-bold text-primary flex items-center">
            NebulaNotes
          </h1>
        </div>
        <Link
          to="/note/new"
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md"
        >
          <span className="text-white">➕</span> New
        </Link>
      </div>
      
      <div className="relative mb-4">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400">
          🔍
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Notlarda ara..."
          className="w-full pl-10 p-2 rounded-lg border border-gray-700 bg-gray-800 text-white"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
          >
            <div className="flex-1 text-white">{note.content}</div>
            <div className="flex gap-2">
              <Link
                to={`/note/${note.id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-md"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={() => deleteNote(note.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all shadow-md"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
