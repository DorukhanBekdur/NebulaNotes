import { create } from "zustand";

const useNoteStore = create((set) => ({
  notes: [],

  addNote: (note) =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          id: Date.now(),
          pinned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          image: note.image || null,
          ...note,
        },
      ],
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),

  updateNote: (id, updatedContent, updatedImage) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              content: updatedContent,
              image: updatedImage,
              updatedAt: new Date(),
            }
          : note
      ),
    })),

  togglePin: (id) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      ),
    })),

  reorderNotes: (newNotesOrder) => set({ notes: newNotesOrder }),
}));

export default useNoteStore;
