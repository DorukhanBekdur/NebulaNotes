import NoteCard from "../pages/NoteCard";

const NotesList = ({ pinnedNotes, unpinnedNotes, deleteNote, togglePin }) => {
  return (
    <>
      {pinnedNotes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Pinned Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} deleteNote={deleteNote} togglePin={togglePin} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">All Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {unpinnedNotes.map((note) => (
            <NoteCard key={note.id} note={note} deleteNote={deleteNote} togglePin={togglePin} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotesList;
