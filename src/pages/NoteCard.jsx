import { Link } from "react-router-dom";

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
        {note.folder && (
          <div className="text-xs text-gray-400 mb-2">
            Folder: {note.folder}
          </div>
        )}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-700 rounded px-2 py-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {note.attachments && note.attachments.length > 0 && (
          <div className="mt-2">
            <h3 className="text-xs mb-1">Attachments:</h3>
            <ul className="list-disc list-inside text-xs">
              {note.attachments.map((att) => (
                <li key={att.id}>
                  {att.fileType.startsWith("image/") ? (
                    <img
                      src={att.fileData}
                      alt={att.fileName}
                      className="w-full max-h-40 object-contain"
                    />
                  ) : (
                    <a
                      href={att.fileData}
                      download={att.fileName}
                      className="text-indigo-400 underline"
                    >
                      {att.fileName}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
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

export default NoteCard;
