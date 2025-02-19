import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import AvatarImage from "../assets/profile.png";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

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
        <p className="mb-6 text-center text-gray-400">
          View and manage your account information.
        </p>
        <div className="bg-gray-700 p-6 rounded-lg shadow-md max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <img
              src={AvatarImage}
              alt="Avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{user?.username || "Username"}</h2>
            <p className="text-gray-400 mb-2">📧 {user?.email || "user@example.com"}</p>
            <p className="text-gray-400 mt-2 text-center">
              Joined: {new Date().toDateString()}
            </p>
            <p className="text-center text-gray-300 my-4">
              This is your profile bio. Update your personal information and change your profile picture.
            </p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
