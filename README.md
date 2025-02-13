# NebulaNotes

NebulaNotes is a modern, user-friendly note-taking application that leverages cutting-edge web technologies to provide an intuitive and seamless note management experience. With features like creating, editing, deleting, searching, and pinning notes, NebulaNotes is designed to help you stay organized and efficient.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling](#styling)
- [Contact](#contact)

## Introduction

NebulaNotes is a single-page application (SPA) built with React that allows you to manage your notes effortlessly. Whether you need to quickly jot down an idea or manage detailed information, NebulaNotes offers a robust set of tools to make note-taking a breeze.

## Features

- **Create and Edit Notes:** Easily add new notes or modify existing ones using an intuitive interface.
- **Delete Notes:** Remove unwanted or obsolete notes quickly.
- **Pin/Unpin Notes:** Keep your most important notes accessible by pinning them.
- **Search and Filter:** Quickly search through your notes with a powerful search function that filters based on content.
- **Image Attachment:** Enhance your notes by attaching images for additional context.
- **Responsive Design:** Enjoy a seamless experience on both desktop and mobile devices, thanks to a responsive layout built with TailwindCSS.

## Technologies Used

- **React:** For building a dynamic and responsive user interface.
- **React Router:** For managing in-app routing and creating a seamless single-page application experience.
- **Zustand:** A lightweight state management library to handle global application state.
- **TailwindCSS:** For rapid and responsive UI development using utility-first CSS classes.
- **JavaScript (ES6+):** Leveraging modern JavaScript features for clean and efficient code.

## Installation

To run NebulaNotes locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/DorukhanBekdur/nebulanotes.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd nebulanotes
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
   **or**
   ```bash
   yarn install
   ```
4. **Start the Application:**
   ```bash
   npm start
   ```
   **or**
   ```bash
   yarn start
   ```

## Usage

Once the application is running, you can:

- **View Notes:** The dashboard displays all your created notes, divided into pinned and unpinned sections.
- **Create a New Note:** Click the "New Note" button to open the note creation page.
- **Edit Existing Notes:** Click on the "Edit" button on a note card to modify the note’s content or image.
- **Pin/Unpin Notes:** Toggle the pinned status of any note to keep your important notes accessible.
- **Delete Notes:** Remove a note by clicking the delete button on the note card.
- **Search Notes:** Use the search bar to filter through your notes by content.

## Project Structure

The project is organized into the following main components:

- **src/**
  - **assets/**: Contains images and other static assets.
  - **pages/**: Houses the main pages of the application, such as `Dashboard.jsx` and `NotePage.jsx`.
  - **store/**: Contains the Zustand store (`useNoteStore.js`) for state management.
  - **App.jsx**: The root component that sets up routing.
  - **index.js**: The entry point of the application.

## State Management

NebulaNotes uses [Zustand](https://github.com/pmndrs/zustand) for global state management. The state includes:

- **Notes Array:** Stores all notes with properties such as `id`, `content`, `createdAt`, `updatedAt`, `pinned`, and an optional `image`.
- **CRUD Operations:** Functions to add, update, delete, and toggle the pinned status of notes.

Below is an overview of the state management implementation:

```javascript
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
```

## Routing

NebulaNotes uses [React Router](https://reactrouter.com/) to manage navigation between different views in the application. The routing setup allows users to switch between the dashboard and the note creation/editing page seamlessly.

Below is an example of how routing is configured in the project:

```jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
```
## Styling

NebulaNotes is styled using [TailwindCSS](https://tailwindcss.com/), a utility-first CSS framework that speeds up development and ensures a responsive design.

### Key Aspects

- **Utility-First Approach:**  
  TailwindCSS provides a comprehensive set of utility classes that enable rapid styling directly in your JSX/HTML, reducing the need for custom CSS.

- **Responsive Design:**  
  With built-in responsive utilities (like `sm:`, `md:`, `lg:`, and `xl:`), TailwindCSS helps you create layouts that adapt seamlessly to different screen sizes.

- **Customization:**  
  TailwindCSS can be easily customized via its configuration file to match your project’s design requirements, including colors, spacing, and typography.

### Example Usage

Below is an example demonstrating how TailwindCSS is used to style a component in NebulaNotes:

```jsx
<header className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg shadow-lg mb-6">
  <div className="flex items-center">
    <img src={logo} alt="NebulaNotes Logo" className="w-12 h-12 mr-3" />
    <h1 className="text-4xl font-bold">NebulaNotes</h1>
  </div>
  <Link
    to="/note/new"
    className="flex items-center font-semibold text-white rounded-md shadow-md bg-gradient-to-r from-gray-700 to-gray-800 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg px-4 py-2"
  >
    <span className="mr-2">➕</span> New Note
  </Link>
</header>
```
## Contact

For any questions, issues, or suggestions, please feel free to reach out:

- **Email:** [dorukhanbekdur@gmail.com](mailto:dorukhanbekdur@gmail.com)
- **GitHub:** [https://github.com/DorukhanBekdur](https://github.com/DorukhanBekdur)

Alternatively, you can open an issue on the repository for any feedback or queries.



















