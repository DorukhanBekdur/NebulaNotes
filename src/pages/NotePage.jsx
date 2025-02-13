import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useNoteStore from "../store/useNoteStore";

function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, addNote, updateNote } = useNoteStore();
  
  const isNewNote = id === "new";
  const existingNote = !isNewNote ? notes.find((n) => n.id === parseInt(id)) : null;
  const [content, setContent] = useState(existingNote ? existingNote.content : "");

  const handleSave = () => {
    if (isNewNote) {
      addNote({ content });
    } else {
      updateNote(existingNote.id, content);
    }
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-primary">
        {isNewNote ? "New Note" : "✏️ Edit Note"}
      </h1>
      <textarea 
        className="w-full h-40 p-3 border rounded-lg mt-4 shadow-sm bg-gray-800 text-white" 
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button 
        onClick={handleSave}
        className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md"
      >
        💾 Save
      </button>
    </div>
  );
}

export default NotePage;
