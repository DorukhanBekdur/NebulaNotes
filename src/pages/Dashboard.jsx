import { Link } from "react-router-dom";
import { useState } from "react";
import useNoteStore from "../store/useNoteStore";
import NoteCard from "./NoteCard";
import logo from "../assets/logo.png";
import emptyStateImage from "../assets/emptyPhoto.svg"; 

function Dashboard() {
  const { notes, deleteNote, togglePin } = useNoteStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [folderFilter, setFolderFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFolder = folderFilter
      ? note.folder?.toLowerCase() === folderFilter.toLowerCase()
      : true;
    const matchesTag = tagFilter
      ? note.tags?.some((tag) => tag.toLowerCase() === tagFilter.toLowerCase())
      : true;
    return matchesSearch && matchesFolder && matchesTag;
  });

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const unpinnedNotes = filteredNotes.filter((note) => !pinnedNotes.includes(note));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-md shadow-lg rounded-xl p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="NebulaNotes Logo" className="w-12 h-12" />
            <h1 className="text-4xl font-extrabold text-white tracking-wide glow-text">
              NebulaNotes
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-3 w-12 h-12 bg-gray-800 hover:bg-gray-700 transition shadow-md flex items-center justify-center rounded-md">
              <span className="text-white text-xl">📂</span>
            </button>
            <button className="p-3 w-12 h-12 bg-gray-800 hover:bg-gray-700 transition shadow-md flex items-center justify-center rounded-md">
              <span className="text-white text-xl">⭐</span>
            </button>
            <button className="p-3 w-12 h-12 bg-gray-800 hover:bg-gray-700 transition shadow-md flex items-center justify-center rounded-md">
              <span className="text-white text-xl">⚙️</span>
            </button>
            <Link
              to="/profile"
              className="p-3 w-12 h-12 bg-gray-800 hover:bg-purple-600 transition shadow-md flex items-center justify-center rounded-md"
            >
              <span className="text-white text-xl">👤</span>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="text"
            value={folderFilter}
            onChange={(e) => setFolderFilter(e.target.value)}
            placeholder="Filter by folder..."
            className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="text"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            placeholder="Filter by tag..."
            className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {notes.length === 0 ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-white text-center">
            <img src={emptyStateImage} alt="No Notes Yet" className="w-48 h-48 opacity-80 mb-6" />
            <h2 className="text-3xl font-bold">Start Your Journey 🚀</h2>
            <p className="text-lg text-gray-400 max-w-md mt-2 mb-6">
              You don’t have any notes yet. Click the button below to create your first note and organize your thoughts!
            </p>
            <Link
              to="/note/new"
              className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              ➕ Create a Note
            </Link>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
