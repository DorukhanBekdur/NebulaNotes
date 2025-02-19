import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import LoginPhoto from "../assets/NebulaLogin.jpg";

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white rounded-2xl shadow-md flex overflow-hidden w-full max-w-4xl">
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center mb-4">Nebula Notes</h1>
          <h2 className="text-xl text-gray-300 text-center mb-6">
            Welcome Back!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">Username</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-semibold text-white rounded-md bg-indigo-600 hover:bg-indigo-500 transition transform hover:scale-105"
            >
              Login Now
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">Login with Others</p>
            <div className="mt-3 space-y-2">
              <button className="w-full py-3 flex items-center justify-center bg-white text-black rounded-md shadow-md hover:shadow-lg hover:bg-gray-200 transition">
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                  className="w-5 h-5 mr-2 flex-shrink-0 min-w-[20px]"
                  alt="Google Logo"
                />
                Login with Google
              </button>

              <button className="w-full py-3 flex items-center justify-center bg-blue-600 text-white rounded-md shadow-md hover:shadow-lg hover:bg-blue-700 transition">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                  className="w-5 h-5 mr-2"
                  alt="Facebook Logo"
                />
                Login with Facebook
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-400 hover:underline">
              Register
            </Link>
          </p>
        </div>

        <div
          className="w-1/2 hidden md:block bg-cover bg-center"
          style={{ backgroundImage: `url(${LoginPhoto})` }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
