import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useNoteStore from "../store/useNoteStore";

function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, addNote, updateNote } = useNoteStore();

  const isNewNote = id === "new";
  const existingNote = !isNewNote
    ? notes.find((n) => n.id === parseInt(id))
    : null;

  const [content, setContent] = useState(existingNote ? existingNote.content : "");
  const [image, setImage] = useState(existingNote ? existingNote.image : null);
  const [folder, setFolder] = useState(existingNote ? existingNote.folder : "");
  const [tags, setTags] = useState(existingNote?.tags?.join(", ") || "");
  const [attachments, setAttachments] = useState(existingNote ? existingNote.attachments || [] : []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttachmentsChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArr = Array.from(files);
      Promise.all(
        filesArr.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                id: Date.now() + Math.random(),
                fileName: file.name,
                fileType: file.type,
                fileData: reader.result,
              });
            };
            reader.onerror = () => reject(new Error("Dosya okunurken hata oluştu"));
            reader.readAsDataURL(file);
          });
        })
      )
        .then((fileAttachments) => {
          setAttachments((prev) => [...prev, ...fileAttachments]);
        })
        .catch((error) => console.error("Ek dosyalar yüklenirken hata:", error));
    }
  };

  const handleSave = () => {
    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const noteData = {
      content,
      image,
      folder,
      tags: tagList,
      attachments, 
    };

    if (isNewNote) {
      addNote(noteData);
    } else {
      updateNote(existingNote.id, noteData);
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">
            {isNewNote ? "Create a New Note" : "Edit Note ✏️"}
          </h1>
        </header>
        <textarea
          className="w-full h-48 p-4 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
          placeholder="Notunuzu buraya yazın..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="my-4">
          <label className="block mb-2 text-sm text-gray-300">Attach an image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
          />
          {image && (
            <img src={image} alt="Uploaded preview" className="mt-4 max-h-64 object-contain" />
          )}
        </div>

        <div className="my-4">
          <label className="block mb-2 text-sm text-gray-300">Attach files:</label>
          <input
            type="file"
            accept="*"
            multiple
            onChange={handleAttachmentsChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
          />
          {attachments.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm mb-2">Selected Attachments:</h3>
              <ul className="list-disc list-inside text-sm">
                {attachments.map((att) => (
                  <li key={att.id}>{att.fileName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="my-4">
          <label className="block mb-2 text-sm text-gray-300">Folder:</label>
          <input
            type="text"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            placeholder="Enter folder name"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="my-4">
          <label className="block mb-2 text-sm text-gray-300">Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. work, personal, ideas"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 font-semibold text-white rounded-md shadow-md bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600 hover:shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 font-semibold text-white rounded-md shadow-md bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-500 hover:shadow-lg"
          >
            💾 Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotePage;
