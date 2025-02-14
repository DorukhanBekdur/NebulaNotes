import { create } from "zustand";

const useNoteStore = create((set, get) => ({
  notes: [],
  addNote: (noteData) => {
    const newNote = {
      id: Date.now(),
      content: noteData.content,
      image: noteData.image || null,
      folder: noteData.folder,
      tags: noteData.tags,
      attachments: noteData.attachments || [],
      pinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set({ notes: [...get().notes, newNote] });
  },
  updateNote: (id, updatedData) => {
    set({
      notes: get().notes.map((note) =>
        note.id === id
          ? { ...note, ...updatedData, updatedAt: new Date() }
          : note
      ),
    });
  },
  deleteNote: (id) => {
    set({ notes: get().notes.filter((note) => note.id !== id) });
  },
  togglePin: (id) => {
    set({
      notes: get().notes.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned, updatedAt: new Date() }
          : note
      ),
    });
  },
}));

export default useNoteStore;
