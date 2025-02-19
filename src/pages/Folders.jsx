import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Folders = () => {
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();

  const addFolder = () => {
    if (folderName.trim() !== "" && !folders.some(folder => folder.name === folderName)) {
      const newFolder = { 
        name: folderName, 
        createdAt: new Date() 
      };
      setFolders([...folders, newFolder]);
      setFolderName("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition transform hover:scale-110"
        >
          ⬅️
        </button>
        <h1 className="text-3xl font-bold mb-2 text-center">📂 Your Folders</h1>
        <p className="mb-6 text-center text-gray-400">
          Organize your notes by creating and managing folders.
        </p>
        <div className="mb-6 flex gap-3 justify-center">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="New Folder Name"
            className="p-3 rounded-lg border border-gray-700 bg-gray-900 text-white flex-1"
          />
          <button
            onClick={addFolder}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg"
          >
            ➕ Add Folder
          </button>
        </div>
        <ul className="space-y-4">
          {folders.length > 0 ? (
            folders.map((folder, index) => (
              <li
                key={index}
                className="p-4 bg-gray-700 rounded-lg shadow-md flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">📁</span>
                  <span className="font-semibold">{folder.name}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {folder.createdAt.toLocaleDateString()}
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center">No folders created yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Folders;
