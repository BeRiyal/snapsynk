

// TODO: Validation on submit and Setting type



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [register, setRegister] = useState({
    Email: "",
    Password: "",
    Mobile: "",
    Type: "",
  });
  const [error, setError] = useState({}); // Define error state
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  // Function to validate mobile number
  const validateMobile = (value) => {
    const mobileRegex = /^\d{10}$/; // Regular expression to match 10 digits
    return mobileRegex.test(value);
  };
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email format
    return emailRegex.test(value);
  };
  const validateField = (name, value) => {
    switch (name) {
      case "Name":
        // Check if the name is empty
        if (value.trim() === "") {
          setError({ ...error, [name]: "Name is required." });
          return false;
        }
        break;
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
      // case "Type":
      //   // Check if the type is empty
      //   if (value.trim() === "") {
      //     setError({ ...error, [name]: "Type is required." });
      //     return false;
      //   }
      //   // You can add additional validation for the type if needed
      //   break;
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
          setError({ ...error, [name]: "Password must be at least 8 characters long and include at least one capital letter, one number, and one special character." });
          return false;
        }
        break;
      case "Confirmpassword":
        // Check if the confirm password matches the password
        if (value !== register.Password) {
          setError({ ...error, [name]: "Passwords do not match." });
          return false;
        }
        break;
      case "Mobile":
        // Check if the mobile number is empty
        if (value.trim() === "") {
          setError({ ...error, [name]: "Mobile number is required." });
          return false;
        }
        // Check if the mobile number is in a valid format
        if (!validateMobile(value)) {
          setError({ ...error, [name]: "Invalid mobile number format." });
          return false;
        }
        break;
      default:
          // If no error is found, clear the error
          setError({ ...error, [name]: "" });
          return true; // Return true to indicate no error
    }
    // If no error is found, return true
    setError({ ...error, [name]: "" }); // Clear error
    return true;
  };

  const handleRegInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === "Confirmpassword"){
      validateField(name, value)
    }
    else{

      if (validateField(name, value)) {
        setRegister({
          ...register,
          [name]: value,
        });
      }
    }
  };

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);


  // Function to handle input focus
  const handleFocus = () => {
    // Set suggestions based on focus
    setSuggestions(["Editor", "Admin", "Client"]);
  };

  // Function to handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]); // Clear suggestions
  };

  const setType = async () => {
    await setRegister({
      ...register,
      Type: inputValue,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = false; // Corrected variable name
    for (const name in register) {
        const value = register[name];
        validateField(name, value)
        isValid = validateField(name, value);
      }
    
    if(isValid){
    await setType(); // Wait for setType to complete before proceeding
    axios
      .post("api/users/add", register)
      .then(function (response) {
        //handle success
        navigate("/login");
      })
      .catch(function (response) {
        if(response.response.status===440){
          setError({ ...error, "Email": "opps!! Email Already Used" });
        }
        //handle error
        console.log("failed", response);
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            onChange={handleRegInput}
            value={register.name}
            id="name"
            name="Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          {error.hasOwnProperty("Name") && (
            <div style={{ color: "red" }}>{error["Name"]}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            onChange={handleRegInput}
            value={register.email}
            type="email"
            id="email"
            name="Email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          {error.hasOwnProperty("Email") && (
            <div style={{ color: "red" }}>{error["Email"]}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="Type"
            className="block text-sm font-medium text-gray-700"
          >
            Your role
          </label>
          <div className="relative">
            <input
              id="Type"
              name="Type"
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={inputValue}
              onChange={handleRegInput}
              onFocus={handleFocus}
              placeholder="Select role..."
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 py-1 shadow-md">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {error.hasOwnProperty("Name") && (
            <div style={{ color: "red" }}>{error["Name"]}</div>
          )}
        </div>
        <div className="mb-4">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <div className="relative">
        <input
          onChange={handleRegInput}
          value={register.password}
          type={passwordVisible ? "text" : "password"}
          id="password"
          name="Password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 py-2"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12a8 8 0 018-8m0 16a8 8 0 01-8-8"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12a8 8 0 018-8m0 16a8 8 0 01-8-8"
              />
            </svg>
          )}
        </button>
      </div>
      {error.hasOwnProperty("Password") && (
        <div style={{ color: "red" }}>{error["Password"]}</div>
      )}
    </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
          onChange={handleRegInput}
            value={register.confirmpassword}
            type="password"
            id="confirmpassword"
            name="Confirmpassword"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          {error.hasOwnProperty("Confirmpassword") && (
            <div style={{ color: "red" }}>{error["Confirmpassword"]}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile
          </label>
          <input
            onChange={handleRegInput}
            value={register.mobile}
            type="text"
            id="mobile"
            name="Mobile"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500  "
          />
          {error.hasOwnProperty("Mobile") && (
            <div style={{ color: "red" }}>{error["Mobile"]}</div>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
