import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [register, setRegister] = useState({
    Email:"",
    Password:"",
    Mobile:""
  })

  const handleRegInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setRegister({
      ...register,
       [name]:value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("api/users/add",register)
      .then(function (response) {
        //handle success
        console.log("success",response);
      })
      .catch(function (response) {
        //handle error
        console.log("failed",response);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input onChange={handleRegInput} value={register.email} type="email" id="email" name="Email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input onChange={handleRegInput} value={register.password} type="password" id="password" name="Password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input onChange={handleRegInput} value={register.confirmpassword} type="password" id="confirmpassword" name="Confirmpassword" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
          <input onChange={handleRegInput} value={register.mobile} type="text" id="mobile" name="Mobile" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <button type="submit" onClick={handleSubmit} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
      </form>
    </div>
  );
};

export default Register;
