import { useNavigate } from "react-router-dom";
import useNoteStore from "../store/useNoteStore";
import NoteCard from "../pages/NoteCard";

const Starred = () => {
  const navigate = useNavigate();
  const { notes } = useNoteStore();
  const starredNotes = notes.filter((note) => note.pinned);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition transform hover:scale-110"
        >
          ⬅️
        </button>
        <h1 className="text-3xl font-bold mb-2 text-center">⭐ Starred Notes</h1>
        <p className="mb-6 text-center text-gray-400">
          Quickly access your important notes that you've pinned.
        </p>
        {starredNotes.length > 0 ? (
          <>
            <p className="text-center mb-4 text-gray-400">
              Total Starred Notes: {starredNotes.length}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {starredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center">You haven't starred any notes yet.</p>
        )}
      </div>
    </div>
  );
};

export default Starred;
