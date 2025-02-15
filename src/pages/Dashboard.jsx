import { useState } from "react";
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
      {notes.length === 0 ? <NoNotes /> : <NotesList {...{ pinnedNotes, unpinnedNotes, deleteNote, togglePin }} />}
    </div>
  );
}

export default Dashboard;
