import { Link } from "react-router-dom";
import { useState } from "react";
import useNoteStore from "../store/useNoteStore";
import logo from "../assets/logo.png";
import mascot from "../assets/maskot.png";

function NoteCard({ note, deleteNote, togglePin }) {
  return (
    <div
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg 
                 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 
                 h-80 overflow-hidden flex flex-col"
    >
      {note.image && (
        <img
          src={note.image}
          alt="Note"
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <div className="flex-1 overflow-hidden">
        <p className="mb-4 text-sm sm:text-base break-words line-clamp-3">
          {note.content}
        </p>
      </div>
      <div className="mb-2 text-xs text-gray-400">
        <span>
          Created: {new Date(note.createdAt).toLocaleString("en-US")}
        </span>
        <br />
        <span>
          Updated: {new Date(note.updatedAt).toLocaleString("en-US")}
        </span>
      </div>
      <div className="flex justify-end space-x-3">
        <Link
          to={`/note/${note.id}`}
          className="px-4 py-2 font-semibold text-sm text-white rounded-md shadow-md bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
          title="Edit note"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={() => togglePin(note.id)}
          className="px-4 py-2 font-semibold text-sm text-white rounded-md shadow-md bg-yellow-700 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-600 hover:shadow-lg"
          title={note.pinned ? "Unpin note" : "Pin note"}
        >
          <span className="mr-2">📌</span>
          {note.pinned ? "Unpin" : "Pin"}
        </button>
        <button
          onClick={() => deleteNote(note.id)}
          className="px-4 py-2 font-semibold text-sm text-white rounded-md shadow-md bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 hover:shadow-lg"
          title="Delete note"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const { notes, deleteNote, togglePin } = useNoteStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.pinned);

  if (notes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">No Notes Yet</h2>
          <p className="text-lg mb-6">
            You haven't created any notes. Click the button below to get started!
          </p>
          <Link
            to="/note/new"
            className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-md shadow-md text-white font-semibold hover:scale-105 transition transform"
            title="Create a new note"
          >
            ➕ New Note
          </Link>
          <img
            src={mascot}
            alt="Mascot"
            className="w-100 h-100 mx-auto opacity-80 mt-8"
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        
        <header className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg shadow-lg mb-6 backdrop-blur-sm">
          <div className="flex items-center">
            <img src={logo} alt="NebulaNotes Logo" className="w-12 h-12 mr-3" />
            <h1 className="text-4xl font-bold">NebulaNotes</h1>
          </div>
          <Link
            to="/note/new"
            className="flex items-center font-semibold text-white rounded-md shadow-md bg-gradient-to-r from-gray-700 to-gray-800 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg px-4 py-2"
            title="Create a new note"
          >
            <span className="mr-2">➕</span> New Note
          </Link>
        </header>
 
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {pinnedNotes.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Pinned Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  deleteNote={deleteNote}
                  togglePin={togglePin}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">All Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {unpinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                togglePin={togglePin}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
