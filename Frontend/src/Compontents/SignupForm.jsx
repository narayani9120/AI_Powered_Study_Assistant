import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/adduser", {
        username,
        email,
        password,
      });
      console.log("Signup successful:", res.data);
      alert("Signup successful! Please login.");

      navigate("/login"); // Redirect after signup
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Signup Form</h1>

        <div className="flex mb-6">
          <Link
            to="/login"
            className="bg-white text-gray-700 py-2 px-4 rounded-l-full w-1/2 text-center font-medium"
          >
            Login
          </Link>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-r-full w-1/2 font-medium">
            Signup
          </button>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <div className="mb-6">
              <input
                type="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
