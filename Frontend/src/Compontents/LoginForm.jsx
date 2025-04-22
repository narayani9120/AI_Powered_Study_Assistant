import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice"; // Adjust the import based on your file structure
import { jwtDecode } from "jwt-decode";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const { token, username, email: returnedEmail } = data;

        // Decode the token to get userId
        const decoded = jwtDecode(token);
        const userId = decoded.user_id;

        console.log("Decoded token:", decoded);
        // Store the token and user details
        localStorage.setItem("authToken", token);
        localStorage.setItem("userEmail", returnedEmail);
        localStorage.setItem("username", username);

        // Dispatch to Redux store
        dispatch(setUser({ userId, username, email: returnedEmail, token }));

        alert("Login successful!");
        navigate("/");

        console.log("Login response data:", data);
      } else {
        const error = await response.text();
        alert(`Login failed: ${error}`);
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Login Form</h1>

        <div className="flex mb-6">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-l-full w-1/2 font-medium">
            Login
          </button>
          <Link
            to="/signup"
            className="bg-white text-gray-700 py-2 px-4 rounded-r-full w-1/2 text-center font-medium"
          >
            Signup
          </Link>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <a href="#" className="text-blue-400 text-sm">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Not a member?{" "}
            <Link to="/signup" className="text-blue-400">
              Signup now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
