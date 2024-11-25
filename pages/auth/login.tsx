import React, { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



  


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData, [name]:value
    })
    console.log(formData)
  }

  //handle login submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    //consume api

    try{
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        
         if (errorData.errors) {
           Object.keys(errorData.errors).forEach((field) => {
             errorData.errors[field].forEach((errorMessage) => {
               toast.error(errorMessage);
             });
           });
         } else {
           toast.error(errorData.message || "Login failed");
         }
        
        //throw new Error("Network response was not ok");
      }else{
        
      const data = await response.json();
      if(data.success == true){
        sessionStorage.setItem("authToken", data.token);
        toast.error(data.message)
        toast.done(data.message);
        window.location.href = "/main/dashboard"

      }
      console.log("Login successful:", data);
      }

    }catch(error){
      toast.error(error.message);
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/auth/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;