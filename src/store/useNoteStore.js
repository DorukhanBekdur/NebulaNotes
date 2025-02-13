import { create } from "zustand";

const useNoteStore = create((set) => ({
  notes: [
    { id: 1, content: "İlk not" },
    { id: 2, content: "İkinci not" },
  ],

  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, { id: Date.now(), ...note }],
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),

  updateNote: (id, updatedContent) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content: updatedContent } : note
      ),
    })),
}));

export default useNoteStore;
