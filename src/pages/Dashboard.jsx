import { Link } from "react-router-dom";
import { useState } from "react";
import useNoteStore from "../store/useNoteStore";
import NoteCard from "./NoteCard";
import logo from "../assets/logo.png";
import mascot from "../assets/maskot.png";

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
  const unpinnedNotes = filteredNotes.filter((note) => !note.pinned);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg shadow-lg mb-6 backdrop-blur-sm">
          <div className="flex items-center mb-4 sm:mb-0">
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
          <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">No Notes Yet</h2>
              <p className="text-lg mb-6">
                You haven't created any notes. Click the button below to get
                started!
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
