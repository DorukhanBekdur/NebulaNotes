import { Link } from "react-router-dom";
import useNoteStore from "../store/useNoteStore";

function Dashboard() {
  const { notes, deleteNote } = useNoteStore();

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-primary flex items-center">
          📒 My Notes
        </h1>
        <Link to="/note/new" className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md">
          🗒️ New
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
            <div className="flex-1 text-white">
              {note.content}
            </div>
            <div className="flex gap-2">
              <Link to={`/note/${note.id}`} className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-md">
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
