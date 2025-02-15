import { Link } from "react-router-dom";
import emptyStateImage from "../assets/emptyPhoto.svg";

const NoNotes = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-white text-center">
      <img src={emptyStateImage} alt="No Notes Yet" className="w-48 h-48 opacity-80 mb-6" />
      <h2 className="text-3xl font-bold">Start Your Journey 🚀</h2>
      <p className="text-lg text-gray-400 max-w-md mt-2 mb-6">
        You don’t have any notes yet. Click the button below to create your first note and organize your thoughts!
      </p>
      <Link
        to="/note/new"
        className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:scale-105 transition-transform"
      >
        ➕ Create a Note
      </Link>
    </div>
  );
};

export default NoNotes;
