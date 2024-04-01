import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState({}); // Define error state

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email format
    return emailRegex.test(value);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "Email":
        // Check if the email is empty
        if (value.trim() === "") {
          setError({ ...error, [name]: "Email is required." });
          return false;
        }
        // Check if the email is in a valid format
        if (!validateEmail(value)) {
          setError({ ...error, [name]: "Invalid email format." });
          return false;
        }
        break;
      case "Password":
        // Check if the password is empty
        if (value.trim() === "") {
          setError({ ...error, [name]: "Password is required." });
          return false;
        }
        // Validate password format using regex
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(value)) {
          setError({ ...error, [name]: "Invalid Password" });
          return false;
        }
        break;
      default:
        // If no error is found, clear the error
        setError({ ...error, [name]: "" });
        return true; // Return true to indicate no error
    }
    // If no error is found, clear the error
    setError({ ...error, [name]: "" });
    return true; // Return true to indicate no error
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (validateField(name, value)) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("api/users/login", formData)
      .then((user) => {
        console.log(user);
        localStorage.setItem("isSession", true);
        localStorage.setItem("UserId", user.data.data.user._id);
        localStorage.setItem("UserEmail", user.data.data.user.Email);
        localStorage.setItem("UserType", user.data.data.user.Type);
        console.log(localStorage.getItem("UserId"));
        navigate("/");
      })
      .catch((error) => {
        localStorage.removeItem("isSession");
        console.log("error", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          {error.hasOwnProperty("Email") && (
            <div style={{ color: "red" }}>{error["Email"]}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          {error.hasOwnProperty("Password") && (
            <div style={{ color: "red" }}>{error["Password"]}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
