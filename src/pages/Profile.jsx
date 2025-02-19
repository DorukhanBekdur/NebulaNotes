import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import AvatarImage from "../assets/profile.png";

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateBio } = useAuthStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || "This is your profile bio.");

  const handleSave = () => {
    updateBio(bio);
    setIsEditing(false);
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
        <h1 className="text-3xl font-bold mb-2 text-center">👤 Your Profile</h1>

        <div className="bg-gray-700 p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
          <img src={AvatarImage} alt="Avatar" className="w-24 h-24 rounded-full mb-4 mx-auto"/>
          <h2 className="text-2xl font-semibold">{user?.username || "Username"}</h2>

          {isEditing ? (
            <textarea
              className="w-full p-2 rounded-md bg-gray-600 text-white mt-3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <p className="text-gray-300 my-4">{user?.bio || "This is your profile bio."}</p>
          )}

          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg mt-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg mt-2"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
