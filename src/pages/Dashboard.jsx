import { useState } from "react";
import { Link } from "react-router-dom";
import useNoteStore from "../store/useNoteStore";
import Header from "../components/Header";
import NoteFilters from "../components/NoteFilters";
import NoNotes from "../components/NoNotes";
import NotesList from "../components/NoteList";

function Dashboard() {
  const { notes, deleteNote, togglePin } = useNoteStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [folderFilter, setFolderFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const pinnedNotes = notes.filter((note) => note.pinned);
  const unpinnedNotes = notes.filter((note) => !note.pinned);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Header />
      <NoteFilters {...{ searchQuery, setSearchQuery, folderFilter, setFolderFilter, tagFilter, setTagFilter }} />

      {notes.length === 0 ? (
        <NoNotes />
      ) : (
        <>
          <NotesList {...{ pinnedNotes, unpinnedNotes, deleteNote, togglePin }} />

          <div className="fixed bottom-8 right-8">
            <Link
              to="/note/new"
              className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              ➕ Create New Note
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
